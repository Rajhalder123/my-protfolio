import { useEffect, useRef, useState } from 'react';
import { ask, SUGGESTED_QUESTIONS } from '../lib/askRaj';
import { askAI, toLines } from '../lib/askClient';
import Icon from '../components/ui/Icon';
import SmartLink from '../components/ui/SmartLink';

function AnswerText({ lines }) {
  const blocks = [];
  lines.forEach((line) => {
    const bullet = line.match(/^[-•]\s+(.*)$/);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last && last.type === 'ul') last.items.push(bullet[1]);
      else blocks.push({ type: 'ul', items: [bullet[1]] });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  });
  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-fog">
      {blocks.map((b, i) =>
        b.type === 'ul' ? (
          <ul key={i} className="space-y-1">
            {b.items.map((it) => (
              <li key={it} className="flex gap-2">
                <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.text}</p>
        )
      )}
    </div>
  );
}

export default function AskRaj({ onClose }) {
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const previous = document.activeElement;
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previous && previous.focus) previous.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  const submit = async (question) => {
    const q = question.trim();
    if (!q || busy) return;
    const local = ask(q);
    if (!local) return;

    const history = messages
      .filter((m) => !m.pending)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.role === 'user' ? m.text : m.lines.join('\n') }));

    setValue('');
    setBusy(true);
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'answer', pending: true, lines: [], links: [] }]);

    let answer;
    try {
      const text = await askAI(q, history);
      answer = { lines: toLines(text), links: local.links, source: 'ai' };
    } catch {
      answer = { lines: local.text, links: local.links, source: 'local' };
    }
    setMessages((m) => [...m.slice(0, -1), { role: 'answer', ...answer }]);
    setBusy(false);
    inputRef.current?.focus();
  };

  return (
    <div
      id="ask-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="ask-title"
      className="pop-enter fixed inset-x-3 bottom-20 z-[65] flex max-h-[min(34rem,calc(100vh-7rem))] flex-col overflow-hidden rounded-2xl border border-rule-strong bg-graphite shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[24rem]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-rule px-4 py-3">
        <div>
          <h2 id="ask-title" className="flex items-center gap-2 text-sm font-medium text-paper">
            <Icon name="sparkle" className="h-4 w-4 text-signal" />
            Ask about Raj
          </h2>
          <p className="mt-0.5 text-xs text-dim">Answers use only this site's portfolio data.</p>
        </div>
        <button type="button" onClick={onClose} className="rounded p-1 text-fog hover:text-paper">
          <Icon name="close" />
          <span className="sr-only">Close</span>
        </button>
      </header>

      <div ref={logRef} role="log" aria-live="polite" aria-busy={busy} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div>
            <p className="text-sm text-fog">
              Ask about experience, projects, skills, availability or education. Try one of these:
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => submit(q)}
                    className="w-full rounded-lg border border-rule bg-ink/60 px-3 py-2 text-left text-sm text-paper hover:border-rule-strong"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <p key={i} className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-raised px-3 py-2 text-sm text-paper">
                {m.text}
              </p>
            );
          }
          if (m.pending) {
            return (
              <div key={i} className="w-fit rounded-xl rounded-bl-sm border border-rule bg-ink/60 px-3 py-3">
                <span className="sr-only">Writing an answer…</span>
                <span aria-hidden="true" className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-fog motion-safe:animate-pulse"
                      style={{ animationDelay: `${d * 160}ms` }}
                    />
                  ))}
                </span>
              </div>
            );
          }
          return (
            <div key={i} className="max-w-[95%] rounded-xl rounded-bl-sm border border-rule bg-ink/60 px-3 py-2.5">
              <AnswerText lines={m.lines} />
              {m.links?.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-rule pt-2.5">
                  {m.links.map((l) => (
                    <SmartLink
                      key={l.href + l.label}
                      href={l.href}
                      download={l.href.endsWith('.pdf') ? 'Raj_Halder_Resume.pdf' : undefined}
                      onClick={() => (l.href.startsWith('#') || l.href.startsWith('/work') ? onClose() : undefined)}
                      className="inline-flex items-center gap-1 rounded-md border border-rule-strong px-2 py-1 text-xs text-paper hover:border-signal/60"
                    >
                      {l.label}
                      <Icon name="arrowRight" className="h-3 w-3" />
                    </SmartLink>
                  ))}
                </div>
              )}
              {m.source === 'ai' && (
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-dim">AI answer · check linked sections</p>
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="flex items-center gap-2 border-t border-rule p-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <input
          id="ask-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. What backend work has Raj done?"
          autoComplete="off"
          maxLength={500}
          className="min-w-0 flex-1 rounded-lg border border-rule-strong bg-ink px-3 py-2.5 text-sm text-paper placeholder:text-dim focus:border-signal focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-signal/25"
        />
        <button type="submit" className="btn btn-primary btn-sm !px-3" disabled={!value.trim() || busy}>
          <Icon name="send" />
          <span className="sr-only">Ask</span>
        </button>
      </form>
    </div>
  );
}
