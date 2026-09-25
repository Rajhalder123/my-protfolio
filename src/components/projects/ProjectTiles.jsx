import { Link } from 'react-router-dom';
import { caseStudyPath } from '../../lib/content';
import Icon from '../ui/Icon';
import { BrowserFrame, Chips, Schematic, SpotlightCard, Status } from '../ui/primitives';

export function ProjectLinks({ project, className = '', showCaseStudy = true }) {
  const { links } = project;
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {showCaseStudy && project.caseStudy && (
        <Link to={caseStudyPath(project.slug)} className="btn btn-primary btn-sm">
          Read case study
          <span className="sr-only">: {project.title}</span>
          <Icon name="arrowRight" className="nudge-x h-4 w-4" />
        </Link>
      )}
      {links.demo && (
        <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
          {links.demoLabel || 'Live demo'}
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <Icon name="arrowUpRight" className="nudge-up h-4 w-4" />
        </a>
      )}
      {links.source && (
        <a href={links.source} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          <Icon name="github" />
          Source
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function ProblemBuilt({ project, className = '' }) {
  return (
    <dl className={`grid gap-5 sm:grid-cols-2 ${className}`}>
      <div>
        <dt className="label">Problem</dt>
        <dd className="mt-2 text-[0.95rem] leading-relaxed text-fog">{project.problem}</dd>
      </div>
      <div>
        <dt className="label">What I built</dt>
        <dd className="mt-2 text-[0.95rem] leading-relaxed text-fog">{project.built}</dd>
      </div>
    </dl>
  );
}

function TileHeading({ project, as: H = 'h3', size = 'text-2xl' }) {
  const title = project.caseStudy ? (
    <Link to={caseStudyPath(project.slug)} className="hover:text-signal">
      {project.title}
    </Link>
  ) : (
    project.title
  );
  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <Status status={project.status} />
        {project.year && <span className="label">{project.year}</span>}
      </div>
      <H className={`h-card mt-3 ${size}`}>{title}</H>
      <p className="mt-1.5 text-fog">{project.tagline}</p>
    </>
  );
}

/** Flagship tile: screenshot, problem/solution, architecture, stack, links. */
export function FlagshipTile({ project, className = '' }) {
  return (
    <SpotlightCard className={`zoom-parent flex flex-col p-4 sm:p-6 ${className}`}>
      <Link to={caseStudyPath(project.slug)} tabIndex={-1} aria-hidden="true" className="zoom-media block">
        <BrowserFrame image={project.image} url={project.links.demo} />
      </Link>
      <div className="mt-6 px-1">
        <TileHeading project={project} size="text-2xl sm:text-[1.75rem]" />
        <ProblemBuilt project={project} className="mt-6" />
        {project.architecture && (
          <Schematic
            architecture={project.architecture}
            label={`${project.title} architecture`}
            className="mt-7 hidden rounded-xl border border-rule bg-ink/50 p-4 sm:block"
          />
        )}
        <Chips items={project.stack} max={8} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
    </SpotlightCard>
  );
}

/** Confidential professional work: illustration, highlights, no links to private systems. */
export function PrivateTile({ project, className = '' }) {
  if (!project.image.illustration) {
    return (
      <SpotlightCard className={`zoom-parent flex flex-col p-4 sm:p-6 ${className}`}>
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="zoom-media block">
          <BrowserFrame image={project.image} url={project.links.demo} />
        </a>
        <PrivateTileBody project={project} />
      </SpotlightCard>
    );
  }
  return (
    <SpotlightCard className={`flex flex-col p-4 sm:p-6 ${className}`}>
      <figure className="relative overflow-hidden rounded-xl border border-rule">
        <img
          src={project.image.src}
          width={project.image.w}
          height={project.image.h}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" aria-hidden="true" />
        <figcaption className="absolute bottom-2 left-2 rounded-md border border-rule-strong bg-ink/80 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-fog">
          Illustration
        </figcaption>
      </figure>
      <PrivateTileBody project={project} />
    </SpotlightCard>
  );
}

function PrivateTileBody({ project }) {
  return (
      <div className="mt-6 flex flex-1 flex-col px-1">
        <TileHeading project={project} size="text-xl sm:text-2xl" />
        <p className="mt-4 text-[0.95rem] leading-relaxed text-fog">{project.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-paper">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
              {h}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex gap-2 rounded-lg border border-rule bg-ink/60 p-3 text-xs leading-relaxed text-dim">
          <Icon name="lock" className="h-4 w-4 shrink-0 text-ion" />
          {project.confidentialNote}
        </p>
        <Chips items={project.stack} max={6} className="mt-5" />
        <div className="mt-auto pt-6">
          <ProjectLinks project={project} />
        </div>
      </div>
  );
}

/** Wide tile: image beside content, with the pipeline schematic. */
export function WideTile({ project, className = '' }) {
  return (
    <SpotlightCard className={`zoom-parent grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <div className="lg:col-span-5">
        <Link to={caseStudyPath(project.slug)} tabIndex={-1} aria-hidden="true" className="zoom-media block">
          <BrowserFrame image={project.image} url={project.links.demo} />
        </Link>
      </div>
      <div className="px-1 lg:col-span-7">
        <TileHeading project={project} size="text-2xl" />
        <ProblemBuilt project={project} className="mt-6" />
        {project.architecture && (
          <Schematic
            architecture={project.architecture}
            label={`${project.title} pipeline`}
            className="mt-7 hidden rounded-xl border border-rule bg-ink/50 p-4 sm:block"
          />
        )}
        <Chips items={project.stack} max={8} className="mt-6" />
        <ProjectLinks project={project} className="mt-6" />
      </div>
    </SpotlightCard>
  );
}

/** Compact card with an expandable "how it's built" panel. */
export function ProjectCard({ project, className = '', ...rest }) {
  const { links } = project;
  return (
    <SpotlightCard className={`zoom-parent flex flex-col ${className}`} {...rest}>
      <div className="zoom-media aspect-[16/10] overflow-hidden border-b border-rule bg-ink">
        <img
          src={project.image.src}
          width={project.image.w}
          height={project.image.h}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="h-card text-lg">{project.title}</h4>
          <Status status={project.status} className="shrink-0" />
        </div>
        <p className="mt-1 text-sm text-fog">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-fog">{project.summary}</p>

        <details className="group mt-4 border-t border-rule pt-3">
          <summary className="flex min-h-[40px] items-center justify-between gap-2 rounded-md text-sm font-medium text-paper">
            How it's built
            <Icon name="chevronDown" className="h-4 w-4 text-fog transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <dl className="mt-2 space-y-3 pb-1">
            <div>
              <dt className="label">Problem</dt>
              <dd className="mt-1 text-sm leading-relaxed text-fog">{project.problem}</dd>
            </div>
            <div>
              <dt className="label">What I built</dt>
              <dd className="mt-1 text-sm leading-relaxed text-fog">{project.built}</dd>
            </div>
          </dl>
        </details>

        <Chips items={project.stack} max={4} className="mt-4" />

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="text-link">
              Live demo<span className="sr-only">: {project.title} (opens in a new tab)</span>
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </a>
          )}
          {links.source && (
            <a href={links.source} target="_blank" rel="noopener noreferrer" className="text-link">
              Source<span className="sr-only">: {project.title} (opens in a new tab)</span>
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </a>
          )}
          {(links.extra || []).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
              {l.label}<span className="sr-only">: {project.title} (opens in a new tab)</span>
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </a>
          ))}
          {!links.source && <span className="text-xs text-dim">Source not public</span>}
        </div>
      </div>
    </SpotlightCard>
  );
}
