import { Link } from 'react-router-dom';
import { caseStudyPath, experience } from '../lib/content';
import Icon from '../components/ui/Icon';
import { Chips, SectionHeader, SpotlightCard } from '../components/ui/primitives';

export default function Experience() {
  const job = experience[0];

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          eyebrow="Production Experience"
          title={`${job.role} · ${job.company}`}
          lede="Hands-on full-stack and systems engineering for a high-throughput trading and FinTech platform. Real users, real money movement, and live market infrastructure."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Company & Role Overview Card */}
          <aside className="reveal lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <span className="tag-badge">Production Role</span>
                <span className="font-mono text-xs text-go">Active</span>
              </div>

              <h3 className="h-card mt-4 text-2xl text-paper">{job.company}</h3>
              <p className="mt-1 font-medium text-signal">{job.role}</p>
              <p className="text-sm text-fog">{job.domain}</p>

              <ul className="mt-5 space-y-2.5 border-t border-rule pt-4 text-xs text-fog">
                <li className="flex items-center gap-2">
                  <Icon name="briefcase" className="h-4 w-4 text-signal" />
                  <span className="font-mono">{job.period}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="mapPin" className="h-4 w-4 text-signal" />
                  <span>{job.location}</span>
                </li>
              </ul>

              <div className="mt-5 border-t border-rule pt-4">
                <p className="label">Technical Responsibility</p>
                <p className="mt-2 text-xs leading-relaxed text-fog sm:text-[0.85rem]">{job.growth}</p>
              </div>

              <div className="mt-5 border-t border-rule pt-4">
                <p className="label">Production Tech Stack</p>
                <Chips items={job.stack} className="mt-2.5" />
              </div>

              <div className="mt-6 flex flex-col items-start gap-2.5 border-t border-rule pt-4">
                {job.live && (
                  <a
                    href={job.live.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm w-full justify-between"
                  >
                    <span>Live: {job.live.label}</span>
                    <Icon name="arrowUpRight" className="h-4 w-4" />
                  </a>
                )}
                <Link
                  to={caseStudyPath('fintech-trading-systems')}
                  className="btn btn-secondary btn-sm w-full justify-between"
                >
                  <span>Read FinTech Case Study</span>
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Detailed Engineering Responsibility Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {job.areas.map((a, i) => (
              <SpotlightCard
                key={a.id}
                className="reveal flex flex-col p-5 sm:p-6"
                style={{ '--d': `${(i % 2) * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-[0.65rem] text-dim">Area 0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                </div>
                <h4 className="font-wide mt-3 text-base font-semibold leading-snug text-paper sm:text-[1.1rem]">
                  {a.title}
                </h4>
                <ul className="mt-4 flex-1 space-y-3">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-xs leading-relaxed text-fog sm:text-[0.88rem]">
                      <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-signal/70" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
