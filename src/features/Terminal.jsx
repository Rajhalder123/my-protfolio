import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  caseStudyPath,
  currentJob,
  getProject,
  mailto,
  profile,
  projects,
  resumeUrl,
  skills,
} from '../lib/content';
import { useDialog } from '../lib/hooks';
import { ask } from '../lib/askRaj';
import { askAI } from '../lib/askClient';
import { useUI } from '../lib/ui';
import Icon from '../components/ui/Icon';

const PROMPT = 'raj@portfolio:~$';

const HELP = [
  ['about', 'who Raj is'],
  ['experience', 'current role and scope'],
  ['projects', 'list projects'],
  ['project <name>', 'details, e.g. project devpilot-ai'],
  ['ask <question>', 'ask the AI about Raj'],
  ['webterminal', 'open the RTX 5 Web Terminal'],
  ['skills', 'tools by layer'],
  ['education', 'degree and training'],
  ['contact', 'email and links'],
  ['resume', 'download the resume'],
  ['github', 'open the GitHub profile'],
  ['recruiter', 'open recruiter view'],
  ['clear', 'clear the screen'],
  ['exit', 'close the terminal'],
];

function run(input, ctx) {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  switch ((cmd || '').toLowerCase()) {
    case 'help':
      return HELP.map(([c, d]) => `  ${c.padEnd(16)} ${d}`).join('\n');
    case 'about':
    case 'whoami':
      return [
        `${profile.name} · ${profile.role}`,
        profile.headline,
        `${profile.locationShort} · ${profile.availability.summary.toLowerCase()}`,
      ].join('\n');
    case 'experience':
      return [
        `${currentJob.role} · ${currentJob.company} (${currentJob.domain}) · ${currentJob.period}`,
        '',
        ...currentJob.areas.map((a) => `  ▸ ${a.title}`),
        '',
        currentJob.growth,
      ].join('\n');
    case 'projects':
    case 'ls':
      return [
        ...projects.map((p) => `  ${p.slug.padEnd(26)} ${p.tagline}`),
        '',
        'Type "project <name>" for details.',
      ].join('\n');
    case 'project': {
      const p = getProject(arg) || projects.find((x) => x.title.toLowerCase().includes(arg) && arg);
      if (!p) return { error: `No project "${arg}". Type "projects" to list them.` };
      const lines = [p.title, p.tagline, '', `Problem:  ${p.problem}`, `Built:    ${p.built}`, `Stack:    ${p.stack.join(', ')}`];
      if (p.links.demo) lines.push(`Live:     ${p.links.demo}`);
      if (p.links.source) lines.push(`Source:   ${p.links.source}`);
      if (p.caseStudy) lines.push(`Case study: ${profile.links.site}${caseStudyPath(p.slug)}`);
      if (p.confidential) lines.push('', p.confidentialNote);
      return lines.join('\n');
    }
    case 'skills':
    case 'stack':
      return [
        ...skills.toolbox.map((g) => `  ${g.label.padEnd(11)} ${g.items.map((i) => i.name).join(', ')}`),
        `  ${'At work'.padEnd(11)} ${skills.alsoAtWork.map((i) => i.name).join(', ')}`,
        `  ${'Learning'.padEnd(11)} ${skills.learning.map((i) => i.name).join(', ')}`,
      ].join('\n');
    case 'education': {
      const e = profile.education;
      return [`${e.degree} · ${e.school} · ${e.year} · CGPA ${e.cgpa}`, ...profile.training.map((t) => `Training: ${t.name} (${t.provider})`)].join('\n');
    }
    case 'contact':
      return [`email     ${profile.email}`, `linkedin  ${profile.links.linkedin}`, `github    ${profile.links.github}`].join('\n');
    case 'resume':
      ctx.download();
      return 'Downloading resume…';
    case 'github':
      window.open(profile.links.github, '_blank', 'noopener');
      return `Opening ${profile.links.github}`;
    case 'webterminal':
    case 'rtx': {
      const url = getProject('fintech-trading-systems').showcase.url;
      window.open(url, '_blank', 'noopener');
      return `Opening ${url}`;
    }
    case 'email':
      window.location.href = mailto;
      return `Opening your mail app for ${profile.email}`;
    case 'recruiter':
      ctx.open('recruiter');
      return 'Opening recruiter view…';
    case 'cd':
      if (arg && getProject(arg)?.caseStudy) {
        ctx.navigate(caseStudyPath(arg));
        ctx.close();
        return '';
      }
      return { error: 'Try: cd devpilot-ai' };
    case 'sudo':
      return { error: 'Nice try.' };
    case '':
      return '';
    default:
      return { error: `command not found: ${cmd}. Type "help".` };
  }
}

