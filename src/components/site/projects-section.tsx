'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2, Layers3, Rocket, ShieldCheck, type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';
import { Reveal, Tilt } from './motion-primitives';

export function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-32 lg:pt-6">
      <div className="container">
        <Reveal>
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <span className="section-kicker">Selected work</span>
              <h2 className="section-title">Case studies with product thinking built in.</h2>
            </div>
            <p className="section-copy lg:justify-self-end">
              Every project is framed around the problem, the system behind it, and the user-facing polish that makes it feel production-ready.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <article className="premium-panel overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[420px] overflow-hidden bg-ink-900">
                <Image
                  src={featured.image}
                  alt={`${featured.title} preview`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-contain transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(5,6,8,0.88))]" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-brand">{featured.eyebrow}</p>
                    <h3 className="mt-2 text-3xl font-semibold text-pearl sm:text-4xl">{featured.title}</h3>
                  </div>
                  <div className="rounded-md border border-white/10 bg-ink-950/70 px-3 py-2 text-sm text-mist backdrop-blur-xl">
                    {featured.year}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:p-8">
                <p className="text-lg leading-8 text-mist">{featured.summary}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <MiniCase label="Problem" text={featured.problem} icon={ShieldCheck} />
                  <MiniCase label="Solution" text={featured.solution} icon={Rocket} />
                </div>

                <div className="rounded-md border border-white/10 bg-ink-950/45 p-5">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-brand">
                    <Layers3 className="h-4 w-4" />
                    Architecture
                  </div>
                  <p className="text-sm leading-7 text-mist">{featured.architecture}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featured.techStack.map((tech) => (
                    <span key={tech} className="rounded-md border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-mist">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {featured.demo ? (
                    <Button asChild>
                      <a href={featured.demo} target="_blank" rel="noreferrer">
                        Live Demo
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="premium">
                    <Link href={`/project/${featured.slug}`}>Case Study</Link>
                  </Button>
                  {featured.source ? (
                    <Button asChild variant="outline">
                      <a href={featured.source} target="_blank" rel="noreferrer">
                        <Code2 className="h-4 w-4" />
                        Source
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <Tilt className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-hairline backdrop-blur-xl">
                  <Link href={`/project/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink-900">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                      className="object-contain transition duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_34%,rgba(5,6,8,0.86))]" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-brand">{project.eyebrow}</p>
                      <ArrowUpRight className="h-4 w-4 text-pearl transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-semibold text-pearl">{project.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-mist">{project.summary}</p>

                    <div className="mt-5 grid gap-3">
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mist">Challenge</div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">{project.challenge}</p>
                      </div>
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mist">Impact</div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">{project.impact[0]}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[0.7rem] text-mist">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2 pt-6">
                      <Button asChild variant="premium" size="sm">
                        <Link href={`/project/${project.slug}`}>Details</Link>
                      </Button>
                      {project.demo ? (
                        <Button asChild variant="ghost" size="sm">
                          <a href={project.demo} target="_blank" rel="noreferrer">
                            Demo
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniCase({
  label,
  text,
  icon: Icon,
}: {
  label: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-brand">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="text-sm leading-7 text-mist">{text}</p>
    </div>
  );
}
