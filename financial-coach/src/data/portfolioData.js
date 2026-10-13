/**
 * RAJ HALDER — PORTFOLIO DATA
 * Single source of truth for CRM & FinTech Engineering Portfolio
 * All content strictly adheres to verified facts and professional experience.
 */

export const identity = {
  name: "Raj Halder",
  eyebrow: "INDEPENDENT ENGINEER · CRM · FINTECH",
  role: "CRM & FinTech Engineer",
  title: "Full-Stack Engineer | CRM & Trading Systems | Production Applications",
  company: "YoForex",
  roleStatus: "Full-Stack Engineer & Acting CTO Responsibilities",
  joinedCompany: "January 2026",
  statusBadges: [
    "Full-Stack Engineer at YoForex",
    "Acting CTO responsibilities",
    "Production-focused engineering"
  ],
  headline: "I BUILD THE SYSTEMS THAT POWER FINTECH.",
  bio: "I'm Raj Halder — a full-stack engineer working across CRM platforms, trading integrations, backend infrastructure, and production applications. I turn complex business requirements into reliable software, from the interface to the underlying systems.",
  aboutExtended: "I'm Raj Halder, a full-stack engineer focused on CRM platforms, fintech applications, and trading-system integrations. At YoForex, I work across frontend interfaces, backend services, APIs, and production delivery while taking on technical leadership responsibilities. I enjoy solving problems where business workflows, system reliability, and complex integrations meet.",
  education: {
    degree: "B.Tech in Information Technology",
    university: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    shortUniv: "MAKAUT",
    year: "2025",
    cgpa: "8.15",
    location: "West Bengal, India"
  },
  location: "Kolkata, West Bengal, India",
  workPreference: "Open to international, remote, and hybrid engineering roles",
  email: "rajhalder.dev@gmail.com",
  links: {
    portfolio: "https://my-protfolio-plum-zeta.vercel.app/",
    linkedin: "https://www.linkedin.com/in/raj-halder-2279a1266/",
    github: "https://github.com/rajhalderdev-hub"
  }
};

export const heroTelemetry = {
  activeUptime: "99.98%",
  mt5Latency: "14ms",
  clusterStatus: "NOMINAL",
  activeNodes: [
    { name: "Client Web Portal", status: "Active", latency: "18ms", protocol: "HTTPS / WSS" },
    { name: "API Gateway & Auth Bridge", status: "Active", latency: "12ms", protocol: "JWT / TLS 1.3" },
    { name: "CRM Core & Wallet Engine", status: "Active", latency: "22ms", protocol: "PostgreSQL / Redis" },
    { name: "MetaTrader 5 Bridge", status: "Synchronized", latency: "14ms", protocol: "Manager API" }
  ]
};

