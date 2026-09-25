// Build-time prerender. Runs after `react-scripts build` (see "postbuild").
//
// Renders the home page and each case study to static HTML so content paints
// before JavaScript loads, and so every page ships its own title and social
// preview tags. The browser entry then hydrates that HTML.
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.resolve(root, process.env.BUILD_PATH || 'build');
const cacheDir = path.join(root, 'node_modules', '.cache', 'prerender');

const manifest = JSON.parse(await fs.readFile(path.join(buildDir, 'asset-manifest.json'), 'utf8'));
const resumeHref = Object.values(manifest.files).find((f) => /\/resume\.[\w]+\.pdf$/.test(f));
if (!resumeHref) throw new Error('prerender: resume PDF not found in asset-manifest.json');

// Bundle the app for Node. Assets resolve to the same URLs webpack produced.
const assets = {
  name: 'assets',
  setup(b) {
    b.onResolve({ filter: /\.pdf$/ }, (args) => ({ path: args.path, namespace: 'pdf' }));
    b.onLoad({ filter: /.*/, namespace: 'pdf' }, () => ({
      contents: `export default ${JSON.stringify(resumeHref)};`,
      loader: 'js',
    }));
    b.onResolve({ filter: /\.css$/ }, (args) => ({ path: args.path, namespace: 'css' }));
    b.onLoad({ filter: /.*/, namespace: 'css' }, () => ({ contents: '', loader: 'js' }));
  },
};

const outfile = path.join(cacheDir, 'ssr.cjs');
await build({
  entryPoints: [path.join(root, 'scripts', 'ssr-entry.jsx')],
  outfile,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [assets],
  logLevel: 'warning',
});

const require = createRequire(import.meta.url);
const { render, projects, profile } = require(outfile);

// The pristine CRA template has an empty root. On a re-run, index.html is
// already prerendered, so fall back to the untouched app shell.
const readTemplate = async () => {
  const index = await fs.readFile(path.join(buildDir, 'index.html'), 'utf8');
  if (index.includes('<div id="root"></div>')) return index;
  return fs.readFile(path.join(buildDir, 'app-shell.html'), 'utf8');
};
const template = await readTemplate();
const site = profile.links.site;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function withMeta(html, { title, description, url, robots }) {
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escapeAttr(url)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeAttr(url)}$2`);
  for (const key of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    out = out.replace(new RegExp(`(<meta ${key} content=")[^"]*(")`), `$1${escapeAttr(description)}$2`);
  }
  for (const key of ['property="og:title"', 'name="twitter:title"']) {
    out = out.replace(new RegExp(`(<meta ${key} content=")[^"]*(")`), `$1${escapeAttr(title)}$2`);
  }
  out = out.replace(/(<meta name="robots" content=")[^"]*(")/, `$1${robots || 'index, follow'}$2`);
  return out;
}

// On prerendered pages the content is already in the HTML, so the app script
// can wait until after the first paint. It still downloads early (preload).
const mainScript = template.match(/<script defer="defer" src="([^"]+)"><\/script>/);
if (!mainScript) throw new Error('prerender: main script tag not found in index.html');

function paintFirst(html) {
  const src = mainScript[1];
  return html
    .replace(mainScript[0], `<link rel="preload" as="script" href="${src}">`)
    .replace(
      '</body>',
      `<script>requestAnimationFrame(function(){setTimeout(function(){var s=document.createElement("script");s.src=${JSON.stringify(src)};document.body.appendChild(s)},0)})</script></body>`
    );
}

async function write(route, file, meta) {
  const body = route ? await render(route) : '';
  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (route && html === template) throw new Error('prerender: could not find the root element in index.html');
  if (route) html = paintFirst(html);
  html = withMeta(html, meta);
  const target = path.join(buildDir, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
  console.log(`prerender: ${route || '(app shell)'} -> ${path.relative(buildDir, target)} (${Math.round(html.length / 1024)} KB)`);
}

const defaultTitle = `${profile.name} — Full Stack Engineer | AI & Production Systems`;
const defaultDescription =
  'Raj Halder is a Full Stack Engineer in Kolkata building AI-powered products and production systems with React, Next.js, TypeScript, Node.js and Python.';

// Unknown URLs get the empty shell (served with a 404 status via _redirects).
await write(null, 'app-shell.html', {
  title: `Page not found — ${profile.name}`,
  description: defaultDescription,
  url: `${site}/`,
  robots: 'noindex',
});

await write('/', 'index.html', { title: defaultTitle, description: defaultDescription, url: `${site}/` });

for (const p of projects.filter((x) => x.caseStudy)) {
  await write(`/work/${p.slug}`, path.join('work', p.slug, 'index.html'), {
    title: `${p.title}: case study — ${profile.name}`,
    description: `${p.tagline}. ${p.summary}`,
    url: `${site}/work/${p.slug}`,
  });
}
