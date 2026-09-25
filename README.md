# Raj Halder — Portfolio

Personal site for Raj Halder, Full Stack Engineer. React 18 + Tailwind CSS on Create React App, prerendered to static HTML at build time, with one Netlify function for the AI assistant. Deployed on Netlify (https://raj-protfolio.netlify.app).

## Commands

```bash
npm install
npm start          # dev server on http://localhost:3000
npm run build      # production build + prerender (build/)
```

`npm run build` runs `react-scripts build`, then `scripts/prerender.mjs` (the `postbuild` step). The prerender renders `/` and every case study to static HTML with its own title and social tags, and writes `app-shell.html` for unknown URLs. The browser hydrates that HTML.

## Updating content

All copy lives in `src/data/`. Components only read from these files, and "Ask about Raj" and the terminal answer from them too, so an edit in one place updates everything.

| File | What it holds |
| --- | --- |
| `profile.json` | Name, headline, location, availability and notice period, education, links, About text, "How I work" steps |
| `experience.json` | Roles, scope and responsibility areas |
| `projects.json` | Every project. `featured: true` puts it in the top grid; `caseStudy: true` generates `/work/<slug>` |
| `skills.json` | Capabilities (with proof links), toolbox, core stack, learning |
| `now.json` | "Currently building" cards and the GitHub feed (which repos to show, plus a fallback snapshot) |

Adding a case study: add the project to `projects.json` with `caseStudy: true`, `problem`, `built`, `engineering`, `architecture` and `outcome`, then add its URL to `public/sitemap.xml`.

The resume is `src/pdf/resume.pdf`. Replace the file to update every download link.

## Images

Optimised WebP images are in `public/images/`, tech logos in `public/icons/` (from Devicon, MIT) and fonts in `public/fonts/` (Archivo, IBM Plex Sans and IBM Plex Mono, SIL OFL, latin subset). Original full-size artwork is kept locally in `design/` (git-ignored). When adding an image, export WebP at the display width and set `w`/`h` in the data file.

## Structure

```
src/
  data/        content (JSON)
  lib/         content helpers, hooks, Ask-about-Raj engine, GitHub loader, overlay state
  components/  ui/ primitives, layout/ (Navbar, Footer), projects/ (tiles and cards)
  sections/    home page sections
  features/    Recruiter view, Terminal, Ask about Raj (code-split, load on open)
  pages/       Home, CaseStudy, NotFound
scripts/       build-time prerender
netlify/       functions/ask.mjs (AI endpoint), lib/knowledge.mjs (facts from src/data)
public/        _redirects, sitemap.xml, robots.txt, og-image.png, images, icons, fonts
```

## "Ask about Raj" (AI)

The assistant is a Netlify function on the same domain: `POST /api/ask` → `netlify/functions/ask.mjs`.

- It answers only from `src/data`. `netlify/lib/knowledge.mjs` turns the JSON into plain-text facts and sends Groq just the sections relevant to each question (about 2,000 tokens).
- The Groq key is read from the `GROQ_API_KEY` environment variable on the server. It is never in the browser bundle. Never name it `REACT_APP_...`, because Create React App would bundle it.
- Model order: `qwen/qwen3.8-27b`, then `openai/gpt-oss-120b`. Set `GROQ_MODEL` to change the first choice. `gpt-oss-20b` is excluded because in testing it guessed where the data was silent.
- If the function fails, is rate-limited or isn't deployed (for example with `npm start`), the site answers instantly from the built-in engine in `src/lib/askRaj.js`.
- Guards: POST only, same-origin requests only, 500-character questions, 20 questions per IP per 10 minutes (per function instance), 20-second timeout.

### Setting it up on Netlify

1. Site configuration → Environment variables → add `GROQ_API_KEY` (scope: Functions).
2. Deploy. `netlify.toml` already sets the build command, publish folder and functions folder.
3. Optional: `ALLOWED_ORIGINS` (comma-separated) if another domain should be allowed to call the API.

The Groq free tier allows 8,000 tokens per minute and 1,000 requests per day per model: roughly 4 to 8 questions a minute across both models. Past that, visitors get the built-in answers.

To run the function locally: `npx netlify-cli dev` (it reads `.env`).

## Notes

- `?view=recruiter` opens the recruiter summary directly, which gives recruiters a direct link.
- Press <kbd>`</kbd> anywhere to open the terminal. `ask <question>` in the terminal uses the same AI.
- The contact form uses EmailJS; its public IDs are in `src/sections/Contact.jsx`.