export const projects = [
  {
    id: "fxtrusts-crm",
    index: "01",
    name: "FXTrusts CRM",
    category: "CRM Platform · Full-Stack Engineering · Production Deployment",
    shortDescription: "An end-to-end CRM platform built around client onboarding, authentication, administrative workflows, and trading-system integration.",
    role: "Full-Stack Engineer & Core Architecture Ownership",
    period: "2026 — Present",
    company: "YoForex",
    featured: true,
    isConfidential: true,
    image: "/images/fintech-cover.webp",
    systemFlow: [
      { step: "Client Interface", desc: "React / Next.js onboarding & trader portal" },
      { step: "Backend APIs", desc: "REST & WebSockets with JWT token lifecycle" },
      { step: "CRM Services", desc: "Wallet ledger, KYC verification, Redis Pub/Sub" },
      { step: "Trading Integration", desc: "Secure bridge to MetaTrader 5 trading accounts" }
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis Pub/Sub",
      "MetaTrader 5 API",
      "Docker",
      "Nginx"
    ],
    highlights: [
      "Implemented comprehensive user onboarding, registration, and OTP-secured authentication flows.",
      "Engineered multi-role administrative authorization and back-office review pipelines.",
      "Built backend bridge integration synchronizing real-time CRM state with trading accounts.",
      "Leveraged Redis Pub/Sub messaging for sub-second event notification across distributed services.",
      "Orchestrated end-to-end staging and production deployment, tracing HTTP 429 and 502 edge errors."
    ],
    caseStudy: {
      overview: "FXTrusts CRM serves as the foundational operating system for client management, operational accounting, and broker administration. It unifies client account registration, tiered KYC document verification, deposit/withdrawal ledger operations, and automated trading account provisioning into a unified high-availability system.",
      businessProblem: "Financial brokerages require seamless customer onboarding and immediate trading account creation without compromising strict regulatory KYC standards, ledger reconciliation, or administrative audit trails. Manual synchronization between CRM databases and trading servers caused operational friction and latency.",
      technicalChallenges: [
        "Eliminating race conditions during concurrent wallet transactions and account provisioning.",
        "Ensuring real-time state synchrony between client portals, back-office admin dashboards, and trading server endpoints.",
        "Architecting robust rate limiting and token renewal without dropping active trading requests.",
        "Safeguarding confidential broker credentials and API tokens with strict server-side validation boundaries."
      ],
      myResponsibilities: [
        "Full-stack development of client onboarding, trader portal, and administrative control panels.",
        "Designing database models for user accounts, transaction ledgers, and audit logs.",
        "Integrating backend bridge microservices with MetaTrader 5 trading account management workflows.",
        "Implementing and testing Redis Pub/Sub event queues for real-time notification streams.",
        "Overseeing production deployment, Docker containerization, reverse proxy configuration, and live monitoring."
      ],
      keyDecisions: [
        "Implemented strict server-side trust boundaries: client interfaces never execute direct operations against core trading databases.",
        "Utilized Redis Pub/Sub for decoupling asynchronous notification delivery from synchronous transactional API calls.",
        "Applied optimistic concurrency controls on wallet ledgers to prevent double-spending or stale balance updates."
      ],
      securityReliability: "All sensitive actions (withdrawals, tier approvals, password resets) require cryptographically signed tokens and OTP verification. Nginx reverse proxies apply IP-based rate limiting, SSL/TLS 1.3 termination, and CORS protections.",
      testingDeployment: "Engineered comprehensive API unit test suites, integration tests against mock trading bridges, and blue-green containerized production updates with continuous health checking.",
      outcomes: "Successfully deployed into active production environment, handling customer onboarding, account creations, and real-time back-office workflows with zero reported ledger discrepancies.",
      lessonsLearned: "In fintech CRM systems, defensive programming around third-party trading server timeouts and strict ledger idempotency are critical to system resilience."
    }
  },
  {
    id: "asr-trading-infrastructure",
    index: "02",
    name: "ASR / YoPips Trading Infrastructure",
    category: "FinTech · Trading Integrations · MT5",
    shortDescription: "Trading-platform infrastructure connecting web applications and backend services with MetaTrader 5 workflows.",
    role: "Trading Integration & Backend Engineer",
    period: "2026 — Present",
    company: "YoForex",
    featured: true,
    isConfidential: true,
    image: "/images/rtx-web-terminal.webp",
    liveDemo: "https://webterminal.orrnn.com/",
    liveDemoLabel: "Inspect RTX 5 Live Terminal",
    systemFlow: [
      { step: "Trader Terminal", desc: "Interactive streaming candlestick & order interface" },
      { step: "Gateway Bridge", desc: "WebSocket market feeds & tick processing" },
      { step: "Manager API", desc: "MetaTrader 5 server command protocol" },
      { step: "Execution Engine", desc: "Trade placement, position tracking & margin checks" }
    ],
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "WebSockets",
      "MetaTrader 5 (MT5)",
      "Node.js",
      "FIX 4.4",
      "Zustand",
      "Web Workers"
    ],
    highlights: [
      "Connected web frontends directly to streaming quotes, tick processing, and OHLC candlestick generators.",
      "Integrated MT5 account management and trader account verification protocols.",
      "Built resilient WebSocket reconnection logic with exponential backoff and message deduplication.",
      "Conducted operational troubleshooting across production gateway sockets and server instances.",
      "Clear distinction: Completed web integration and order workflow vs planned automated margin risk modules."
    ],
    caseStudy: {
      overview: "The ASR / YoPips trading infrastructure provides the high-frequency communications link between trader-facing web applications and MetaTrader 5 trading infrastructure. It powers real-time asset pricing, execution requests, and portfolio margin calculations.",
      businessProblem: "Standard retail trading terminals often run as heavy desktop executables. Delivering an ultra-responsive, browser-based terminal that streams tick data with low latency and places orders into MT5 without browser freezing required specialized frontend and network engineering.",
      technicalChallenges: [
        "Processing high-frequency WebSocket tick bursts (hundreds of ticks/sec) without UI thread jank.",
        "Handling socket disconnects gracefully and re-subscribing symbols with accurate state recovery.",
        "Coordinating order placement, position modifications, and stop-loss/take-profit parameters via MT5 Manager protocols."
      ],
      myResponsibilities: [
        "Implemented the frontend trading interface with streaming market watch and multi-timeframe charts.",
        "Integrated backend MT5 communication bridges and session authentication.",
        "Resolved production 502 gateway and socket timeout bottlenecks under volatile market spreads.",
        "Documented completed integration endpoints and planned operational milestones."
      ],
      keyDecisions: [
        "Delegated tick data buffering and chart calculation routines to background Web Workers to maintain smooth 60fps rendering.",
        "Maintained local symbol state caches with lightweight Zustand stores to eliminate redundant network roundtrips."
      ],
      securityReliability: "Every trading order validation is enforced server-side against MT5 risk controls. Client sessions are verified using cryptographically salted session tokens.",
      testingDeployment: "Tested through automated stress-testing scripts simulating multi-pair tick floods and broker disconnection scenarios.",
      outcomes: "Live production deployment at webterminal.orrnn.com supporting multi-currency pairs, candlestick intervals from M1 to MN, and live order execution.",
      lessonsLearned: "Sub-millisecond data pipelines require minimal state abstractions and proactive socket heartbeat monitoring."
    }
  },
  {
    id: "yo4x-trade-copier",
    index: "03",
    name: "Yo4x / Trade Copier",
    category: "Trading Technology · Cross-Platform Applications",
    shortDescription: "Cross-platform trading engine designed to replicate trade executions across master and slave accounts with slippage protection and queue management.",
    role: "Full-Stack Engineer & Integration Specialist",
    period: "2026",
    company: "YoForex",
    featured: true,
    isConfidential: true,
    image: "/images/build-trading.webp",
    systemFlow: [
      { step: "Master Signal", desc: "Order open/modify/close event detection" },
      { step: "Replication Queue", desc: "Redis-backed priority task queue" },
      { step: "Risk & Lot Sizer", desc: "Equity multiplier and slippage filter" },
      { step: "Slave Execution", desc: "Synchronous MT5 terminal order dispatch" }
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Redis Queue",
      "MetaTrader 5",
      "WebSockets",
      "PostgreSQL",
      "Docker"
    ],
    highlights: [
      "Architected order replication workflow across open, modify, and close lifecycle events.",
      "Integrated retry mechanisms and reconciliation logic for orders encountering server slippage.",
      "Engineered cross-platform connectivity between desktop services, mobile monitoring, and server queues.",
      "Audited queue throughput to prevent delayed executions during high-impact market news releases."
    ],
    caseStudy: {
      overview: "Yo4x Trade Copier is a high-speed replication engine that mirrors positions from verified master accounts to hundreds of follower accounts in real time, accounting for differing leverage, equity ratios, and broker spread differences.",
      businessProblem: "Traditional copy trading solutions suffer from latency-induced slippage, order rejections, and incomplete trade closures when markets surge. The system required an asynchronous queue capable of prioritizing fast exits over new entries.",
      technicalChallenges: [
        "Maintaining millisecond-level execution parity across disparate broker server pings.",
        "Reconciling missed orders after network interruptions or transient broker requotes.",
        "Proportional lot calculation based on fluctuating account equity balances."
      ],
      myResponsibilities: [
        "Implemented the core trade lifecycle handler (order open, lot calculation, order modify, order close).",
        "Engineered the Redis queue retry mechanism with exponential backoff and dead-letter auditing.",
        "Built administrative monitoring dashboard for viewing active subscriptions and latency metrics."
      ],
      keyDecisions: [
        "Prioritized trade close and emergency stop-loss operations in a dedicated high-priority Redis queue ahead of new order placements.",
        "Implemented idempotent order tags (unique client trade IDs) to prevent duplicate order executions on reconnect."
      ],
      securityReliability: "Slave terminals are authenticated with tokenized keys. Stop-out thresholds automatically sever copy connections if drawdown limits are breached.",
      testingDeployment: "Validated on multi-account simulated demo grids with simulated latency injection up to 250ms.",
      outcomes: "Robust copy pipeline achieving sub-50ms queue dispatch times with complete trade reconciliation.",
      lessonsLearned: "Financial order replication must be strictly idempotent; network packets can and will arrive out of order."
    }
  },
  {
    id: "devpilot-ai",
    index: "04",
    name: "DevPilot AI",
    category: "AI Engineering · Full-Stack Development",
    shortDescription: "An AI-powered career copilot designed to help engineering candidates evaluate resumes, explore GitHub projects, practice interviews, and discover relevant opportunities.",
    role: "Creator & Lead Architect",
    period: "2026",
    featured: true,
    isConfidential: false,
    image: "/images/devpilot-home.webp",
    liveDemo: "https://dev-pilot-ai.vercel.app/",
    githubUrl: "https://github.com/rajhalderdev-hub/DevPilot-AI",
    systemFlow: [
      { step: "Next.js UI", desc: "10 interactive dashboard modules in React 19" },
      { step: "Express API", desc: "Layered TypeScript architecture with 13 route groups" },
      { step: "AI Pipeline", desc: "Groq Llama 3.3 70B inference engine & OCR parsing" },
      { step: "Real-Time Socket", desc: "Socket.IO bidirectional audio & text mock interviews" }
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Groq (Llama 3.3 70B)",
      "JWT",
      "GitHub OAuth",
      "Docker"
    ],
    highlights: [
      "Architected 10 comprehensive dashboard modules spanning ATS analysis, interview prep, and career roadmaps.",
      "Engineered resume parser pipeline: PDF upload via Multer, text extraction via pdf-parse, and structured ATS scoring.",
      "Built real-time voice interview simulator over bidirectional Socket.IO sessions.",
      "Integrated GitHub REST API analyzer extracting repo structure, commit history, and code quality benchmarks.",
      "Implemented weighted Job Ready Score combining technical code reviews with ATS resume signals."
    ],
    caseStudy: {
      overview: "DevPilot AI is a production SaaS platform built to bridge the gap between candidate preparation and real engineering recruitment standards through LLM intelligence, repository code analysis, and live interactive assessments.",
      businessProblem: "Engineering candidates struggle with opaque resume screening algorithms and lack actionable technical feedback on their GitHub repositories and interview communication skills.",
      technicalChallenges: [
        "Prompt engineering to output strictly validated JSON schemas without LLM hallucination.",
        "Managing low-latency streaming responses during mock interviews.",
        "Handling PDF formatting idiosyncrasies and multi-column document parsing."
      ],
      myResponsibilities: [
        "End-to-end full-stack development of Next.js frontend and Express/TypeScript backend.",
        "Integration of Groq API with Llama 3.3 70B model for high-throughput inference.",
        "Implementation of JWT and GitHub OAuth authentication pipelines.",
        "Containerization with Docker Compose and deployment across Vercel and cloud platforms."
      ],
      keyDecisions: [
        "Swapped heavy server-side voice synthesizers for client-native Web Speech APIs to achieve zero-latency voice interaction.",
        "Implemented strict Zod request schema validation across all 13 backend route controllers."
      ],
      securityReliability: "Protected with Helmet headers, CORS policies, rate-limiting middlewares, and bcrypt password hashing.",
      testingDeployment: "Fully live and operational at dev-pilot-ai.vercel.app with continuous deployment pipelines.",
      outcomes: "Live multi-module platform offering instant ATS scoring, GitHub portfolio evaluations, and mock voice interview sessions.",
      lessonsLearned: "Designing robust LLM applications requires rigorous fallback parsing and strict deterministic prompts."
    }
  },
  {
    id: "aadhaar-mask-detector",
    index: "05",
    name: "Aadhaar Mask Detector",
    category: "Computer Vision · Python · FastAPI",
    shortDescription: "A privacy-preserving computer vision system and containerized REST API that automatically identifies and masks sensitive 12-digit identification numbers using YOLOv8 and OpenCV.",
    role: "Sole Engineer: Model Pipeline, Backend & Deployment",
    period: "2026",
    featured: true,
    isConfidential: false,
    image: "/images/aadhaar.webp",
    liveDemo: "https://aadhaar-mask-detector.vercel.app/",
    githubUrl: "https://github.com/rajhalderdev-hub/aadhaar-mask-detector-fullstack",
    systemFlow: [
      { step: "Client Upload", desc: "Drag-and-drop document upload with format check" },
      { step: "FastAPI Pipeline", desc: "Asynchronous image processing endpoint" },
      { step: "YOLOv8 Detection", desc: "Bounding box inference on CPU PyTorch runtime" },
      { step: "OpenCV Masking", desc: "Color-sampled redaction & base64 response return" }
    ],
    stack: [
      "Python",
      "FastAPI",
      "YOLOv8",
      "PyTorch",
      "OpenCV",
      "Tesseract OCR",
      "Docker",
      "Render",
      "Vercel"
    ],
    highlights: [
      "Trained and integrated custom YOLOv8 model tuned for CPU-efficient inference at 320px input resolution.",
      "Implemented OpenCV color-sampling mask replacing first 8 digits with XXXX XXXX while preserving last 4.",
      "Engineered Tesseract OCR pipeline with regex filters to extract secondary verification fields (DOB, Gender).",
      "Containerized complete Python environment into an optimized lightweight Docker image."
    ],
    caseStudy: {
      overview: "Aadhaar Mask Detector addresses strict data privacy compliance by automatically locating national identification card numbers and redacting the first eight digits, leaving only the required last four digits visible.",
      businessProblem: "Manual redaction of identity cards during KYC onboarding is slow, prone to human error, and creates liability risks under privacy legislation. An automated sub-second masking tool was needed.",
      technicalChallenges: [
        "Running deep learning inference on constrained free-tier CPU instances without memory exhaustion.",
        "Handling diverse image qualities, skewed angles, lighting variations, and laminated card glare."
      ],
      myResponsibilities: [
        "Integration of Ultralytics YOLOv8 inference pipeline inside an asynchronous FastAPI framework.",
        "Development of dynamic OpenCV background color interpolation for natural masking.",
        "Containerization and deployment on Render with automated build configurations."
      ],
      keyDecisions: [
        "Downscaled image tensor evaluation to 320px with 0.3 confidence threshold to ensure sub-500ms response times on CPU.",
        "Returned masked documents directly as base64-encoded strings to eliminate persistent disk storage of sensitive client IDs."
      ],
      securityReliability: "Zero-retention architecture: images are held only in volatile memory during processing and immediately discarded.",
      testingDeployment: "Validated on benchmark test datasets spanning clean scans, phone camera photos, and warped card angles.",
      outcomes: "Live, containerized API and drag-and-drop web client running in production with sub-second execution.",
      lessonsLearned: "Performance optimization in computer vision services often comes down to right-sizing model resolutions for the specific task."
    }
  }
];

