import { getProject, moreProjects, profile } from '../lib/content';
import Icon from '../components/ui/Icon';
import { SectionHeader } from '../components/ui/primitives';
import { FlagshipTile, PrivateTile, ProjectCard, WideTile } from '../components/projects/ProjectTiles';

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          eyebrow="Selected work"
          title="Products and systems I've built"
          lede="Three case studies cover the problem, the architecture and the engineering decisions. Smaller projects follow below."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <FlagshipTile project={getProject('devpilot-ai')} className="reveal lg:col-span-8" />
          <PrivateTile project={getProject('fintech-trading-systems')} className="reveal lg:col-span-4" />
          <WideTile project={getProject('aadhaar-mask-detector')} className="reveal lg:col-span-12" />
        </div>

        <div className="reveal mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="h-card text-xl sm:text-2xl">More projects</h3>
            <p className="mt-1 text-sm text-fog">Smaller builds across AI, real-time and full-stack web.</p>
          </div>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-link">
            <Icon name="github" />
            All repositories on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moreProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} className="reveal" style={{ '--d': `${i * 60}ms` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
