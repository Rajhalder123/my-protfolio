import { Link } from 'react-router-dom';
import { caseStudyPath, experience } from '../lib/content';
import Icon from '../components/ui/Icon';
import { Chips, SectionHeader } from '../components/ui/primitives';

export default function Experience() {
  const job = experience[0];

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title={`${job.role} at ${job.company}`}
          lede={job.summary}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <aside className="reveal lg:col-span-4">
            <div className="card p-6 lg:sticky lg:top-24">
              <h3 className="h-card text-2xl">{job.company}</h3>
              <p className="mt-1 text-paper">{job.role}</p>
              <p className="text-sm text-fog">{job.domain}</p>

              <ul className="mt-5 space-y-2 text-sm text-fog">
                <li className="flex items-center gap-2">
                  <Icon name="briefcase" className="h-4 w-4 text-dim" />
                  {job.period}
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="mapPin" className="h-4 w-4 text-dim" />
                  {job.location}
                </li>
              </ul>

              <div className="mt-6 border-t border-rule pt-5">
                <p className="label">Scope</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">{job.growth}</p>
              </div>

              <div className="mt-6 border-t border-rule pt-5">
                <p className="label">Stack at work</p>
                <Chips items={job.stack} className="mt-3" />
              </div>

              <div className="mt-6 flex flex-col items-start gap-3">
                {job.live && (
                  <a href={job.live.url} target="_blank" rel="noopener noreferrer" className="text-link">
                    Live: {job.live.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                  </a>
                )}
                <Link to={caseStudyPath('fintech-trading-systems')} className="text-link">
                  FinTech & trading case study
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {job.areas.map((a, i) => (
              <article
                key={a.id}
                className="reveal card p-5 sm:p-6"
                style={{ '--d': `${(i % 2) * 70}ms` }}
              >
                <h4 className="font-wide text-[1.05rem] font-semibold leading-snug text-paper">{a.title}</h4>
                <ul className="mt-4 space-y-3">
                  {a.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.94rem] leading-relaxed text-fog">
                      <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
