import { skills } from '../lib/content';
import SmartLink from '../components/ui/SmartLink';
import Icon from '../components/ui/Icon';
import { Chips, SectionHeader, SpotlightCard, TechIcon } from '../components/ui/primitives';

const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];

function CapabilityCard({ cap, className, style }) {
  return (
    <SpotlightCard className={`zoom-parent flex flex-col ${className}`} style={style}>
      <div className="zoom-media relative h-36 overflow-hidden sm:h-40">
        <img
          src={cap.image.src}
          width={cap.image.w}
          height={cap.image.h}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-70 saturate-[0.8]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-graphite/10 via-graphite/40 to-graphite"
        />
      </div>
      <div className="relative -mt-6 flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <h3 className="h-card text-lg text-paper sm:text-xl">{cap.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-fog sm:text-[0.88rem]">{cap.body}</p>
        <Chips items={cap.stack} className="mt-4" />
        <div className="mt-auto pt-5">
          <p className="label">Production & Project Proof</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {cap.proof.map((p) => (
              <li key={p.label}>
                <SmartLink href={p.href} className="text-link text-xs sm:text-sm">
                  {p.label}
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="capabilities-title"
          eyebrow="Technical Stack & Architecture"
          title="Full Stack, AI & Systems Toolbox"
          lede="Organized by engineering layer. Practical production experience backing every listed technology."
        />

        {/* 6-Group Tech Stack Bento Grid (Section 11) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.toolbox.map((group, i) => (
            <SpotlightCard
              key={group.id}
              className="reveal flex flex-col p-5 sm:p-6"
              style={{ '--d': `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="tag-badge">{group.label}</span>
                <span className="font-mono text-[0.65rem] text-dim">Layer 0{i + 1}</span>
              </div>

              <h4 className="font-wide mt-3 text-lg font-semibold text-paper sm:text-xl">
                {group.label}
              </h4>

              <ul className="mt-4 flex-1 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center">
                    <TechIcon item={item} size={18} />
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>

        {/* Additional Specialized Work & Ongoing Learning */}
        <div className="reveal mt-6 grid gap-4 md:grid-cols-2">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h4 className="label text-signal">Also Used in Production</h4>
              <span className="font-mono text-xs text-dim">YoForex</span>
            </div>
            <p className="mt-1 text-xs text-fog">Infrastructure and gateway services integration:</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {skills.alsoAtWork.map((item) => (
                <li key={item.name}>
                  <TechIcon item={item} size={18} />
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h4 className="label text-signal">Active Engineering Research</h4>
              <span className="font-mono text-xs text-dim">Growth</span>
            </div>
            <p className="mt-1 text-xs text-fog">Currently deepening distributed systems and concurrency:</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
              {skills.learning.map((item) => (
                <li key={item.name}>
                  <TechIcon item={item} size={18} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Applied Engineering Domains with Real Proof */}
        <div className="mt-20 border-t border-rule pt-16">
          <div className="mb-8">
            <p className="eyebrow">Practical Domain Experience</p>
            <h3 className="h-card mt-2 text-2xl text-paper sm:text-3xl">Where I've Applied These Technologies</h3>
            <p className="mt-1 text-xs text-fog sm:text-sm">
              Five concrete operational domains backed by shipping applications and production systems.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {skills.capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.id}
                cap={cap}
                className={`reveal ${SPANS[i]} ${i === 4 ? 'md:col-span-2 lg:col-span-4' : ''}`}
                style={{ '--d': `${(i % 3) * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
