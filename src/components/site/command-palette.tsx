'use client';

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { ArrowUpRight, Search, X } from 'lucide-react';

import { commands } from '@/data/portfolio';
import { Button } from '@/components/ui/button';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const runCommand = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.open(href, href.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Button
        type="button"
        variant="premium"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden gap-2 md:inline-flex"
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span className="text-xs text-mist">Ctrl K</span>
      </Button>

      {open ? (
        <div className="fixed inset-0 z-[80] bg-ink-950/70 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
          <Command className="premium-panel relative mx-auto mt-24 max-w-xl overflow-hidden">
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-cyan-brand" />
              <Command.Input
                autoFocus
                placeholder="Search actions"
                className="h-14 flex-1 bg-transparent text-sm text-pearl outline-none placeholder:text-mist"
              />
              <button
                type="button"
                className="rounded-md p-2 text-mist transition hover:bg-white/10 hover:text-pearl"
                aria-label="Close command palette"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="px-3 py-8 text-center text-sm text-mist">
                No action found.
              </Command.Empty>
              <Command.Group heading="Actions" className="text-xs text-mist [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                {commands.map((item) => (
                  <Command.Item
                    key={item.label}
                    value={item.label}
                    onSelect={() => runCommand(item.href)}
                    className="command-item flex cursor-pointer items-center justify-between rounded-md px-3 py-3 text-sm text-mist outline-none"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}
