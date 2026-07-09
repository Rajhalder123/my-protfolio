'use client';

import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { achievements, profile, timeline } from '@/data/portfolio';
import { Reveal } from './motion-primitives';

export function AboutSection() {
  return (
    <section id="about" className="premium-section border-y border-white/10 bg-white/[0.025]">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <Reveal>
            <div className="sticky top-28">
              <span className="section-kicker">Profile</span>
              <h2 className="section-title">A developer with product taste and systems discipline.</h2>
              <p className="section-copy mt-6">
                I approach portfolio work the same way I approach products: define the job, remove friction, make the interface feel inevitable, then keep refining performance until the experience feels instant.
              </p>

              <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-2 shadow-hairline">
                <div className="relative aspect-[16/11] overflow-hidden rounded-md">
                  <Image
                    src="/assets/hero/hero2.png"
                    alt={`${profile.name} working on a laptop`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="grid gap-5 rounded-lg border border-white/10 bg-ink-900/72 p-5 shadow-hairline sm:grid-cols-[auto_1fr]">
                    <div className="flex items-center gap-4 sm:block">
                      <div className="grid h-12 w-12 place-items-center rounded-md border border-cyan-brand/25 bg-cyan-brand/10 text-cyan-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="font-mono text-sm text-cyan-brand sm:mt-4">{item.year}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-pearl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-mist">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {achievements.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-signal-green" />
                      <span className="text-sm leading-6 text-mist">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-4 rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(94,231,255,0.10),rgba(124,247,197,0.06),rgba(248,197,107,0.08))] p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-pearl">
                      <CheckCircle2 className="h-4 w-4 text-signal-green" />
                      Current goals
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-mist">
                      Build stronger AI product workflows, sharpen backend architecture, and keep pushing interface craft until each project feels like a polished product rather than a demo.
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 text-cyan-brand sm:block" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
