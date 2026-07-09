import { Code2, Globe2, Mail } from 'lucide-react';

import { profile } from '@/data/portfolio';

const links = [
  { label: 'GitHub', href: profile.github, icon: Code2 },
  { label: 'LinkedIn', href: profile.linkedin, icon: Globe2 },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/80 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-pearl">RAJ HALDAR</p>
          <p className="mt-2 text-sm text-mist">(c) 2026. Built with Next.js, TypeScript, Three.js, and motion.</p>
        </div>
        <div className="flex gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                aria-label={link.label}
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.045] text-mist transition hover:border-cyan-brand/40 hover:text-pearl"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
