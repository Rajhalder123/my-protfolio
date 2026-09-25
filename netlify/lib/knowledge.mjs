// Builds the portfolio facts the AI is allowed to use, from the same JSON the site renders.
// Only sections relevant to the question are sent, which keeps each request small.
import profile from '../../src/data/profile.json' with { type: 'json' };
import experience from '../../src/data/experience.json' with { type: 'json' };
import projects from '../../src/data/projects.json' with { type: 'json' };
import skills from '../../src/data/skills.json' with { type: 'json' };
import now from '../../src/data/now.json' with { type: 'json' };

const lines = (...xs) => xs.flat().filter(Boolean).join('\n');
const bullets = (items) => (items || []).map((x) => `- ${x}`);

const AI_TECH = /groq|gemini|llm|openai|yolo|pytorch|opencv|tesseract/i;

function aiProjects() {
  return projects
    .map((p) => ({ p, tech: p.stack.filter((t) => AI_TECH.test(t)) }))
    .filter((x) => x.tech.length > 0)
    .map((x) => `${x.p.title} (${x.tech.join(', ')})`)
    .join('; ');
}

function coreSection() {
  const e = profile.education;
  const a = profile.availability;
  return lines(
    'PROFILE',
    `Name: ${profile.name}`,
    `Role: ${profile.role} (${profile.positioning.join(', ')})`,
    `Headline: ${profile.headline}`,
    `Location: ${profile.location}. Open to ${profile.workPreference}.`,
    `Availability: ${a.summary}. Target roles: ${a.roles.join(', ')}. Target companies: ${a.companies}.`,
    `Notice period: ${a.noticePeriod}`,
    `Current job: ${profile.current.role} at ${profile.current.company} (${profile.current.domain})`,
    `Education: ${e.degree}, ${e.school}, ${e.year}, CGPA ${e.cgpa}`,
    `Training: ${profile.training.map((t) => `${t.name} (${t.provider})`).join('; ')}`,
    `Contact: email ${profile.email}; LinkedIn ${profile.links.linkedin}; GitHub ${profile.links.github}. The resume PDF can be downloaded on this site.`,
    `Core stack: ${skills.core.join(', ')}`,
    `Projects on the site: ${projects.map((p) => `${p.title} (${p.status.label}; ${p.tagline})`).join('; ')}`,
    `AI and ML projects (LLMs and computer vision): ${aiProjects()}`
  );
}

function sections() {
  const out = [];

  out.push({
    id: 'about',
    text: lines('ABOUT RAJ', profile.about, 'How Raj works:', bullets(profile.principles.map((p) => `${p.title}: ${p.detail}`))),
  });

  experience.forEach((job) => {
    out.push({
      id: `job-${job.id}`,
      text: lines(
        `EXPERIENCE: ${job.role} at ${job.company} (${job.domain}), ${job.period}, ${job.location}`,
        job.summary,
        `Scope: ${job.growth}`,
        job.areas.map((ar) => lines(`${ar.title}:`, bullets(ar.points))),
        `Stack at work: ${job.stack.join(', ')}`
      ),
    });
  });

  projects.forEach((p) => {
    const links = [p.links.demo && `live ${p.links.demo}`, p.links.source && `source ${p.links.source}`]
      .filter(Boolean)
      .join('; ');
    const sc = p.showcase;
    out.push({
      id: `project-${p.slug}`,
      text: lines(
        `PROJECT: ${p.title} (${p.status.label}) - ${p.tagline}`,
        p.role && `Raj's role: ${p.role}`,
        `Summary: ${p.summary}`,
        `Problem: ${p.problem}`,
        `What Raj built: ${p.built}`,
        p.engineering && lines('Engineering:', bullets(p.engineering)),
        p.features && `Features: ${p.features.join('; ')}`,
        sc && `Includes the live product ${sc.title}; its details are in its own LIVE PRODUCT section.`,
        `Stack${sc ? ' across this whole body of work (not specific to any one product)' : ''}: ${p.stack.join(', ')}`,
        p.outcome && `Status: ${p.outcome}`,
        p.confidentialNote && `Confidentiality: ${p.confidentialNote}`,
        links && `Links: ${links}`
      ),
    });
    if (sc) {
      out.push({
        id: `product-${p.slug}`,
        names: [sc.title, ...(p.aliases || [])],
        text: lines(
          `LIVE PRODUCT: ${sc.title} (part of ${p.title}) - live at ${sc.url}`,
          sc.summary,
          'What Raj built: the frontend.',
          `Features: ${sc.features.join('; ')}`,
          `Confirmed frontend stack (verified from the public build): ${sc.stack.join(', ')}.`,
          'Nothing else about this product is confirmed: not its programming language (TypeScript or JavaScript), CSS framework, backend, protocols (such as FIX 4.4) or hosting. If asked about any of those for this product, say the portfolio does not confirm it.'
        ),
      });
    }
  });

  out.push({
    id: 'skills',
    text: lines(
      'SKILLS',
      skills.toolbox.map((g) => `${g.label}: ${g.items.map((i) => i.name).join(', ')}`),
      `Also used at work: ${skills.alsoAtWork.map((i) => i.name).join(', ')}`,
      `Currently learning: ${skills.learning.map((i) => i.name).join(', ')}`,
      'Capabilities:',
      bullets(skills.capabilities.map((c) => `${c.title}: ${c.body} (${c.stack.join(', ')}). Evidence: ${c.proof.map((x) => x.label).join(', ')}`))
    ),
  });

  out.push({
    id: 'now',
    text: lines(
      'CURRENTLY',
      bullets(now.building.map((b) => `${b.title} (${b.tag}): ${b.detail}`)),
      `GitHub: ${profile.links.github}, ${now.github.publicRepos} public repositories, public projects since ${now.github.since}.`,
      `Notable repositories: ${Object.entries(now.github.descriptions).map(([k, v]) => `${k} (${v})`).join('; ')}`
    ),
  });

  return out;
}

