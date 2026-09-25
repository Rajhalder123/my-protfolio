import { Link } from 'react-router-dom';
import { profile, resumeUrl, RESUME_FILENAME, currentJob, caseStudyPath } from '../lib/content';
import Icon from '../components/ui/Icon';
import { Magnetic } from '../components/ui/primitives';

function Snapshot() {
  const e = profile.education;
  const items = [
    {
      label: 'Now',
      value: `${currentJob.role}, ${currentJob.company}`,
      detail: currentJob.domain,
      href: '#experience',
    },
    {
      label: 'Based in',
      value: profile.locationShort,
      detail: 'Open to remote',
      href: '#contact',
    },
    {
      label: 'Education',
      value: `B.Tech IT, ${e.year}`,
      detail: `${e.schoolShort} · CGPA ${e.cgpa}`,
      href: '#about',
    },
    {
      label: 'Flagship project',
      value: 'DevPilot AI',
      detail: 'AI career co-pilot',
      to: caseStudyPath('devpilot-ai'),
    },
  ];

  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-rule bg-graphite/80 backdrop-blur-sm lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`relative p-4 transition-colors focus-within:bg-raised hover:bg-raised sm:p-5 ${
            i % 2 === 1 ? 'border-l border-rule' : ''
          } ${i > 1 ? 'border-t border-rule lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
        >
          <dt className="label">{item.label}</dt>
          <dd className="mt-2 text-[0.95rem] font-medium leading-snug text-paper">
            {item.to ? (
              <Link to={item.to} className="after:absolute after:inset-0 after:content-['']">
                {item.value}
              </Link>
            ) : (
              <a href={item.href} className="after:absolute after:inset-0 after:content-['']">
                {item.value}
              </a>
            )}
          </dd>
          <dd className="mt-0.5 text-sm text-fog">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-grid" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="hero-col lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-rule-strong bg-graphite/70 py-1.5 pl-2.5 pr-3 text-[0.8rem] text-fog">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-go opacity-60 motion-safe:animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-go" />
              </span>
              {profile.availability.summary}
            </p>

            <h1 id="hero-title" className="mt-7">
              <span className="hero-name block font-wide font-bold uppercase leading-[0.9] tracking-[-0.015em] text-paper">
                {profile.name}
              </span>
              <span className="sr-only">, </span>
              <span className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-wide text-[1.35rem] font-semibold tracking-[-0.01em] text-paper sm:text-[1.75rem]">
                  {profile.role}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal sm:text-[0.8rem]">
                  {profile.positioning.join(' · ')}
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog sm:text-xl">
              Building AI-powered products and production systems. Currently shipping FinTech and trading
              software at {currentJob.company}.
            </p>

            <p className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-[0.8rem] text-dim">
              {profile.stackLine.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-rule-strong">
                      /
                    </span>
                  )}
                  <span className="text-fog">{t}</span>
                </span>
              ))}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  View work
                  <Icon name="arrowRight" className="nudge-x h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-secondary">
                  <Icon name="download" className="nudge-down h-4 w-4" />
                  Download resume
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn-ghost">
                  <Icon name="mail" />
                  Contact
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative w-full lg:ml-auto lg:max-w-[22rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-signal/40 via-rule-strong/40 to-ion/40"
              />
              <div className="relative flex items-center gap-4 rounded-[1.3rem] bg-graphite p-2 pr-4 lg:block lg:pr-2">
                <img
                  src="/images/portrait.webp"
                  width="400"
                  height="400"
                  alt={`${profile.name} working at a laptop`}
                  fetchpriority="high"
                  decoding="async"
                  className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24 lg:aspect-square lg:h-auto lg:w-full lg:rounded-2xl"
                />
                <figcaption className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:px-2 lg:pb-1 lg:pt-3">
                  <span>
                    <span className="block text-sm font-medium text-paper">{profile.name}</span>
                    <span className="block text-xs text-fog">
                      {currentJob.role} · {currentJob.company}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-fog">
                    <Icon name="mapPin" className="h-3.5 w-3.5" />
                    {profile.locationShort}
                  </span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-6 lg:mt-16">
          <Snapshot />
        </div>
      </div>
    </section>
  );
}
