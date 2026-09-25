import { profile } from '../lib/content';
import Icon from '../components/ui/Icon';
import { SectionHeader } from '../components/ui/primitives';

export default function About() {
  const e = profile.education;
  const facts = [
    { icon: 'mapPin', label: 'Based in', value: profile.location, detail: `Open to ${profile.workPreference}` },
    { icon: 'cap', label: 'Education', value: `${e.degree}, ${e.year}`, detail: `${e.school} · CGPA ${e.cgpa}` },
    ...profile.training.map((t) => ({ icon: 'file', label: 'Training', value: t.name, detail: t.provider })),
    {
      icon: 'briefcase',
      label: 'Looking for',
      value: profile.availability.roles.join(', '),
      detail: profile.availability.companies,
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="reveal lg:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-rule bg-graphite p-2">
              <img
                src="/images/about.webp"
                width="880"
                height="818"
                alt={`${profile.name} working on a laptop at a desk`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl object-cover"
              />
            </figure>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader id="about-title" eyebrow="About" title="Engineer first, from interface to infrastructure" />
            <div className="reveal mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-fog">
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="reveal mt-8 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="bg-graphite p-4 sm:p-5">
                  <dt className="label flex items-center gap-2">
                    <Icon name={f.icon} className="h-3.5 w-3.5" />
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-paper">{f.value}</dd>
                  <dd className="mt-0.5 text-sm text-fog">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="reveal mt-20">
          <h3 className="h-card text-xl sm:text-2xl">How I work</h3>
          <p className="mt-1 text-sm text-fog">The same loop for a new feature or a production incident.</p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {profile.principles.map((step, i) => (
              <li key={step.title} className="relative lg:pr-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-rule-strong bg-graphite font-mono text-xs text-signal">
                    {i + 1}
                  </span>
                  {i < profile.principles.length - 1 && (
                    <span aria-hidden="true" className="rail hidden h-px flex-1 lg:block" />
                  )}
                </div>
                <h4 className="mt-4 text-[0.95rem] font-medium text-paper">{step.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-fog">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
