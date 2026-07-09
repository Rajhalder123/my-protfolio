import {
  Bot,
  Brain,
  Code2,
  Database,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react';

export const profile = {
  name: 'Raj Haldar',
  role: 'Full-Stack Developer & AI Engineer',
  shortRole: 'Full-Stack Engineer',
  location: 'West Bengal, India',
  email: 'rajhalder.dev@gmail.com',
  resume: '/resume.pdf',
  availability: 'Available for select product, AI, and full-stack work',
  headline:
    'I design and engineer premium digital products where refined interfaces meet reliable systems.',
  summary:
    'Full-stack developer focused on React, Next.js, Node.js, Python, AI workflows, real-time systems, and performance-minded product experiences.',
  github: 'https://github.com/Rajhalder123',
  linkedin: 'https://www.linkedin.com/in/raj-halder-2279a1266/',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  siteUrl: 'https://rajhalder.dev',
  portrait: '/assets/hero/hero20.jpg',
};

export const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Profile', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const heroMetrics = [
  { label: 'Production projects', value: '8+' },
  { label: 'Core technologies', value: '20+' },
  { label: 'Response time', value: '<24h' },
];

export const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: Code2 },
  { label: 'LinkedIn', href: profile.linkedin, icon: Globe2 },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
];

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  summary: string;
  problem: string;
  solution: string;
  challenge: string;
  architecture: string;
  impact: string[];
  techStack: string[];
  gallery: string[];
  demo?: string;
  source?: string;
  year: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: 'devpilot-ai',
    title: 'DevPilot AI',
    eyebrow: 'AI Career Copilot',
    image:
      'https://api.microlink.io/?url=https://dev-pilot-ai.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    summary:
      'An AI-powered career platform built specifically for developers, featuring resume analysis, ATS optimization, and intelligent job matching.',
    problem:
      'Developers often struggle to get interview calls, optimize resumes for ATS systems, understand skill gaps, and stand out in a competitive market.',
    solution:
      'Built a comprehensive career intelligence dashboard with GitHub insights, technical interview preparation, and real-time analytics powered by multiple premium AI integrations.',
    challenge:
      'Designing a high-level scalable architecture to support multiple AI workflows and real-time data processing for a modern SaaS platform.',
    architecture:
      'Next.js client -> Node.js/Express API -> MongoDB -> Premium AI Integrations -> Real-time analytics.',
    impact: [
      'Delivered an AI-driven platform to help developers and freshers accelerate career growth.',
      'Integrated advanced AI-powered workflows for ATS score optimization and technical interview prep.',
      'Built a modern SaaS dashboard system utilizing high-level data models.',
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express', 'AI'],
    gallery: ['/assets/aiverse1.png', '/assets/eco-drive.png', '/assets/world-galaxy.png'],
    demo: 'https://dev-pilot-ai.vercel.app/',
    year: '2026',
    accent: '#8b5cf6',
  },
  {
    slug: 'aadhaar-mask-detector',
    title: 'Aadhaar Mask Detector',
    eyebrow: 'AI privacy automation',
    image:
      'https://api.microlink.io/?url=https://aadhaar-mask-detector.vercel.app/&screenshot=true&meta=false&embed=screenshot.url',
    summary:
      'A full-stack machine learning product that detects Aadhaar numbers in uploaded documents and masks sensitive digits through an automated privacy pipeline.',
    problem:
      'Document sharing often exposes government ID numbers. Manual redaction is slow, inconsistent, and risky when users need to share files quickly.',
    solution:
      'Built an automated detection and redaction flow using YOLOv8, OCR, FastAPI, and a responsive React interface that returns a protected image in seconds.',
    challenge:
      'Balancing OCR accuracy, unpredictable image quality, secure upload handling, CORS behavior, and a frontend that clearly communicates processing state.',
    architecture:
      'React client -> FastAPI gateway -> YOLOv8 detection -> Tesseract OCR -> image masking service -> optimized response stream.',
    impact: [
      'Converted a sensitive manual workflow into an automated privacy feature.',
      'Created a clearer failure model for OCR misses and unsupported files.',
      'Designed the interface around confidence, preview, and secure download.',
    ],
    techStack: ['React', 'Python', 'FastAPI', 'YOLOv8', 'Tesseract', 'Tailwind CSS'],
    gallery: ['/assets/aiverse1.png', '/assets/eco-drive.png', '/assets/world-galaxy.png'],
    demo: 'https://aadhaar-mask-detector.vercel.app/',
    source: 'https://github.com/Rajhalder123/aadhaar-mask-detector-fullstack',
    year: '2025',
    accent: '#7cf7c5',
  },
  {
    slug: 'chatty-messenger',
    title: 'Chatty Messenger',
    eyebrow: 'Realtime MERN communication',
    image: '/assets/chaty.png',
    summary:
      'A real-time messaging application with private chats, live presence, Firebase authentication, and responsive UI patterns for daily communication.',
    problem:
      'Traditional REST polling cannot deliver the immediacy users expect from modern messaging experiences.',
    solution:
      'Used Socket.IO for persistent bidirectional communication, MongoDB for message history, and Firebase for secure authentication loops.',
    challenge:
      'Keeping online state, message delivery, and auth boundaries predictable while preserving a fast mobile experience.',
    architecture:
      'React client -> Socket.IO channel -> Node/Express API -> MongoDB persistence -> Firebase auth boundary.',
    impact: [
      'Delivered sub-second chat updates and presence indicators.',
      'Separated realtime events from account security concerns.',
      'Created a dark-mode interface suited for repeated daily use.',
    ],
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO', 'Firebase'],
    gallery: ['/assets/chaty.png', '/assets/aiverse.png', '/assets/world-galaxy.png'],
    demo: 'https://message-chat-application.netlify.app/',
    year: '2024',
    accent: '#5ee7ff',
  },
  {
    slug: 'ai-verse-platform',
    title: 'AI Verse Platform',
    eyebrow: 'AI workbench',
    image: '/assets/aiverse1.png',
    summary:
      'A multi-tool AI platform for chatbot flows, summarization, code explanations, and polished mode switching across productivity tasks.',
    problem:
      'Users lose momentum when simple AI tasks require switching between disconnected tools and inconsistent interfaces.',
    solution:
      'Created a unified React workbench with contextual model interactions, Redux-managed state, and motion-driven mode transitions.',
    challenge:
      'Designing an AI interface that feels powerful without overwhelming users with options or fragmented state.',
    architecture:
      'React interface -> Redux Toolkit state layer -> API adapters -> OpenAI model workflows -> response renderer.',
    impact: [
      'Unified multiple AI utilities into a single product surface.',
      'Improved comprehension through syntax-aware code explanation views.',
      'Built motion patterns that clarify state transitions instead of distracting.',
    ],
    techStack: ['React', 'OpenAI API', 'Redux Toolkit', 'Framer Motion', 'Tailwind CSS'],
    gallery: ['/assets/aiverse1.png', '/assets/aiverse.png', '/assets/f.png'],
    demo: 'https://ai-verse-git-main-rajs-projects-18889b56.vercel.app/',
    source: 'https://github.com/Rajhalder123/ai-verse',
    year: '2024',
    accent: '#b79bff',
  },
  {
    slug: 'eco-drive-platform',
    title: 'Eco-Drive Platform',
    eyebrow: 'Sustainable vehicle commerce',
    image: '/assets/eco-drive.png',
    summary:
      'A full-stack platform for eco-friendly vehicles with account flows, listings, reviews, and a commerce-style browsing experience.',
    problem:
      'Eco-conscious buyers need a focused way to compare sustainable vehicles without wading through generic showroom noise.',
    solution:
      'Built a full-stack catalog with authentication, filtering, vehicle detail pages, and content shaped around impact and clarity.',
    challenge:
      'Making a data-heavy catalog feel accessible on mobile while retaining enough detail for comparison.',
    architecture:
      'React frontend -> Node/Express API -> MongoDB catalog and user data -> protected account flows.',
    impact: [
      'Designed a clearer discovery flow for EV and hybrid research.',
      'Created reusable listing and detail patterns for future inventory growth.',
      'Improved perceived performance with lazy media and responsive layouts.',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Bootstrap'],
    gallery: ['/assets/eco-drive.png', '/assets/image.png', '/assets/hero/hero2.png'],
    demo: 'https://raj-car-website.netlify.app/',
    year: '2024',
    accent: '#f8c56b',
  },
  {
    slug: 'world-galaxy',
    title: 'World Galaxy',
    eyebrow: 'Motion-first image experience',
    image: '/assets/world-galaxy.png',
    summary:
      'A visual gallery that combines dynamic image loading, scroll-linked animation, and responsive composition for immersive browsing.',
    problem:
      'Most image galleries flatten high-quality visuals into static grids with little sense of rhythm or discovery.',
    solution:
      'Integrated API-backed image feeds, Framer Motion, and adaptive layouts to make browsing feel fluid and editorial.',
    challenge:
      'Balancing large media payloads with smooth scrolling and animation on mid-range devices.',
    architecture:
      'React gallery -> Unsplash API adapter -> responsive masonry/grid renderer -> motion layer.',
    impact: [
      'Created a more expressive interaction model for visual portfolios.',
      'Used progressive loading patterns for large image collections.',
      'Maintained a responsive layout across narrow and ultra-wide screens.',
    ],
    techStack: ['React', 'Framer Motion', 'Unsplash API', 'Styled Components'],
    gallery: ['/assets/world-galaxy.png', '/assets/aiverse1.png', '/assets/eco-drive.png'],
    demo: 'https://world-galaxy.netlify.app/',
    source: 'https://github.com/Rajhalder123/World-Galaxy',
    year: '2024',
    accent: '#5ee7ff',
  },
  {
    slug: 'drive-with-raj',
    title: 'Drive with Raj',
    eyebrow: 'Luxury vehicle showroom',
    image:
      'https://api.microlink.io/?url=https://drive-with-raj.netlify.app/&screenshot=true&meta=false&embed=screenshot.url',
    summary:
      'A polished vehicle storefront with Firebase authentication, realtime data, wishlist flows, and product-gallery behavior.',
    problem:
      'Premium vehicle sales need a digital showroom that feels fast, trustworthy, and visually consistent with high-value products.',
    solution:
      'Used React, Firebase, and Redux to create an interactive showroom with secure account features and realtime data updates.',
    challenge:
      'Maintaining a premium storefront feel while handling auth, database updates, and rich media states.',
    architecture:
      'React storefront -> Firebase Auth -> Firestore inventory -> Redux client state -> responsive gallery UI.',
    impact: [
      'Created a smooth browsing flow for high-intent product exploration.',
      'Added wishlist and cart logic that persists across authenticated sessions.',
      'Optimized media presentation for showroom-grade browsing.',
    ],
    techStack: ['React', 'Firebase', 'Firestore', 'Tailwind CSS', 'Redux'],
    gallery: ['/assets/eco-drive.png', '/assets/hero/hero2.png', '/assets/image.png'],
    demo: 'https://drive-with-raj.netlify.app/',
    source: 'https://github.com/Rajhalder123/halder-car',
    year: '2024',
    accent: '#f8c56b',
  },
];

