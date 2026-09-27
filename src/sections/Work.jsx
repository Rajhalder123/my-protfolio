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
          eyebrow="Featured Projects"
          title="Production Systems & AI Products"
          lede="Architected and built across AI, FinTech, and real-time environments. Every project emphasizes clean code, API type safety, and real-world utility."
        />

        {/* Featured Projects Grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Flagship AI: DevPilot AI (8 cols) */}
          <FlagshipTile project={getProject('devpilot-ai')} className="reveal lg:col-span-8" />

          {/* Production FinTech & Trading Systems: YoForex (4 cols) */}
          <PrivateTile project={getProject('fintech-trading-systems')} className="reveal lg:col-span-4" />

          {/* AI & Computer Vision: Aadhaar Mask Detector (12 cols) */}
          <WideTile project={getProject('aadhaar-mask-detector')} className="reveal lg:col-span-12" />
        </div>

        {/* Secondary Projects Section */}
        <div className="reveal mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-12">
          <div>
            <p className="eyebrow">Developer Tools & Web Applications</p>
            <h3 className="h-card mt-2 text-xl text-paper sm:text-2xl">Additional Projects</h3>
            <p className="mt-1 text-xs text-fog sm:text-sm">
              AI code analyzers, WebSockets chat applications, and full-stack MERN systems.
            </p>
          </div>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <Icon name="github" />
            <span>View All Repositories</span>
            <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moreProjects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              className="reveal"
              style={{ '--d': `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
