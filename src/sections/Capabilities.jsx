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
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-graphite/10 via-graphite/40 to-graphite" />
      </div>
      <div className="relative -mt-6 flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <h3 className="h-card">{cap.title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-fog">{cap.body}</p>
        <Chips items={cap.stack} className="mt-4" />
        <div className="mt-auto pt-5">
          <p className="label">Where I've done it</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {cap.proof.map((p) => (
              <li key={p.label}>
                <SmartLink href={p.href} className="text-link">
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
          eyebrow="Capabilities & stack"
          title="What I build, and where I've built it"
          lede="Five areas of work, each linked to the role or project that backs it up."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {skills.capabilities.map((cap, i) => (
            <CapabilityCard
              key={cap.id}
              cap={cap}
              className={`reveal ${SPANS[i]} ${i === 4 ? 'md:col-span-2 lg:col-span-4' : ''}`}
              style={{ '--d': `${(i % 3) * 60}ms` }}
            />
          ))}
        </div>

        <div className="reveal mt-16">
          <h3 className="h-card text-xl sm:text-2xl">Toolbox</h3>
          <p className="mt-1 text-sm text-fog">Tools I use, grouped by layer. Evidence for each is in the work above.</p>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule lg:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {skills.toolbox.map((group) => (
              <div key={group.id} className="bg-graphite p-4 sm:p-5">
                <h4 className="label">{group.label}</h4>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <TechIcon item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="card p-5">
              <h4 className="label">Also used at work</h4>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {skills.alsoAtWork.map((item) => (
                  <li key={item.name}>
                    <TechIcon item={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h4 className="label">Learning now</h4>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {skills.learning.map((item) => (
                  <li key={item.name}>
                    <TechIcon item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