export const additionalProjects = [
  {
    id: "ai-verse",
    name: "AI Verse Code Analyzer",
    tagline: "AI-assisted Monaco code editor & real-time execution",
    category: "Developer Tools · AI",
    stack: ["React", "Monaco Editor", "Express", "Groq API", "jsPDF"],
    summary: "A code analyzer featuring a live code editor, syntax parsing, and automated AI bug detection and explanation powered by Groq's Llama 3.3.",
    liveDemo: "https://ai-verse-psi.vercel.app/",
    githubUrl: "https://github.com/rajhalderdev-hub/AI-Verse-FRONTEND"
  },
  {
    id: "chatty",
    name: "Chatty",
    tagline: "Real-time bidirectional messaging engine",
    category: "Real-Time Systems",
    stack: ["React", "Socket.IO", "Express", "Node.js", "Render"],
    summary: "A high-concurrency web chat application built over Socket.IO featuring instant delivery, room channels, and active user presence tracking.",
    liveDemo: "https://message-chat-application.netlify.app/",
    githubUrl: null
  },
  {
    id: "haldarcars",
    name: "HaldarCars",
    tagline: "Full-stack automotive marketplace",
    category: "Full-Stack Web Application",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Multer"],
    summary: "An automotive marketplace featuring user authentication, vehicle listing management, image uploads, and filtered inventory search.",
    liveDemo: "https://drive-with-raj.netlify.app/",
    githubUrl: "https://github.com/rajhalderdev-hub/halder-car"
  },
  {
    id: "fotoflix",
    name: "Fotoflix",
    tagline: "Unsplash photo discovery platform",
    category: "Frontend Application",
    stack: ["React", "React Router", "Unsplash REST API", "LocalStorage"],
    summary: "Photo discovery engine with client-side caching, responsive modal lightboxes, and persistent collection bookmarks.",
    liveDemo: "https://world-galaxy.netlify.app/",
    githubUrl: "https://github.com/rajhalderdev-hub/world-galaxy"
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    tagline: "Dynamic SVG/Canvas QR encoder",
    category: "Utility Application",
    stack: ["Next.js", "TypeScript", "Canvas API", "Tailwind CSS"],
    summary: "High-performance vector QR code generator with real-time color styling, high-resolution SVG export, and error-correction controls.",
    liveDemo: null,
    githubUrl: "https://github.com/rajhalderdev-hub"
  }
];

