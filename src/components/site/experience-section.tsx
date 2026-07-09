'use client';

import { Briefcase, CircleCheck, Cpu } from 'lucide-react';

import { experience } from '@/data/portfolio';
import { Reveal } from './motion-primitives';

export function ExperienceSection() {
  return (
    <section id="experience" className="premium-section border-y border-white/10 bg-white/[0.025]">
      <div className="container">
        <Reveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <span className="section-kicker">Experience</span>
              <h2 className="section-title">Execution across frontend, backend, AI, and motion.</h2>
            </div>
            <p className="section-copy lg:justify-self-end">
              The timeline highlights practical responsibilities and impact, not vague job titles. Each chapter maps to shipped work and visible product outcomes.
            </p>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-[linear-gradient(180deg,#5ee7ff,rgba(255,255,255,0.08),#7cf7c5)] md:block" />

          <div className="grid gap-6">
            {experience.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="relative grid gap-5 rounded-lg border border-white/10 bg-ink-900/70 p-5 shadow-hairline backdrop-blur-xl md:grid-cols-[72px_1fr] md:p-6" data-gsap-reveal>
                  <div className="relative flex items-start md:justify-center">
                    <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-brand/35 bg-cyan-brand/10 text-cyan-brand shadow-hairline">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-brand">{item.period}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-pearl">{item.title}</h3>
                        <p className="mt-1 text-sm text-mist">{item.company}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-mist">
                        <Cpu className="h-4 w-4 text-signal-green" />
                        Impact-focused
                      </div>
                    </div>

                    <p className="text-base leading-8 text-mist">{item.impact}</p>

                    <div className="grid gap-3">
                      {item.responsibilities.map((responsibility) => (
                        <div key={responsibility} className="flex gap-3 text-sm leading-7 text-mist">
                          <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-signal-green" />
                          <span>{responsibility}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-mist">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
