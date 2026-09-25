import { profile, resumeUrl, RESUME_FILENAME, mailto } from '../../lib/content';
import { useUI } from '../../lib/ui';
import Icon from '../ui/Icon';
import { Monogram } from './Navbar';

export default function Footer() {
  const { open } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-rule">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Monogram />
            <span className="font-wide text-sm font-semibold text-paper">{profile.name}</span>
          </div>
          <p className="mt-4 text-sm text-fog">
            {profile.role} · {profile.locationShort}
          </p>
          <p className="mt-1 text-sm text-dim">Designed and built by {profile.name}.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="label">Contact</span>
            <a className="text-fog hover:text-paper" href={mailto}>
              Email
            </a>
            <a className="text-fog hover:text-paper" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="text-fog hover:text-paper" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">Quick</span>
            <a className="text-fog hover:text-paper" href={resumeUrl} download={RESUME_FILENAME}>
              Resume (PDF)
            </a>
            <button type="button" className="text-left text-fog hover:text-paper" onClick={() => open('recruiter')}>
              Recruiter view
            </button>
            <button type="button" className="text-left text-fog hover:text-paper" onClick={() => open('ask')}>
              Ask about Raj
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <span className="label">Extras</span>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-left text-fog hover:text-paper"
              onClick={() => open('terminal')}
            >
              Terminal
              <kbd className="rounded border border-rule-strong px-1.5 font-mono text-[0.7rem] text-dim">`</kbd>
            </button>
            <a className="inline-flex items-center gap-1.5 text-fog hover:text-paper" href="#top">
              Back to top
              <Icon name="arrowUp" className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>
      </div>
      <div className="border-t border-rule">
        <p className="container-page py-5 text-xs text-dim" suppressHydrationWarning>
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
