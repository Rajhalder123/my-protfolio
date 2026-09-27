import { Link } from 'react-router-dom';
import { profile, resumeUrl, RESUME_FILENAME, currentJob, skills, caseStudyPath } from '../lib/content';
import Icon from '../components/ui/Icon';
import { Magnetic, SpotlightCard } from '../components/ui/primitives';

function HeroBento() {
  const cards = skills.heroBento || [
    {
      id: 'ai',
      tag: 'AI',
      title: 'AI Products',
      subtitle: 'AI-powered applications',
      detail: 'LLM integrations (Groq, Gemini), ATS resume intelligence, and YOLOv8 computer vision.',
      metric: 'Groq · Llama 3.3 · YOLOv8',
      href: '/work/devpilot-ai',
    },
    {
      id: 'fullstack',
      tag: 'Full Stack',
      title: 'Full Stack Systems',
      subtitle: 'Production web applications',
      detail: 'End-to-end architectures with Next.js, React, Node.js, Express, and Python FastAPI.',
      metric: 'Next.js · React · Node · Python',
      href: '#work',
    },
    {
      id: 'fintech',
      tag: 'FinTech',
      title: 'FinTech Platforms',
      subtitle: 'Trading & financial systems',
      detail: 'RTX 5 Web Terminal, CRM account flows, KYC, wallets, deposits, and trade lifecycles.',
      metric: 'Live Trading Terminal · CRM',
      href: 'https://webterminal.orrnn.com/',
      isExternal: true,
    },
    {
      id: 'realtime',
      tag: 'Real-Time',
      title: 'Real-Time Systems',
      subtitle: 'WebSockets / live systems',
      detail: 'Sub-second streaming market feeds, Socket.IO live sessions, and FIX 4.4 protocols.',
      metric: 'WebSockets · Socket.IO · FIX',
      href: '/work/fintech-trading-systems',
    },
    {
      id: 'engineering',
      tag: 'Engineering',
      title: 'Core Engineering',
      subtitle: 'APIs / databases / deployment',
      detail: 'PostgreSQL, Redis, Docker containers, authentication boundaries, and 502/429 triage.',
      metric: 'Postgres · Redis · Docker · Nginx',
      href: '#experience',
    },
  ];

  return (
    <div className="mt-14 sm:mt-16 lg:mt-20">
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Engineering Focus Areas</p>
        <span className="font-mono text-xs text-dim">5 core domains</span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
        {cards.map((card, i) => {
          // Responsive span distribution across 12 columns
          const spanClass =
            i === 0
              ? 'lg:col-span-4'
              : i === 1
              ? 'lg:col-span-4'
              : i === 2
              ? 'lg:col-span-4'
              : i === 3
              ? 'lg:col-span-6'
              : 'lg:col-span-6';

          const CardInner = (
            <div className="flex h-full flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="tag-badge">{card.tag}</span>
                <span className="flex items-center gap-1 font-mono text-[0.68rem] text-dim">
                  {card.metric}
                  {card.isExternal ? (
                    <Icon name="arrowUpRight" className="h-3 w-3 text-signal" />
                  ) : (
                    <Icon name="arrowRight" className="h-3 w-3 text-fog" />
                  )}
                </span>
              </div>

              <h3 className="h-card mt-3 text-base text-paper sm:text-lg">{card.title}</h3>
              <p className="text-xs font-medium text-signal/90">{card.subtitle}</p>
              <p className="mt-2 text-xs leading-relaxed text-fog sm:text-[0.84rem]">{card.detail}</p>
            </div>
          );

          return (
            <SpotlightCard
              key={card.id}
              className={`bento-card group ${spanClass}`}
              style={{ '--d': `${i * 60}ms` }}
            >
              {card.isExternal ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  {CardInner}
                </a>
              ) : card.href.startsWith('/') ? (
                <Link
                  to={card.href}
                  className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  {CardInner}
                </Link>
              ) : (
                <a
                  href={card.href}
                  className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-signal"
                >
                  {CardInner}
                </a>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const e = profile.education;
  const heroStack = profile.heroStack || ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI'];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-grid" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Title, Identity, Stack, CTAs */}
          <div className="hero-col lg:col-span-7">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong bg-graphite/85 px-3 py-1.5 text-xs text-fog backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-go opacity-70 motion-safe:animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-go" />
              </span>
              <span>{profile.availability.summary}</span>
              <span className="hidden text-rule-strong sm:inline">|</span>
              <span className="hidden text-dim sm:inline">{profile.availability.noticePeriod} notice</span>
            </div>

            {/* Main Headline */}
            <h1 id="hero-title" className="mt-6">
              <span className="hero-name block font-wide font-bold uppercase leading-[0.9] tracking-[-0.02em] text-paper">
                {profile.name}
              </span>
              <span className="sr-only"> — </span>
              <span className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-wide text-2xl font-bold tracking-tight text-paper sm:text-3xl lg:text-[2.2rem]">
                  <span className="text-signal">AI</span> / Full Stack Engineer
                </span>
              </span>
            </h1>

            {/* Supporting Positioning Statement */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              {profile.tagline ||
                'Building production-grade web applications, AI products, FinTech platforms, CRM systems, and real-time applications.'}
            </p>

            <p className="mt-3 text-sm text-dim">
              Currently engineering FinTech and trading software at{' '}
              <a
                href="#experience"
                className="font-medium text-paper underline decoration-rule-strong underline-offset-4 hover:decoration-signal"
              >
                {currentJob.company}
              </a>
              .
            </p>

            {/* Compact Stack Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-dim">Core:</span>
              {heroStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-rule-strong bg-raised/80 px-2.5 py-1 font-mono text-xs font-medium text-paper transition-colors hover:border-signal/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  View My Work
                  <Icon name="arrowRight" className="nudge-x h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-secondary">
                  <Icon name="download" className="nudge-down h-4 w-4" />
                  Download Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  aria-label="GitHub profile (opens in new tab)"
                >
                  <Icon name="github" />
                  GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  <Icon name="linkedin" />
                  LinkedIn
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Engineering Identity Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-signal/20 via-ion/15 to-transparent blur-md"
              />

              <div className="relative overflow-hidden rounded-2xl border border-rule-strong bg-graphite/95 p-5 shadow-2xl backdrop-blur-xl">
                {/* Header with photo & current role */}
                <div className="flex items-center gap-4">
                  <img
                    src="/images/portrait.webp"
                    width="80"
                    height="80"
                    alt={`${profile.name} at work`}
                    fetchpriority="high"
                    decoding="async"
                    className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-rule-strong sm:h-20 sm:w-20"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="relative h-2 w-2 rounded-full bg-go" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-go">Production Active</span>
                    </div>
                    <p className="mt-1 font-wide text-base font-semibold text-paper sm:text-lg">{profile.name}</p>
                    <p className="truncate text-xs text-fog">
                      {currentJob.role} · {currentJob.company}
                    </p>
                  </div>
                </div>

                {/* Engineering specs grid */}
                <dl className="mt-5 grid grid-cols-2 gap-2 border-t border-rule pt-4 text-xs">
                  <div className="rounded-lg border border-rule/80 bg-ink/50 p-2.5">
                    <dt className="label text-[0.65rem]">Domain</dt>
                    <dd className="mt-1 font-medium text-paper">{currentJob.domain}</dd>
                  </div>
                  <div className="rounded-lg border border-rule/80 bg-ink/50 p-2.5">
                    <dt className="label text-[0.65rem]">Location</dt>
                    <dd className="mt-1 font-medium text-paper">{profile.locationShort}</dd>
                  </div>
                  <div className="rounded-lg border border-rule/80 bg-ink/50 p-2.5">
                    <dt className="label text-[0.65rem]">Education</dt>
                    <dd className="mt-1 font-medium text-paper">
                      B.Tech IT '25 <span className="text-dim">({e.cgpa} CGPA)</span>
                    </dd>
                  </div>
                  <div className="rounded-lg border border-rule/80 bg-ink/50 p-2.5">
                    <dt className="label text-[0.65rem]">Flagship AI</dt>
                    <dd className="mt-1 font-medium text-paper">
                      <Link to={caseStudyPath('devpilot-ai')} className="text-signal hover:underline">
                        DevPilot AI →
                      </Link>
                    </dd>
                  </div>
                </dl>

                {/* Quick Recruiter Callout */}
                <div className="mt-4 rounded-xl border border-rule bg-raised/70 p-3">
                  <p className="flex items-center justify-between text-[0.78rem] text-fog">
                    <span>Target Roles:</span>
                    <span className="font-mono text-xs text-paper">AI / Full Stack / SWE</span>
                  </p>
                  <p className="mt-1 flex items-center justify-between text-[0.78rem] text-fog">
                    <span>Work Preference:</span>
                    <span className="font-mono text-xs text-paper">Remote / Hybrid</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual / Bento Area (Section 6) */}
        <HeroBento />
      </div>
    </section>
  );
}
