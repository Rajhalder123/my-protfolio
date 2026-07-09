'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { skills } from '@/data/portfolio';
import { Reveal } from './motion-primitives';

export function SkillsSection() {
  return (
    <section id="skills" className="premium-section">
      <div className="container">
        <Reveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-kicker justify-center">Skill system</span>
            <h2 className="section-title mx-auto">A stack organized around shipping complete products.</h2>
            <p className="section-copy mx-auto mt-6">
              Frontend craft, backend reliability, cloud deployment, AI workflows, and product design are treated as one connected system.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {skills.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.category} delay={index * 0.06}>
                <section className="premium-panel h-full p-5 sm:p-6" data-gsap-reveal>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-md border border-cyan-brand/25 bg-cyan-brand/10 text-cyan-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-pearl">{category.category}</h3>
                        <p className="text-xs uppercase tracking-[0.18em] text-mist">Core capability</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {category.tools.map((tool) => (
                      <div key={tool.name} className="grid gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.06]">
                              {tool.image.endsWith('.svg') || tool.image.startsWith('https://') ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={tool.image} alt="" className="h-5 w-5 object-contain" loading="lazy" />
                              ) : (
                                <Image src={tool.image} alt="" width={20} height={20} className="object-contain" />
                              )}
                            </span>
                            <span className="text-sm font-medium text-pearl">{tool.name}</span>
                          </div>
                          <span className="font-mono text-xs text-mist">{tool.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#5ee7ff,#7cf7c5,#f8c56b)]"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tool.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden border-y border-white/10 py-4">
          <div className="flex w-max animate-marquee gap-3" data-gsap-track>
            {[...skills.flatMap((category) => category.tools), ...skills.flatMap((category) => category.tools)].map((tool, index) => (
              <span key={`${tool.name}-${index}`} className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mist">
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
