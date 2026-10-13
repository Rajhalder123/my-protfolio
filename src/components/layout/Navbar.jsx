import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile, resumeUrl, RESUME_FILENAME } from '../../lib/content';
import { useActiveSection } from '../../lib/hooks';
import { useUI } from '../../lib/ui';
import Icon from '../ui/Icon';
import SmartLink from '../ui/SmartLink';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
const IDS = LINKS.map((l) => l.id);

export function Monogram({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <img
        src="/images/portrait.webp"
        width="34"
        height="34"
        alt=""
        className="h-8 w-8 rounded-full object-cover ring-2 ring-rule-strong shadow-sm transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-graphite bg-go"
        aria-hidden="true"
      />
    </span>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome ? IDS : []);
  const { open: openOverlay, theme, toggleTheme } = useUI();
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
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-signal"
          aria-label={`${profile.name}, home`}
        >
          <Monogram />
          <span className="whitespace-nowrap font-wide text-sm font-semibold tracking-tight text-paper transition-colors group-hover:text-signal">{profile.name}</span>
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
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm !px-2.5 rounded-lg border border-rule text-paper hover:border-rule-strong hover:bg-raised"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon
              name={theme === 'dark' ? 'sun' : 'moon'}
              className="h-4 w-4 text-signal transition-transform duration-300 hover:rotate-45"
            />
            <span className="sr-only">Toggle theme</span>
          </button>

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
          <div className="container-page pb-3 pt-1">
            <div className="flex items-center justify-between rounded-xl border border-rule bg-raised/50 px-4 py-2.5">
              <span className="font-mono text-xs font-medium text-fog">Theme Appearance</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-lg border border-rule-strong bg-graphite px-3 py-1.5 font-mono text-xs font-medium text-paper shadow-sm"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-3.5 w-3.5 text-signal" />
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>
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
