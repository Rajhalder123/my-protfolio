import { Link } from 'react-router-dom';
import { caseStudyPath } from '../../lib/content';
import Icon from '../ui/Icon';
import { BrowserFrame, Chips, Schematic, SpotlightCard, Status } from '../ui/primitives';

export function ProjectLinks({ project, className = '', showCaseStudy = true }) {
  const { links } = project;
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {showCaseStudy && project.caseStudy && (
        <Link to={caseStudyPath(project.slug)} className="btn btn-primary btn-sm">
          Read Case Study
          <span className="sr-only">: {project.title}</span>
          <Icon name="arrowRight" className="nudge-x h-4 w-4" />
        </Link>
      )}
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
        >
          {links.demoLabel || 'Live Demo'}
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <Icon name="arrowUpRight" className="nudge-up h-4 w-4" />
        </a>
      )}
      {links.source && (
        <a
          href={links.source}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
        >
          <Icon name="github" />
          GitHub
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

function ProblemBuilt({ project, className = '' }) {
  return (
    <dl className={`grid gap-5 sm:grid-cols-2 ${className}`}>
      <div className="rounded-xl border border-rule/70 bg-ink/40 p-4">
        <dt className="label text-signal">The Problem</dt>
        <dd className="mt-1.5 text-xs leading-relaxed text-fog sm:text-[0.88rem]">{project.problem}</dd>
      </div>
      <div className="rounded-xl border border-rule/70 bg-ink/40 p-4">
        <dt className="label text-signal">What I Built</dt>
        <dd className="mt-1.5 text-xs leading-relaxed text-fog sm:text-[0.88rem]">{project.built}</dd>
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
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {project.category && <span className="tag-badge">{project.category}</span>}
        <Status status={project.status} />
        {project.year && <span className="font-mono text-xs text-dim">{project.year}</span>}
      </div>
      <H className={`h-card mt-3 font-wide font-bold tracking-tight text-paper ${size}`}>{title}</H>
      <p className="mt-1 text-sm font-medium text-fog">{project.tagline}</p>
    </div>
  );
}

/** Flagship tile: DevPilot AI with browser frame, problem/built, architecture, stack, links. */
export function FlagshipTile({ project, className = '' }) {
  return (
    <SpotlightCard className={`zoom-parent flex flex-col p-5 sm:p-7 ${className}`}>
      <Link
        to={caseStudyPath(project.slug)}
        tabIndex={-1}
        aria-hidden="true"
        className="zoom-media block"
      >
        <BrowserFrame image={project.image} url={project.links.demo} />
      </Link>
      <div className="mt-6 px-1">
        <TileHeading project={project} size="text-2xl sm:text-[1.85rem]" />
        <ProblemBuilt project={project} className="mt-5" />
        {project.architecture && (
          <Schematic
            architecture={project.architecture}
            label={`${project.title} architecture`}
            className="mt-6 hidden rounded-xl border border-rule bg-ink/60 p-4 sm:block"
          />
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
          <Chips items={project.stack} max={8} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}

/** Confidential professional work: YoForex trading systems with live terminal link & highlights. */
export function PrivateTile({ project, className = '' }) {
  return (
    <SpotlightCard className={`zoom-parent flex flex-col p-5 sm:p-7 ${className}`}>
      <a
        href={project.links.demo}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="zoom-media block"
      >
        <BrowserFrame image={project.image} url={project.links.demo} />
      </a>
      <div className="mt-6 flex flex-1 flex-col px-1">
        <TileHeading project={project} size="text-xl sm:text-2xl" />
        <p className="mt-3 text-xs leading-relaxed text-fog sm:text-sm">{project.summary}</p>
        <ul className="mt-4 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-xs text-paper sm:text-sm">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        {project.confidentialNote && (
          <p className="mt-4 flex gap-2 rounded-lg border border-rule bg-ink/60 p-3 text-xs leading-relaxed text-dim">
            <Icon name="lock" className="h-4 w-4 shrink-0 text-ion" />
            <span>{project.confidentialNote}</span>
          </p>
        )}
        <div className="mt-auto border-t border-rule pt-5">
          <Chips items={project.stack} max={6} />
          <div className="mt-5">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/** Wide tile: Aadhaar Mask Detector with image beside content & computer vision pipeline. */
export function WideTile({ project, className = '' }) {
  return (
    <SpotlightCard className={`zoom-parent grid gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <div className="lg:col-span-5">
        <Link
          to={caseStudyPath(project.slug)}
          tabIndex={-1}
          aria-hidden="true"
          className="zoom-media block"
        >
          <BrowserFrame image={project.image} url={project.links.demo} />
        </Link>
      </div>
      <div className="flex flex-col justify-between px-1 lg:col-span-7">
        <div>
          <TileHeading project={project} size="text-2xl" />
          <ProblemBuilt project={project} className="mt-5" />
          {project.architecture && (
            <Schematic
              architecture={project.architecture}
              label={`${project.title} pipeline`}
              className="mt-5 hidden rounded-xl border border-rule bg-ink/60 p-4 sm:block"
            />
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
          <Chips items={project.stack} max={8} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </SpotlightCard>
  );
}

/** Secondary project card: AI Verse, Chatty, HaldarCars, Fotoflix. */
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
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {project.category && <span className="tag-badge text-[0.65rem]">{project.category}</span>}
          <Status status={project.status} className="shrink-0" />
        </div>
        <h4 className="h-card mt-2 text-lg text-paper">{project.title}</h4>
        <p className="mt-0.5 text-xs font-medium text-fog">{project.tagline}</p>
        <p className="mt-2 text-xs leading-relaxed text-fog">{project.summary}</p>

        {project.problem && project.built && (
          <details className="group mt-3 border-t border-rule pt-2.5">
            <summary className="flex min-h-[32px] items-center justify-between gap-2 text-xs font-medium text-paper hover:text-signal">
              <span>Problem & Engineering details</span>
              <Icon
                name="chevronDown"
                className="h-3.5 w-3.5 text-fog transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <dl className="mt-2 space-y-2 border-t border-rule/50 pt-2 text-xs leading-relaxed text-fog">
              <div>
                <dt className="label text-[0.62rem] text-signal">Problem</dt>
                <dd className="mt-0.5">{project.problem}</dd>
              </div>
              <div>
                <dt className="label text-[0.62rem] text-signal">What I built</dt>
                <dd className="mt-0.5">{project.built}</dd>
              </div>
            </dl>
          </details>
        )}

        <div className="mt-auto pt-4">
          <Chips items={project.stack} max={4} className="mb-4" />
          <div className="flex flex-wrap items-center gap-3 border-t border-rule pt-3 text-xs">
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <span>Live Demo</span>
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            )}
            {links.source && (
              <a
                href={links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <span>Source</span>
                <Icon name="github" className="h-3.5 w-3.5" />
              </a>
            )}
            {(links.extra || []).map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <span>{l.label}</span>
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            ))}
            {!links.source && <span className="text-[0.7rem] text-dim">Private Source</span>}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
