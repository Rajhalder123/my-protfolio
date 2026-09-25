import { useRef, useState } from 'react';
import {
  caseStudyPath,
  currentJob,
  featuredProjects,
  mailto,
  profile,
  resumeUrl,
  RESUME_FILENAME,
  skills,
} from '../lib/content';
import { useDialog } from '../lib/hooks';
import Icon from '../components/ui/Icon';
import SmartLink from '../components/ui/SmartLink';
import { Chips } from '../components/ui/primitives';

const area = (id) => currentJob.areas.find((a) => a.id === id);

function Block({ title, children }) {
  return (
    <section className="border-t border-rule px-5 py-5 sm:px-6">
      <h3 className="label">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function RecruiterMode({ onClose }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  useDialog(ref, true, onClose);

  const e = profile.education;
  const highlights = [
    area('crm').points[0],
    area('trading').points[0],
    area('debugging').points[0],
    area('ownership').points[0],
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${profile.links.site}/?view=recruiter`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-title"
        className="sheet-enter fixed inset-y-0 right-0 z-[80] flex w-full max-w-[28rem] flex-col border-l border-rule bg-graphite shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
          <div>
            <p className="eyebrow">Recruiter view</p>
            <h2 id="recruiter-title" className="h-card mt-3 text-2xl">
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-fog">
              {profile.role} · {profile.locationShort}
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm !px-2.5" data-autofocus>
            <Icon name="close" className="h-5 w-5" />
            <span className="sr-only">Close recruiter view</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-2 gap-2 px-5 pb-5 sm:px-6">
            <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-primary col-span-2">
              <Icon name="download" />
              Download resume
            </a>
            <a href={mailto} className="btn btn-secondary">
              <Icon name="mail" />
              Email
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Icon name="linkedin" />
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <Block title="Availability">
            <p className="flex items-center gap-2 text-sm font-medium text-paper">
              <span className="h-2 w-2 rounded-full bg-go" aria-hidden="true" />
              {profile.availability.summary}
            </p>
            <dl className="mt-3 grid grid-cols-[7rem_1fr] gap-y-2 text-sm">
              <dt className="text-dim">Roles</dt>
              <dd className="text-fog">{profile.availability.roles.join(', ')}</dd>
              <dt className="text-dim">Notice period</dt>
              <dd className="text-fog">{profile.availability.noticePeriod}</dd>
              <dt className="text-dim">Location</dt>
              <dd className="text-fog">{profile.location}</dd>
              <dt className="text-dim">Work mode</dt>
              <dd className="text-fog">Open to {profile.workPreference}</dd>
            </dl>
          </Block>

          <Block title="Current role">
            <p className="text-sm font-medium text-paper">
              {currentJob.role}, {currentJob.company}
            </p>
            <p className="text-sm text-fog">
              {currentJob.domain} · {currentJob.period}
            </p>
            <ul className="mt-3 space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-fog">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {h}
                </li>
              ))}
            </ul>
            <SmartLink href="#experience" onClick={onClose} className="text-link mt-3">
              Full experience
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </SmartLink>
          </Block>

          <Block title="Core stack">
            <Chips items={skills.core} />
          </Block>

          <Block title="Featured projects">
            <ul className="space-y-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <SmartLink
                    href={caseStudyPath(p.slug)}
                    onClick={onClose}
                    className="group flex items-start justify-between gap-3 rounded-lg border border-rule bg-ink/50 p-3 hover:border-rule-strong"
                  >
                    <span>
                      <span className="block text-sm font-medium text-paper group-hover:text-signal">{p.title}</span>
                      <span className="block text-sm text-fog">{p.tagline}</span>
                    </span>
                    <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-fog" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Education">
            <p className="text-sm font-medium text-paper">
              {e.degree}, {e.year}
            </p>
            <p className="text-sm text-fog">
              {e.school} · CGPA {e.cgpa}
            </p>
          </Block>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-rule px-5 py-3 sm:px-6">
          <span className="text-xs text-dim">Link straight to this view</span>
          <button type="button" onClick={copyLink} className="btn btn-ghost btn-sm" aria-live="polite">
            <Icon name={copied ? 'check' : 'copy'} />
            {copied ? 'Link copied' : 'Copy link'}
          </button>
        </footer>
      </div>
    </>
  );
}