const SECTIONS = sections();
const CORE = coreSection();

const STOP = new Set(
  'a an and are as at be but by can could did do does for from has have he her his how i in is it its me my of on or our raj rajs she tell the their them they this to was what when where which who why will with would you your about any some there'.split(
    ' '
  )
);
const tokens = (s) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s-]/g, ' ')
      .split(/\s+/)
      .map((w) => w.replace(/\.$/, ''))
      .filter((w) => w.length > 1 && !STOP.has(w))
  );

// Words people use for a section that may not appear in its text.
const HINTS = {
  skills: 'skill skills stack tech technology technologies tool tools know knows language languages framework frameworks backend frontend database databases devops cloud',
  'job-yoforex':
    'experience work works working job role current currently company employer production team teams lead leadership ownership responsibility responsibilities debugging senior yoforex fintech trading',
  about: 'about background summary introduce who approach process principles style',
  now: 'now currently building github repo repos repositories code open source learning',
};

const phrase = (x) =>
  ` ${x
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, ' ')
    .trim()} `;

// Names that identify a section outright (project titles, slugs, aliases).
const NAMES = SECTIONS.map((sec) => {
  if (sec.names) return sec.names.map(phrase);
  const p = projects.find((x) => `project-${x.slug}` === sec.id);
  return p ? [p.title, p.slug.replace(/-/g, ' ')].map(phrase) : [];
});
const HINT_WORDS = SECTIONS.map((sec) => tokens(HINTS[sec.id] || ''));
const TITLE_WORDS = SECTIONS.map((sec) => tokens(sec.text.split('\n')[0]));
const BODY_WORDS = SECTIONS.map((sec) => tokens(sec.text));

/**
 * Returns the facts for one request: the profile core, any section the
 * question names directly, then the best-matching sections within a
 * character budget (about 1.5k tokens). Groq's free tier allows 8,000
 * tokens per minute, so each request stays small.
 */
export function knowledgeFor(query, budget = 6500) {
  const q = tokens(query);
  const qp = phrase(query);

  const ranked = SECTIONS.map((s, i) => {
    const named = NAMES[i].some((n) => qp.includes(n));
    let strong = 0;
    let weak = 0;
    q.forEach((w) => {
      if (HINT_WORDS[i].has(w) || TITLE_WORDS[i].has(w)) strong += 1;
      else if (BODY_WORDS[i].has(w)) weak += 1;
    });
    const score = (named ? 100 : 0) + strong * 3 + weak / Math.sqrt(s.text.length / 1000);
    return { s, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = [];
  let used = 0;
  for (const { s, score } of ranked) {
    const mustHave = score >= 100;
    if (!mustHave && used + s.text.length > budget) continue;
    picked.push(s);
    used += s.text.length;
  }
  // Nothing matched (e.g. "give me an overview"): send experience and skills.
  if (picked.length === 0) {
    SECTIONS.filter((s) => s.id.startsWith('job-') || s.id === 'skills').forEach((s) => picked.push(s));
  }
  return { text: [CORE, ...picked.map((s) => s.text)].join('\n\n'), sections: picked.map((s) => s.id) };
}

export const contactEmail = profile.email;
