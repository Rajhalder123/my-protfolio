'use client';

import { ArrowUpRight, BookOpen, ChevronDown, GitBranch, Quote, ShieldCheck } from 'lucide-react';

import {
  blogs,
  certifications,
  faqs,
  latestRepositories,
  testimonials,
} from '@/data/portfolio';
import { Reveal } from './motion-primitives';
import { TerminalPanel } from './terminal-panel';

const contributionCells = Array.from({ length: 91 }, (_, index) => {
  const value = (index * 7 + Math.floor(index / 3) * 3 + 2) % 5;
  return value;
});

const contributionClasses = [
  'bg-white/[0.05]',
  'bg-cyan-brand/20',
  'bg-cyan-brand/35',
  'bg-signal-green/45',
  'bg-signal-green/75',
];

export function ExtrasSection() {
  return (
    <section id="extras" className="premium-section">
      <div className="container">
        <Reveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <span className="section-kicker">Signals</span>
              <h2 className="section-title">Proof of momentum, learning, and product curiosity.</h2>
            </div>
            <p className="section-copy lg:justify-self-end">
              Beyond project screenshots, the portfolio includes the small trust signals recruiters and founders scan for: repos, writing, testimonials, certifications, and a working terminal.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="premium-panel p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-pearl">
                    <GitBranch className="h-4 w-4 text-cyan-brand" />
                    GitHub contribution graph
                  </div>
                  <p className="mt-2 text-sm text-mist">A visual activity map for consistent shipping habits.</p>
                </div>
                <span className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-mist">
                  13 weeks
                </span>
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
                {contributionCells.map((level, index) => (
                  <span
                    key={index}
                    className={`h-3 w-3 rounded-[3px] ${contributionClasses[level]}`}
                    aria-label={`Contribution level ${level}`}
                  />
                ))}
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {latestRepositories.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:border-cyan-brand/35"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="break-words text-sm font-semibold text-pearl">{repo.name}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-mist transition group-hover:text-cyan-brand" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-mist">{repo.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {repo.stack.map((item) => (
                        <span key={item} className="rounded bg-white/[0.06] px-2 py-1 text-[0.68rem] text-mist">
                          {item}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <TerminalPanel />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="muted-panel h-full p-5">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-pearl">
                <BookOpen className="h-4 w-4 text-cyan-brand" />
                Blog pipeline
              </div>
              <div className="grid gap-3">
                {blogs.map((blog) => (
                  <div key={blog.title} className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-brand">{blog.topic}</p>
                    <h3 className="mt-2 text-sm font-semibold leading-6 text-pearl">{blog.title}</h3>
                    <p className="mt-2 text-xs text-mist">{blog.readTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="muted-panel h-full p-5">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-pearl">
                <Quote className="h-4 w-4 text-signal-green" />
                Testimonials
              </div>
              <div className="grid gap-3">
                {testimonials.map((testimonial) => (
                  <figure key={testimonial.quote} className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                    <blockquote className="text-sm leading-7 text-mist">"{testimonial.quote}"</blockquote>
                    <figcaption className="mt-4 text-xs text-mist">
                      <span className="font-semibold text-pearl">{testimonial.author}</span> - {testimonial.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="muted-panel h-full p-5">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-pearl">
                <ShieldCheck className="h-4 w-4 text-signal-amber" />
                Certifications
              </div>
              <div className="grid gap-3">
                {certifications.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-white/[0.045] p-4 text-sm leading-7 text-mist">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h3 className="mb-4 text-lg font-semibold text-pearl">FAQ</h3>
            <div className="grid gap-2">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-md border border-white/10 bg-ink-950/45 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-pearl">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 text-mist transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-mist">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
