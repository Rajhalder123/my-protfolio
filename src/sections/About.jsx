import { profile } from '../lib/content';
import Icon from '../components/ui/Icon';
import { SectionHeader, SpotlightCard } from '../components/ui/primitives';

export default function About() {
  const e = profile.education;
  const facts = [
    { icon: 'mapPin', label: 'Location', value: profile.location, detail: `Open to ${profile.workPreference}` },
    { icon: 'cap', label: 'Education', value: `${e.degree} (2025)`, detail: `${e.school} · CGPA ${e.cgpa}` },
    ...(profile.training || []).map((t) => ({ icon: 'file', label: 'Specialized Training', value: t.name, detail: t.provider })),
    {
      icon: 'briefcase',
      label: 'Target Roles',
      value: profile.availability.roles.slice(0, 2).join(', '),
      detail: profile.availability.companies,
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-page">
        {/* About Grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Visual Desk / Work Image */}
          <div className="reveal lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-signal/20 via-transparent to-ion/20 blur-sm"
              />
              <figure className="relative overflow-hidden rounded-2xl border border-rule bg-graphite p-2.5 shadow-xl">
                <img
                  src="/images/about.webp"
                  width="880"
                  height="818"
                  alt={`${profile.name} engineering workspace`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl object-cover"
                />
                <figcaption className="mt-3 flex items-center justify-between px-1 text-xs text-dim">
                  <span>Raj Halder · Software Engineer</span>
                  <span className="font-mono text-signal">{profile.locationShort}</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* About Text & Position */}
          <div className="lg:col-span-7">
            <SectionHeader
              id="about-title"
              eyebrow="About Me"
              title="Full Stack Engineer from interface to infrastructure"
            />

            <div className="reveal mt-6 space-y-4 text-base leading-relaxed text-fog sm:text-[1.05rem]">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Quick Facts & Education */}
            <dl className="reveal mt-8 grid gap-3 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl border border-rule bg-graphite/80 p-4">
                  <dt className="label flex items-center gap-2 text-signal">
                    <Icon name={f.icon} className="h-3.5 w-3.5" />
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-paper">{f.value}</dd>
                  <dd className="mt-0.5 text-xs text-fog">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Engineering Approach (Section 12) */}
        <div className="reveal mt-20 border-t border-rule pt-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Engineering Methodology</p>
              <h3 className="h-card mt-3 text-2xl text-paper sm:text-3xl">How I Build & Ship</h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-fog sm:text-sm">
              A disciplined engineering loop applied across new feature design, real-time pipelines, and production incident resolution.
            </p>
          </div>

          <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {profile.principles.map((step, i) => (
              <SpotlightCard
                key={step.title}
                className="flex flex-col p-5"
                style={{ '--d': `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-signal">0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-rule-strong" />
                </div>
                <h4 className="font-wide mt-3 text-sm font-semibold text-paper sm:text-base">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-fog">
                  {step.detail}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