export default function Terminal({ onClose }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { open } = useUI();
  const [lines, setLines] = useState([{ kind: 'sys', text: `Welcome. Type "help" to list commands.` }]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);

  useDialog(ref, true, onClose);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const download = () => {
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Raj_Halder_Resume.pdf';
    a.click();
  };

  const submit = (e) => {
    e.preventDefault();
    const input = value;
    setValue('');
    setCursor(-1);
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 30));
    if (['clear', 'cls'].includes(input.trim().toLowerCase())) {
      setLines([]);
      return;
    }
    if (['exit', 'quit'].includes(input.trim().toLowerCase())) {
      onClose();
      return;
    }
    const askMatch = input.trim().match(/^ask\s+(.+)/i);
    if (askMatch) {
      const question = askMatch[1];
      setLines((prev) => [...prev, { kind: 'in', text: input }, { kind: 'sys', text: 'thinking…', pending: true }]);
      askAI(question)
        .catch(() => {
          const local = ask(question);
          return local ? local.text.join('\n') : 'Ask a longer question.';
        })
        .then((answer) => setLines((prev) => [...prev.filter((l) => !l.pending), { kind: 'out', text: answer }]));
      return;
    }
    const out = run(input, { navigate, open, close: onClose, download });
    setLines((prev) => [
      ...prev,
      { kind: 'in', text: input },
      ...(out === '' ? [] : [typeof out === 'string' ? { kind: 'out', text: out } : { kind: 'err', text: out.error }]),
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : '');
    }
  };

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
        className="pop-enter fixed inset-x-3 bottom-3 z-[80] mx-auto flex h-[min(30rem,80vh)] max-w-2xl flex-col overflow-hidden rounded-xl border border-rule-strong bg-[#05070A] shadow-2xl sm:bottom-10"
      >
        <div className="flex items-center justify-between border-b border-rule bg-graphite px-4 py-2.5">
          <h2 id="terminal-title" className="flex items-center gap-2 font-mono text-xs text-fog">
            <Icon name="terminal" className="h-4 w-4" />
            terminal · raj@portfolio
          </h2>
          <button type="button" onClick={onClose} className="rounded p-1 text-fog hover:text-paper">
            <Icon name="close" />
            <span className="sr-only">Close terminal</span>
          </button>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap break-words font-mono ${
                l.kind === 'in' ? 'mt-2 text-paper' : l.kind === 'err' ? 'text-[#F28B82]' : l.kind === 'sys' ? 'text-dim' : 'text-fog'
              }`}
            >
              {l.kind === 'in' ? (
                <>
                  <span className="text-signal">{PROMPT}</span> {l.text}
                </>
              ) : (
                l.text
              )}
            </pre>
          ))}
        </div>

        <form onSubmit={submit} className="flex items-center gap-2 border-t border-rule px-4 py-3 transition-colors focus-within:bg-raised/60">
          <label htmlFor="terminal-input" className="shrink-0 font-mono text-[0.8rem] text-signal">
            {PROMPT}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            data-autofocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="min-w-0 flex-1 bg-transparent font-mono text-[0.8rem] text-paper caret-signal outline-none focus-visible:outline-none"
            aria-describedby="terminal-hint"
          />
          <span id="terminal-hint" className="sr-only">
            Type help and press Enter to list commands.
          </span>
        </form>
      </div>
    </>
  );
}
