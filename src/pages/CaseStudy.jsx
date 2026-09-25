import { Link, useParams } from 'react-router-dom';
import { caseStudies, caseStudyPath, getProject } from '../lib/content';
import { useReveal, usePageMeta } from '../lib/hooks';
import Icon from '../components/ui/Icon';
import { BrowserFrame, Chips, Schematic, Status } from '../components/ui/primitives';
import { ProjectLinks } from '../components/projects/ProjectTiles';
import NotFound from './NotFound';

function Block({ id, label, title, children }) {
  return (
    <section aria-labelledby={id} className="reveal grid gap-4 border-t border-rule py-10 md:grid-cols-12 md:gap-8 md:py-12">
      <div className="md:col-span-4">
        <p className="label">{label}</p>
        <h2 id={id} className="h-card mt-2 text-xl sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="md:col-span-8">{children}</div>
    </section>
  );
}

function CaseHero({ project }) {
  if (project.image.illustration) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-rule">
        <img
          src={project.image.src}
          width={project.image.w}
          height={project.image.h}
          alt={project.image.alt}
          fetchpriority="high"
          className="aspect-[16/8] w-full object-cover opacity-80"
        />
        <figcaption className="border-t border-rule bg-graphite px-4 py-2.5 text-xs text-dim">
          {project.image.caption}
        </figcaption>
      </figure>
    );
  }
  return <BrowserFrame image={project.image} url={project.links.demo} priority />;
}

function Showcase({ showcase }) {
  const [desktop, phone] = showcase.images;
  return (
    <Block id="live-product" label="Live product" title={showcase.title}>
      <p className="text-[1.0625rem] leading-relaxed text-fog">{showcase.summary}</p>
      <div className="mt-6 grid items-start gap-4 sm:grid-cols-[1fr_auto]">
        <BrowserFrame image={desktop} url={showcase.url} />
        {phone && (
          <figure className="mx-auto w-40 overflow-hidden rounded-2xl border border-rule-strong bg-ink sm:w-44">
            <img src={phone.src} width={phone.w} height={phone.h} alt={phone.alt} loading="lazy" decoding="async" className="block w-full" />
            <figcaption className="border-t border-rule px-3 py-2 text-xs text-dim">{phone.caption}</figcaption>
          </figure>
        )}
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {showcase.features.map((f) => (
          <li key={f} className="flex gap-2.5 rounded-lg border border-rule bg-graphite p-3 text-sm text-paper">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
            {f}
          </li>
        ))}
      </ul>
      <p className="label mt-6">Frontend stack (from the public build)</p>
      <Chips items={showcase.stack} className="mt-2" />
      <a href={showcase.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-6">
        Open {showcase.title}
        <span className="sr-only"> (opens in a new tab)</span>
        <Icon name="arrowUpRight" className="nudge-up h-4 w-4" />
      </a>
    </Block>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const valid = project && project.caseStudy;

  usePageMeta(
    valid
      ? { title: `${project.title}: case study`, description: `${project.tagline}. ${project.summary}`, path: caseStudyPath(slug) }
      : { title: 'Page not found' }
  );
  useReveal(slug);

  if (!valid) return <NotFound />;

  const index = caseStudies.findIndex((p) => p.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="pb-20 pt-24 sm:pt-28">
      <div className="container-page">
        <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-fog hover:text-paper">
          <Icon name="arrowLeft" />
          All work
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <Status status={project.status} />
              <span className="label">Case study</span>
            </div>
            <h1 className="mt-4 font-wide text-[2.1rem] font-bold leading-[1.02] tracking-[-0.02em] text-paper sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fog sm:text-xl">{project.summary}</p>
            {(project.links.demo || project.links.source) && (
              <ProjectLinks project={project} showCaseStudy={false} className="mt-6" />
            )}
            {project.confidential && (
              <p className="mt-6 flex max-w-2xl gap-2.5 rounded-lg border border-ion/25 bg-ion/5 p-3.5 text-sm leading-relaxed text-fog">
                <Icon name="lock" className="h-4 w-4 shrink-0 text-ion" />
                {project.confidentialNote}
              </p>
            )}
          </div>

          <dl className="grid content-start gap-px self-start overflow-hidden rounded-2xl border border-rule bg-rule text-sm lg:col-span-4">
            {[
              ['Role', project.role],
              ['When', project.year],
              ['Status', project.outcome],
            ].map(([k, v]) => (
              <div key={k} className="bg-graphite p-4">
                <dt className="label">{k}</dt>
                <dd className="mt-1.5 leading-relaxed text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-10">
          <CaseHero project={project} />
        </div>

        <div className="mt-14">
          <Block id="problem" label="Context" title="The problem">
            <p className="text-[1.0625rem] leading-relaxed text-fog">{project.problem}</p>
          </Block>

          <Block id="solution" label="Solution" title="What I built">
            <p className="text-[1.0625rem] leading-relaxed text-fog">{project.built}</p>
            {project.features && (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5 rounded-lg border border-rule bg-graphite p-3 text-sm text-paper">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </Block>

          {project.showcase && <Showcase showcase={project.showcase} />}

          <Block id="architecture" label="Architecture" title="How it fits together">
            <Schematic
              architecture={project.architecture}
              label={`${project.title} architecture`}
              className="rounded-2xl border border-rule bg-graphite p-4 sm:p-5"
            />
          </Block>

          <Block id="engineering" label="Engineering" title="Key engineering work">
            <ul className="space-y-3.5">
              {project.engineering.map((item) => (
                <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-fog">
                  <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="technology" label="Technology" title="Stack">
            <Chips items={project.stack} />
          </Block>

          <Block id="status" label="Status" title="Where it stands">
            <p className="text-[1.0625rem] leading-relaxed text-fog">{project.outcome}</p>
            {(project.links.demo || project.links.source) && (
              <ProjectLinks project={project} showCaseStudy={false} className="mt-5" />
            )}
          </Block>

          {project.gallery && (
            <Block id="gallery" label="Gallery" title="Screens and visuals">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <figure key={g.src} className="overflow-hidden rounded-xl border border-rule bg-graphite">
                    <img
                      src={g.src}
                      width={g.w}
                      height={g.h}
                      alt={g.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="border-t border-rule px-3 py-2 text-xs text-dim">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          )}
        </div>

        <nav aria-label="Next case study" className="reveal mt-6 border-t border-rule pt-10">
          <Link
            to={caseStudyPath(next.slug)}
            className="group flex flex-col gap-2 rounded-2xl border border-rule bg-graphite p-6 transition-colors hover:border-rule-strong sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="label">Next case study</span>
              <span className="h-card mt-2 block text-2xl group-hover:text-signal">{next.title}</span>
              <span className="mt-1 block text-fog">{next.tagline}</span>
            </span>
            <Icon name="arrowRight" className="h-6 w-6 text-fog transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </article>
  );
}
