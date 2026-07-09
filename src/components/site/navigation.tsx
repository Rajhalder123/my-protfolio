'use client';

import { useEffect, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { navItems, profile } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { CommandPalette } from './command-palette';

type NavigationProps = {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
};

export function Navigation({ theme, onThemeToggle }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', ...navItems.map((item) => item.href.replace('#', ''))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition duration-300',
        scrolled ? 'border-b border-white/10 bg-ink-950/70 shadow-premium backdrop-blur-2xl' : 'bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <a href="#home" className="group inline-flex items-center gap-3" aria-label="Raj Haldar home">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.07] text-sm font-black text-pearl shadow-hairline transition group-hover:border-cyan-brand/50">
            RH
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.24em] text-pearl sm:inline">
            RAJ HALDAR
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 shadow-hairline backdrop-blur-xl lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
                  active === id ? 'bg-white/10 text-pearl' : 'text-mist hover:bg-white/[0.06] hover:text-pearl',
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <Button type="button" variant="premium" size="icon" onClick={onThemeToggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
            <a href={`mailto:${profile.email}`}>Hire Raj</a>
          </Button>
          <Button
            type="button"
            variant="premium"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink-950/95 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <div className="container grid gap-2">
            <button
              type="button"
              className="mb-1 flex items-center gap-2 rounded-md border border-white/10 px-3 py-3 text-left text-sm text-mist"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
              }}
            >
              <Command className="h-4 w-4" />
              Command
            </button>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-mist transition hover:bg-white/10 hover:text-pearl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