export const capabilities = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    summary: "Production-grade interfaces built for speed, reactive state, and complex financial workflows.",
    skills: [
      { name: "React", level: "Production", desc: "High-concurrency state, custom hooks, virtualized lists" },
      { name: "Next.js", level: "Production", desc: "App router, SSR/SSG, optimized server actions" },
      { name: "TypeScript", level: "Production", desc: "Strict type safety, generic interfaces, API contract validation" },
      { name: "JavaScript (ESNext)", level: "Production", desc: "Event loops, asynchronous streams, Web Workers" },
      { name: "Tailwind CSS", level: "Production", desc: "Design systems, responsive tokens, micro-interactions" },
      { name: "HTML5 / CSS3", level: "Production", desc: "Semantic markup, modern layout grids, canvas animations" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    summary: "Resilient API services, authentication protocols, and high-throughput application logic.",
    skills: [
      { name: "Node.js", level: "Production", desc: "Non-blocking event architecture, service orchestration" },
      { name: "Express.js", level: "Production", desc: "Layered MVC architecture, middleware security, Zod validation" },
      { name: "REST APIs", level: "Production", desc: "Idempotent resource design, versioning, OpenAPI documentation" },
      { name: "Python", level: "Production", desc: "Data pipelines, script automation, computer vision pipelines" },
      { name: "FastAPI", level: "Production", desc: "Asynchronous endpoints, Pydantic schemas, sub-second latency" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Messaging",
    summary: "ACID transactional integrity, caching strategies, and asynchronous event distribution.",
    skills: [
      { name: "PostgreSQL", level: "Production", desc: "Relational data modeling, indexing, foreign keys, transaction locks" },
      { name: "Prisma ORM", level: "Production", desc: "Type-safe database migrations, schema definitions, relation queries" },
      { name: "MongoDB", level: "Production", desc: "Document modeling, aggregation pipelines, Mongoose schemas" },
      { name: "Redis", level: "Production", desc: "In-memory caching, session storage, rate limiting keys" },
      { name: "Redis Pub/Sub", level: "Production", desc: "Asynchronous event distribution, decoupling notification queues" }
    ]
  },
  {
    id: "fintech",
    title: "FinTech & Integrations",
    summary: "Trading protocol bridges, financial account lifecycles, and real-time streaming market data.",
    skills: [
      { name: "MetaTrader 5 (MT5)", level: "Production", desc: "Manager API integration, account creation, trading workflows" },
      { name: "CRM Account Lifecycle", level: "Production", desc: "Client KYC tiering, wallet transactions, admin approval flows" },
      { name: "WebSockets", level: "Production", desc: "Bi-directional tick streaming, reconnect backoff, order feeds" },
      { name: "FIX 4.4 / Market Data", level: "Working Knowledge", desc: "Tick data ingestion, multi-timeframe OHLC candle formatting" },
      { name: "Third-Party APIs", level: "Production", desc: "Payment gateways, email services, external verification APIs" }
    ]
  },
  {
    id: "delivery",
    title: "Engineering & Delivery",
    summary: "Disciplined version control, automated containerization, and production incident resolution.",
    skills: [
      { name: "Git & GitHub", level: "Production", desc: "Branching workflows, code reviews, PR management" },
      { name: "API Testing & Debugging", level: "Production", desc: "Postman, unit test suites, integration edge-case audits" },
      { name: "Production Troubleshooting", level: "Production", desc: "Resolving HTTP 429/502 errors, socket drops, server logs" },
      { name: "Docker", level: "Production", desc: "Containerized builds, multi-stage Dockerfiles, Docker Compose" },
      { name: "Nginx & Reverse Proxies", level: "Production", desc: "Rate limiting, SSL termination, path routing, headers" }
    ]
  },
  {
    id: "additional",
    title: "Additional Systems & Languages",
    summary: "Exploring modern systems languages to solve concurrency and latency constraints.",
    skills: [
      { name: "Go", level: "Working Knowledge", desc: "Goroutines, channels, microservices concurrency patterns" },
      { name: "Rust", level: "Working Knowledge", desc: "Memory safety, Axum/Tokio asynchronous primitives" }
    ]
  }
];

export const engineeringApproach = [
  {
    step: "01",
    title: "Understand the Business Problem",
    summary: "Deconstruct business requirements into strict functional specifications, operational edge cases, and compliance boundaries.",
    detail: "Before writing any code, I clarify stakeholder objectives, audit risk constraints (e.g., wallet double-spends or margin violations), and map the entire customer lifecycle."
  },
  {
    step: "02",
    title: "Design System & Data Flow",
    summary: "Architect schema models, entity relations, and service boundaries with clear trust lines.",
    detail: "I define PostgreSQL/Prisma schemas, API contracts, token validation paths, and message queues to ensure components stay loosely coupled and resilient."
  },
  {
    step: "03",
    title: "Build Frontend & Backend",
    summary: "Develop reactive, responsive user interfaces backed by type-safe, layered server endpoints.",
    detail: "Using Next.js/React and Node.js/FastAPI, I build modular components and layered controllers (routes, services, repositories) with strict validation."
  },
  {
    step: "04",
    title: "Integrate APIs & External Systems",
    summary: "Establish resilient bridges to third-party providers, trading servers, and message queues.",
    detail: "Integrate MetaTrader 5 Manager workflows, Redis Pub/Sub channels, or WebSocket streaming pipes, wrapping external connections in timeout and retry guards."
  },
  {
    step: "05",
    title: "Test Critical User Workflows",
    summary: "Stress test authentication boundaries, concurrency conflicts, and worst-case failure modes.",
    detail: "I audit edge scenarios before happy paths: simultaneous wallet debits, unexpected socket disconnects, rate limit thresholds, and token expiration recovery."
  },
  {
    step: "06",
    title: "Deploy, Monitor & Improve",
    summary: "Containerize applications, configure reverse proxies, inspect runtime logs, and optimize bottlenecks.",
    detail: "Deploy via Docker and cloud pipelines, trace HTTP 429/502 anomalies through Nginx logs, and continuously refine performance based on live telemetry."
  }
];

export const leadershipPoints = [
  {
    id: "coordination",
    title: "Technical Coordination & Delivery",
    desc: "Oversee project workstreams across frontend interfaces and backend infrastructure, aligning implementation timelines and mitigating delivery risks."
  },
  {
    id: "architecture",
    title: "Architecture & Integration Decisions",
    desc: "Drive structural choices for MT5 trading bridges, database schemas, and event queues, ensuring maintainable patterns and clear boundary contracts."
  },
  {
    id: "troubleshooting",
    title: "Production Incident Ownership",
    desc: "Hands-on triage of high-severity production anomalies—including HTTP 429 rate limit triggers, 502 bad gateways, and WebSocket dropouts under volatile market conditions."
  },
  {
    id: "security",
    title: "Security & Trust Boundaries",
    desc: "Enforce strict server-side validation, eliminating client-trusted security vulnerabilities and securing administrative API endpoints with OTP authentication."
  },
  {
    id: "hands-on",
    title: "Direct Full-Stack Contribution",
    desc: "Balance technical leadership with continuous daily code commits across React interfaces, Node.js/Python microservices, and database layers."
  }
];