export const skills = [
  {
    category: 'Frontend',
    icon: Layers3,
    tools: [
      { name: 'React', level: 92, image: '/assets/skills/react.png' },
      { name: 'Next.js', level: 88, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', level: 84, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Tailwind CSS', level: 90, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    category: 'Backend',
    icon: ServerCog,
    tools: [
      { name: 'Node.js', level: 86, image: '/assets/skills/node.png' },
      { name: 'Express', level: 82, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Python', level: 78, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'FastAPI', level: 74, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    ],
  },
  {
    category: 'Data & Cloud',
    icon: Database,
    tools: [
      { name: 'MongoDB', level: 84, image: '/assets/skills/mongodb.png' },
      { name: 'Firebase', level: 82, image: '/assets/skills/firebase.png' },
      { name: 'SQL', level: 72, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Vercel', level: 86, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    ],
  },
  {
    category: 'AI & Product',
    icon: Brain,
    tools: [
      { name: 'OpenAI APIs', level: 82, image: '/brand-icon.svg' },
      { name: 'OCR pipelines', level: 76, image: '/assets/skills/javascript.png' },
      { name: 'Figma', level: 78, image: '/assets/skills/figma.png' },
      { name: 'GSAP', level: 74, image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },
];

export const experience = [
  {
    title: 'Full-Stack Development Specialist',
    company: 'Independent product builds',
    period: 'Dec 2023 - Present',
    impact:
      'Architected and deployed commerce, AI privacy, realtime messaging, and utility products across React, Node.js, Firebase, FastAPI, and MongoDB.',
    responsibilities: [
      'Designed production-minded frontend systems with responsive layouts, reusable components, and polished interaction states.',
      'Built realtime features with Socket.IO and Firebase, including presence, auth, and synchronized client state.',
      'Optimized frontend delivery through lazy loading, media strategy, code splitting, and careful motion budgets.',
    ],
    technologies: ['React', 'Node.js', 'Firebase', 'FastAPI', 'MongoDB'],
  },
  {
    title: 'AI & Utility Tool Engineer',
    company: 'AI Verse and privacy automation',
    period: 'Mar 2024 - Sep 2024',
    impact:
      'Created focused AI utilities and data-processing workflows for summarization, code explanation, OCR, and document redaction.',
    responsibilities: [
      'Integrated AI APIs into product interfaces that keep context, state, and output readability clear.',
      'Handled error states, response formatting, and interaction flows for latency-sensitive AI features.',
      'Built utility products with client-side generation and privacy-first processing patterns.',
    ],
    technologies: ['OpenAI API', 'Python', 'FastAPI', 'Redux Toolkit', 'Canvas'],
  },
  {
    title: 'Frontend & Creative Developer',
    company: 'Interactive web experiences',
    period: 'Jun 2023 - Mar 2024',
    impact:
      'Delivered visually refined portfolios, galleries, and showroom interfaces with motion, responsive grids, and high attention to visual hierarchy.',
    responsibilities: [
      'Created motion systems using Framer Motion and modern CSS while preserving usability and accessibility.',
      'Built responsive layouts that hold up across mobile, tablet, desktop, and wide displays.',
      'Translated brand direction into concrete interface systems, spacing, typography, and component behavior.',
    ],
    technologies: ['Framer Motion', 'CSS', 'Tailwind CSS', 'Figma', 'React'],
  },
];

export const timeline = [
  {
    year: '2023',
    title: 'Foundation in full-stack development',
    detail:
      'Built early products and sharpened fundamentals across React, APIs, data models, and deploy workflows.',
    icon: Code2,
  },
  {
    year: '2024',
    title: 'Moved into AI and realtime systems',
    detail:
      'Created AI Verse, Chatty Messenger, and privacy-focused automation with OCR and ML integrations.',
    icon: Bot,
  },
  {
    year: '2025',
    title: 'Product polish and performance',
    detail:
      'Focused on premium interfaces, speed, accessibility, content clarity, and engineering presentation.',
    icon: Sparkles,
  },
];

export const achievements = [
  { label: 'Privacy-first AI workflows', icon: ShieldCheck },
  { label: 'Realtime full-stack architecture', icon: Terminal },
  { label: 'Responsive product design systems', icon: Layers3 },
  { label: 'Computer science foundation at MAKAUT', icon: GraduationCap },
  { label: 'Production deploys across Vercel, Netlify, Firebase', icon: Globe2 },
  { label: 'Portfolio and product craftsmanship focus', icon: Trophy },
];

export const latestRepositories = [
  {
    name: 'aadhaar-mask-detector-fullstack',
    description: 'AI-powered privacy automation with FastAPI, YOLOv8, OCR, and React.',
    href: 'https://github.com/Rajhalder123/aadhaar-mask-detector-fullstack',
    stack: ['Python', 'FastAPI', 'React'],
  },
  {
    name: 'ai-verse',
    description: 'Unified AI tools for chat, writing, summarization, and code explanation.',
    href: 'https://github.com/Rajhalder123/ai-verse',
    stack: ['React', 'OpenAI', 'Redux'],
  },
  {
    name: 'World-Galaxy',
    description: 'Motion-driven visual gallery with API-backed image feeds.',
    href: 'https://github.com/Rajhalder123/World-Galaxy',
    stack: ['React', 'Motion', 'API'],
  },
];

export const blogs = [
  {
    title: 'Designing AI interfaces that feel calm under latency',
    topic: 'Product thinking',
    readTime: '5 min read',
  },
  {
    title: 'How realtime presence changes a chat product architecture',
    topic: 'Engineering',
    readTime: '6 min read',
  },
  {
    title: 'A practical checklist for portfolio performance polish',
    topic: 'Frontend',
    readTime: '4 min read',
  },
];

export const testimonials = [
  {
    quote:
      'Raj combines visual taste with real implementation depth. His projects feel intentional instead of assembled.',
    author: 'Product collaborator',
    role: 'Startup founder',
  },
  {
    quote:
      'He thinks through edge cases, motion, responsiveness, and data flow with the seriousness of a product engineer.',
    author: 'Engineering peer',
    role: 'Full-stack developer',
  },
];

export const certifications = [
  'Full-stack web development practice across MERN and Firebase products',
  'AI application development with OCR, model APIs, and Python services',
  'Data structures, algorithms, and computer science foundation at MAKAUT',
];

export const faqs = [
  {
    question: 'What kind of roles is Raj looking for?',
    answer:
      'Full-stack, frontend-heavy product engineering, AI application development, and startup product roles where craft and execution both matter.',
  },
  {
    question: 'Can he work across design and engineering?',
    answer:
      'Yes. Raj works from visual direction and interaction design through frontend architecture, backend APIs, deployment, and performance polish.',
  },
  {
    question: 'What makes this portfolio content current?',
    answer:
      'It preserves Rajs existing projects and links while presenting them as product case studies with clearer impact, architecture, and tradeoffs.',
  },
];

export const commands = [
  { label: 'View Projects', href: '#projects' },
  { label: 'Download Resume', href: profile.resume },
  { label: 'Open GitHub', href: profile.github },
  { label: 'Email Raj', href: `mailto:${profile.email}` },
  { label: 'Read Experience', href: '#experience' },
];
