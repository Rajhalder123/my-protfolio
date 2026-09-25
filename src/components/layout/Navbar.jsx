import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile, resumeUrl, RESUME_FILENAME } from '../../lib/content';
import { useActiveSection } from '../../lib/hooks';
import { useUI } from '../../lib/ui';
import Icon from '../ui/Icon';
import SmartLink from '../ui/SmartLink';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
const IDS = LINKS.map((l) => l.id);

export function Monogram({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid h-8 w-8 place-items-center rounded-lg border border-rule-strong bg-graphite font-wide text-[0.7rem] font-bold tracking-tight text-paper ${className}`}
    >
      RH
      <span className="absolute bottom-[5px] left-1/2 h-[2px] w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-signal to-ion" />
    </span>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome ? IDS : []);
  const { open: openOverlay } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen || !onHome;

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-rule bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => onHome && window.scrollTo({ top: 0 })}
          className="flex items-center gap-2.5 rounded-lg"
          aria-label={`${profile.name}, home`}
        >
          <Monogram />
          <span className="whitespace-nowrap font-wide text-sm font-semibold tracking-tight text-paper">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <SmartLink
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-paper' : 'text-fog hover:text-paper'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-[1px] h-px bg-signal transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </SmartLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openOverlay('recruiter')}
            className="btn btn-secondary btn-sm hidden sm:inline-flex"
          >
            <Icon name="idCard" />
            Recruiter view
          </button>
          <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-primary btn-sm hidden sm:inline-flex">
            <Icon name="download" className="nudge-down h-4 w-4" />
            Resume
          </a>
          <button
            type="button"
            className="btn btn-ghost btn-sm !px-2.5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-rule bg-ink lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {LINKS.map((link) => (
              <li key={link.id}>
                <SmartLink
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[48px] items-center border-b border-rule text-lg text-paper"
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="container-page grid grid-cols-2 gap-2 pb-5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openOverlay('recruiter');
              }}
              className="btn btn-secondary"
            >
              <Icon name="idCard" />
              Recruiter view
            </button>
            <a href={resumeUrl} download={RESUME_FILENAME} className="btn btn-primary">
              <Icon name="download" />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
