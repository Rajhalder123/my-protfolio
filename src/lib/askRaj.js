/**
 * "Ask about Raj": a retrieval-only answer engine.
 *
 * Every answer is assembled from the structured files in src/data. There is no
 * language model and no network call, so it cannot invent anything; when a
 * question isn't covered by the data it says so and points to email.
 */
import {
  profile,
  experience,
  projects,
  skills,
  now,
  resumeUrl,
  caseStudyPath,
  getProject,
} from './content';

const job = experience[0];
const area = (id) => job.areas.find((a) => a.id === id);
const toolbox = (id) => skills.toolbox.find((g) => g.id === id).items.map((i) => i.name);

const list = (items) =>
  items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

const projectLink = (p) =>
  p.caseStudy ? { label: `${p.title} case study`, href: caseStudyPath(p.slug) } : { label: p.title, href: '#work' };

const EMAIL = { label: 'Email Raj', href: `mailto:${profile.email}` };

const INTENTS = [
  {
    id: 'backend',
    keys: ['backend', 'back end', 'back-end', 'server', 'api', 'apis', 'node', 'nodejs', 'node.js', 'express', 'fastapi', 'python', 'rest'],
    answer: () => ({
      text: [
        `Backend technologies in Raj's portfolio: ${list(toolbox('backend'))}.`,
        `At ${job.company}: ${area('backend').points.join(' ')}`,
        `In projects: DevPilot AI has an ${getProject('devpilot-ai').highlights[1]}; the Aadhaar Mask Detector runs on FastAPI.`,
      ],
      links: [
        { label: 'Experience', href: '#experience' },
        projectLink(getProject('devpilot-ai')),
      ],
    }),
  },
  {
    id: 'frontend',
    keys: ['frontend', 'front end', 'front-end', 'react', 'next', 'nextjs', 'next.js', 'typescript', 'ui', 'tailwind', 'javascript'],
    answer: () => ({
      text: [
        `Frontend: ${list(toolbox('frontend'))}.`,
        `At ${job.company}: ${area('trading').points[0]}`,
        `DevPilot AI's frontend is a ${getProject('devpilot-ai').highlights[0]}.`,
      ],
      links: [
        { label: 'Experience', href: '#experience' },
        projectLink(getProject('devpilot-ai')),
      ],
    }),
  },
  {
    id: 'data',
    keys: ['database', 'databases', 'db', 'sql', 'postgres', 'postgresql', 'mongodb', 'mongo', 'redis', 'prisma', 'data'],
    answer: () => ({
      text: [
        `Databases: ${list(toolbox('data'))}.`,
        `At ${job.company} Raj works with PostgreSQL, Prisma and Redis; DevPilot AI and HaldarCars use MongoDB with Mongoose.`,
      ],
      links: [{ label: 'Skills', href: '#capabilities' }],
    }),
  },
  {
    id: 'ai',
    keys: ['ai', 'ml', 'llm', 'llms', 'machine learning', 'artificial intelligence', 'openai', 'groq', 'gemini', 'yolo', 'computer vision', 'opencv', 'pytorch'],
    answer: () => {
      const aiProjects = ['devpilot-ai', 'aadhaar-mask-detector', 'ai-verse'].map(getProject);
      return {
        text: [
          `AI work in Raj's portfolio: ${list(toolbox('ai'))}.`,
          ...aiProjects.map((p) => `${p.title}: ${p.summary}`),
        ],
        links: aiProjects.filter((p) => p.caseStudy).map(projectLink),
      };
    },
  },
  {
    id: 'devops',
    keys: ['devops', 'deploy', 'deployment', 'docker', 'cloud', 'nginx', 'linux', 'vercel', 'render', 'ci', 'cd', 'infrastructure', 'server'],
    answer: () => ({
      text: [
        `Delivery tools: ${list(toolbox('delivery'))}, plus Render and Netlify for hosting.`,
        area('debugging').points[0],
        'DevPilot AI uses Docker Compose for the API and MongoDB; the Aadhaar Mask Detector API is containerised and deployed on Render.',
      ],
      links: [{ label: 'Experience', href: '#experience' }],
    }),
  },
  {
    id: 'availability',
    keys: ['available', 'availability', 'hire', 'hiring', 'open', 'notice', 'join', 'joining', 'looking', 'opportunity', 'opportunities', 'interview'],
    answer: () => ({
      text: [
        `${profile.availability.summary}: ${list(profile.availability.roles)}.`,
        `Notice period: ${profile.availability.noticePeriod}.`,
        `Location: ${profile.locationShort}. Open to ${profile.workPreference}.`,
      ],
      links: [EMAIL, { label: 'Resume (PDF)', href: resumeUrl }],
    }),
  },
  {
    id: 'experience',
    keys: ['experience', 'job', 'work', 'working', 'current', 'currently', 'company', 'role', 'yoforex', 'employer', 'career', 'professional', 'production'],
    answer: () => ({
      text: [
        `${job.role} at ${job.company} (${job.domain}), ${job.period}, ${job.location}.`,
        job.summary,
        job.growth,
      ],
      links: [
        { label: 'Experience', href: '#experience' },
        projectLink(getProject('fintech-trading-systems')),
      ],
    }),
  },
  {
    id: 'years',
    keys: ['years', 'how long', 'how many years', 'yoe'],
    answer: () => ({
      text: [
        `The portfolio lists professional work at ${job.company} from ${job.period.replace(' — ', ' to ').toLowerCase()}, and public projects on GitHub since ${now.github.since}.`,
        'For exact dates, see the resume or ask Raj directly.',
      ],
      links: [{ label: 'Resume (PDF)', href: resumeUrl }, EMAIL],
    }),
  },
  {
    id: 'fintech',
    keys: ['fintech', 'trading', 'finance', 'financial', 'crm', 'kyc', 'broker', 'mt5', 'rtx5', 'fix', 'market data', 'wallet', 'wallets', 'forex'],
    answer: () => ({
      text: [
        ...area('crm').points,
        ...area('trading').points,
        ...area('analytics').points,
      ],
      links: [projectLink(getProject('fintech-trading-systems'))],
    }),
  },
  {
    id: 'leadership',
    keys: ['lead', 'leadership', 'ownership', 'manage', 'managing', 'team', 'teams', 'cto', 'senior', 'mentor', 'coordinate'],
    answer: () => ({
      text: [job.growth, ...area('ownership').points],
      links: [{ label: 'Experience', href: '#experience' }],
    }),
  },
  {
    id: 'debugging',
    keys: ['debug', 'debugging', 'incident', 'incidents', 'bug', 'bugs', 'outage', 'issue', 'issues', 'troubleshoot'],
    answer: () => ({
      text: area('debugging').points,
      links: [{ label: 'Experience', href: '#experience' }],
    }),
  },
  {
    id: 'projects',
    keys: ['project', 'projects', 'built', 'build', 'portfolio', 'side', 'showcase', 'apps'],
    answer: () => ({
      text: [
        'Case studies:',
        ...projects.filter((p) => p.featured).map((p) => `${p.title}: ${p.tagline}.`),
        'More projects:',
        ...projects.filter((p) => !p.featured).map((p) => `${p.title}: ${p.tagline}.`),
      ],
      links: [{ label: 'Selected work', href: '#work' }],
    }),
  },
  {
    id: 'location',
    keys: ['location', 'where', 'based', 'city', 'remote', 'relocate', 'relocation', 'kolkata', 'india', 'onsite', 'hybrid'],
    answer: () => ({
      text: [`Raj is based in ${profile.location}. Open to ${profile.workPreference}.`],
      links: [{ label: 'Contact', href: '#contact' }],
    }),
  },
  {
    id: 'education',
    keys: ['education', 'degree', 'college', 'university', 'cgpa', 'gpa', 'btech', 'b.tech', 'graduate', 'graduated', 'study', 'studied', 'qualification', 'makaut', 'training', 'certification'],
    answer: () => {
      const e = profile.education;
      return {
        text: [
          `${e.degree}, ${e.school}, ${e.year}. CGPA ${e.cgpa}.`,
          ...profile.training.map((t) => `Training: ${t.name} (${t.provider}).`),
        ],
        links: [{ label: 'About', href: '#about' }],
      };
    },
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'mail', 'reach', 'phone', 'call', 'linkedin', 'message', 'connect'],
    answer: () => ({
      text: [
        `Email: ${profile.email}`,
        `LinkedIn: ${profile.links.linkedin.replace('https://www.', '')}`,
        'A phone number is not listed on this site; email is the way to reach Raj.',
      ],
      links: [EMAIL, { label: 'LinkedIn', href: profile.links.linkedin }],
    }),
  },
  {
    id: 'resume',
    keys: ['resume', 'cv', 'pdf'],
    answer: () => ({
      text: ["Raj's resume is available as a PDF."],
      links: [{ label: 'Download resume', href: resumeUrl }],
    }),
  },
  {
    id: 'github',
    keys: ['github', 'repo', 'repos', 'repositories', 'code', 'source', 'open source'],
    answer: () => ({
      text: [
        `GitHub: ${profile.links.github.replace('https://', '')}, with ${now.github.publicRepos} public repositories (snapshot).`,
        'Public source is linked on each project that has it. YoForex work is private.',
      ],
      links: [{ label: 'GitHub profile', href: profile.links.github }],
    }),
  },
  {
    id: 'stack',
    keys: ['stack', 'skills', 'skill', 'tech', 'technologies', 'technology', 'tools', 'know', 'languages', 'language', 'rust', 'go', 'golang', 'c++', 'cpp'],
    answer: () => ({
      text: [
        "Tools listed in Raj's portfolio data (anything not listed here isn't covered):",
        ...skills.toolbox.map((g) => `${g.label}: ${list(g.items.map((i) => i.name))}.`),
        `Also used at ${job.company}: ${list(skills.alsoAtWork.map((i) => i.name))}.`,
        `Currently learning: ${list(skills.learning.map((i) => i.name))}.`,
      ],
      links: [{ label: 'Skills', href: '#capabilities' }],
    }),
  },
  {
    id: 'private',
    keys: ['salary', 'ctc', 'compensation', 'pay', 'expected', 'expectation', 'age', 'married', 'visa'],
    answer: () => ({
      text: ["That isn't part of Raj's portfolio data. Please ask Raj directly."],
      links: [EMAIL],
    }),
  },
  {
    id: 'hello',
    keys: ['hi', 'hello', 'hey', 'who', 'about', 'introduce', 'summary', 'overview'],
    answer: () => ({
      text: [
        `${profile.name} is a ${profile.role} in ${profile.locationShort}: ${profile.headline.replace(`${profile.role} `, '')}`,
        `Currently ${job.role} at ${job.company} (${job.domain}).`,
      ],
      links: [
        { label: 'Selected work', href: '#work' },
        { label: 'Experience', href: '#experience' },
      ],
    }),
  },
];

