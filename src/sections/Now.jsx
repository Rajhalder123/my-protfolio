import { useEffect, useRef, useState } from 'react';
import { now, profile } from '../lib/content';
import { githubSnapshot, loadGithubActivity, monthYear } from '../lib/github';
import { useInViewOnce } from '../lib/hooks';
import SmartLink from '../components/ui/SmartLink';
import Icon from '../components/ui/Icon';
import { SectionHeader, SpotlightCard } from '../components/ui/primitives';

const LANG_COLOURS = {
  TypeScript: '#3178C6',
  JavaScript: '#E5CB4F',
  Python: '#4B8BBE',
  CSS: '#8F6BD8',
  HTML: '#E1623A',
  Rust: '#D19A66',
};

function BuildingCard({ item, style }) {
  const body = (
    <>
      <div className="zoom-media relative h-40 overflow-hidden">
        <img
          src={item.image.src}
          width={item.image.w}
          height={item.image.h}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-75 saturate-[0.85]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-graphite/30 to-graphite" />
        <span className="absolute left-4 top-4 rounded-full border border-rule-strong bg-ink/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-fog">
          {item.tag}
        </span>
      </div>
      <div className="relative -mt-4 px-5 pb-5">
        <h3 className="h-card text-lg">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fog">{item.detail}</p>
        {item.href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper">
            Read more
            <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  );
  return (
    <SpotlightCard className="zoom-parent reveal group" style={style}>
      {item.href ? (
        <SmartLink href={item.href} className="block rounded-2xl">
          {body}
        </SmartLink>
      ) : (
        body
      )}
    </SpotlightCard>
  );
}

function GitHubActivity() {
  const ref = useRef(null);
  const visible = useInViewOnce(ref);
  const [data, setData] = useState(githubSnapshot);

  useEffect(() => {
    if (!visible) return undefined;
    const controller = new AbortController();
    loadGithubActivity(controller.signal)
      .then(setData)
      .catch(() => {
        /* keep the bundled snapshot */
      });
    return () => controller.abort();
  }, [visible]);

  return (
    <div ref={ref} className="reveal card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="h-card flex items-center gap-2.5 text-lg">
            <Icon name="github" className="h-5 w-5" />
            Recent activity on GitHub
          </h3>
          <p className="mt-1 text-sm text-fog">
            {data.publicRepos} public repositories · coding in public since {now.github.since}
          </p>
        </div>
        <span className="label">{data.live ? 'Live from GitHub' : 'Snapshot'}</span>
      </div>

      <ul className="mt-5 divide-y divide-rule border-y border-rule">
        {data.repos.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 py-3 transition-colors hover:bg-raised/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-2"
            >
              <span className="min-w-0">
                <span className="font-mono text-sm text-paper group-hover:text-signal">{repo.name}</span>
                {repo.description && <span className="block truncate text-sm text-fog">{repo.description}</span>}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              <span className="flex shrink-0 items-center gap-4 text-xs text-dim">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full"
                      style={{ background: LANG_COLOURS[repo.language] || '#7C8497' }}
                    />
                    {repo.language}
                  </span>
                )}
                <span>Updated {monthYear(repo.pushedAt)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-link mt-5">
        View GitHub profile
        <span className="sr-only"> (opens in a new tab)</span>
        <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

export default function Now() {
  return (
    <section id="now" aria-labelledby="now-title" className="section">
      <div className="container-page">
        <SectionHeader
          id="now-title"
          eyebrow="Now"
          title="Currently building"
          lede="What I'm working on at the moment, and the most recent activity on my public repositories."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
          {now.building.map((item, i) => (
            <BuildingCard key={item.id} item={item} style={{ '--d': `${i * 70}ms` }} />
          ))}
        </div>

        <div className="mt-5">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
