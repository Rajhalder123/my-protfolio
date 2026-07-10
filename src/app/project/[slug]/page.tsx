import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Code2, Layers3, Rocket, ShieldCheck, type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { profile, projects } from '@/data/portfolio';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Project not found',
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/project/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Raj Haldar`,
      description: project.summary,
      url: `${profile.siteUrl}/project/${project.slug}`,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid-mask absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <Button asChild variant="premium" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="section-kicker">{project.eyebrow}</p>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.94] tracking-normal sm:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{project.summary}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {project.demo ? (
                <Button asChild>
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {project.source ? (
                <Button asChild variant="premium">
                  <a href={project.source} target="_blank" rel="noreferrer">
                    <Code2 className="h-4 w-4" />
                    Source
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-ink-900 shadow-premium">
            <Image
              src={project.image}
              alt={`${project.title} hero preview`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,6,8,0.82))]" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <CaseBlock title="Problem" icon={ShieldCheck} text={project.problem} />
          <CaseBlock title="Solution" icon={Rocket} text={project.solution} />
          <CaseBlock title="Challenge" icon={Layers3} text={project.challenge} />
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Architecture</p>
            <h2 className="text-3xl font-semibold text-pearl sm:text-5xl">How it is structured</h2>
            <p className="mt-5 text-base leading-8 text-mist">{project.architecture}</p>
          </div>
          <div className="grid gap-4">
            {project.impact.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-ink-900/70 p-5 text-base leading-8 text-mist">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Gallery</p>
              <h2 className="text-3xl font-semibold text-pearl sm:text-5xl">Visual system and related states</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-mist">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-ink-900">
                <Image
                  src={image}
                  alt={`${project.title} gallery ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseBlock({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-hairline backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-brand">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <p className="text-sm leading-7 text-mist">{text}</p>
    </article>
  );
}