const normalise = (s) =>
  ` ${s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9.+#\s-]/g, ' ')
    .replace(/\.(?=\s|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim()} `;

const GENERIC_WORDS = new Set(['production']);

function matchProject(q) {
  return projects.find((p) => {
    const names = [p.title, p.slug.replace(/-/g, ' '), ...(p.aliases || [])].map((n) => normalise(n).trim());
    const first = normalise(p.title).trim().split(' ')[0];
    const distinctive = first.length > 4 && !GENERIC_WORDS.has(first);
    return names.some((n) => q.includes(` ${n} `)) || (distinctive && q.includes(` ${first}`));
  });
}

function projectAnswer(p) {
  const text = [`${p.title}: ${p.summary}`, `What Raj built: ${p.built}`, `Stack: ${list(p.stack)}.`];
  if (p.confidential) text.push(p.confidentialNote);
  const links = [projectLink(p)];
  if (p.links.demo) links.push({ label: 'Live demo', href: p.links.demo });
  if (p.links.source) links.push({ label: 'Source', href: p.links.source });
  return { text, links };
}

export function ask(question) {
  const q = normalise(question);
  if (q.trim().length < 2) return null;

  const project = matchProject(q);
  if (project && !/\b(stack|skills|projects)\b/.test(q)) return projectAnswer(project);

  let best = null;
  let bestScore = 0;
  INTENTS.forEach((intent, order) => {
    let score = 0;
    intent.keys.forEach((k) => {
      if (q.includes(` ${k} `) || (k.length > 3 && q.includes(` ${k}s `))) score += k.includes(' ') ? 2 : 1;
    });
    // Earlier, more specific intents win ties.
    const weighted = score - order * 0.001;
    if (score > 0 && weighted > bestScore) {
      best = intent;
      bestScore = weighted;
    }
  });

  if (best) return best.answer();

  return {
    text: [
      "I can only answer from Raj's portfolio data, and that question isn't covered there.",
      'Try asking about experience, projects, skills, availability or education, or email Raj directly.',
    ],
    links: [EMAIL],
    unknown: true,
  };
}

export const SUGGESTED_QUESTIONS = [
  'What backend technologies does Raj use?',
  "What is Raj's current role?",
  'Tell me about DevPilot AI',
  'Is Raj open to new roles?',
  'What AI work has Raj done?',
];
