'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Terminal } from 'lucide-react';

import { profile, projects, skills } from '@/data/portfolio';

const commandMap: Record<string, string> = {
  help: 'commands: help, projects, stack, contact, clear',
  projects: projects.map((project) => project.title).join(' | '),
  stack: skills.map((category) => `${category.category}: ${category.tools.map((tool) => tool.name).join(', ')}`).join(' | '),
  contact: `${profile.email} | ${profile.location}`,
};

export function TerminalPanel() {
  const intro = useMemo(
    () => [
      'raj@portfolio:~$ boot --profile',
      'status: available for select product, AI, and full-stack work',
      'type "help" to inspect the system',
    ],
    [],
  );
  const [lines, setLines] = useState<string[]>(intro);
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') {
      setLines(intro);
      setValue('');
      return;
    }

    setLines((current) => [
      ...current,
      `raj@portfolio:~$ ${command}`,
      commandMap[command] ?? `command not found: ${command}`,
    ]);
    setValue('');
  };

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-ink-950 shadow-premium">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <Terminal className="h-4 w-4 text-cyan-brand" />
        <span className="font-mono text-xs text-mist">interactive-terminal</span>
      </div>
      <div className="h-80 overflow-y-auto p-4 font-mono text-sm leading-7 text-mist">
        {lines.map((line, index) => (
          <div key={`${line}-${index}`} className={line.startsWith('raj@') ? 'text-cyan-brand' : ''}>
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
          <span className="text-cyan-brand">$</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-pearl outline-none placeholder:text-mist"
            placeholder="help"
            aria-label="Terminal command"
          />
        </form>
      </div>
    </div>
  );
}
