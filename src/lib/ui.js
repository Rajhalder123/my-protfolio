import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);

/** Which overlay is open: 'recruiter' | 'terminal' | 'ask' | null. One at a time. */
export function UIProvider({ children }) {
  // Starts closed on both server and client so prerendered HTML hydrates cleanly.
  const [overlay, setOverlay] = useState(null);
  const urlSynced = useRef(false);

  // Overlay changes are transitions so React finishes hydrating the page first
  // (an urgent update to a still-hydrating boundary forces a client re-render).
  const set = useCallback((next) => startTransition(() => setOverlay(next)), []);
  const open = useCallback((name) => set(name), [set]);
  const close = useCallback(() => set(null), [set]);
  const toggle = useCallback((name) => set((cur) => (cur === name ? null : name)), [set]);

  // ?view=recruiter opens recruiter view directly (a link recruiters can be sent).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('view') === 'recruiter') set('recruiter');
  }, [set]);

  // Keep ?view=recruiter in the URL while recruiter view is open.
  useEffect(() => {
    if (!urlSynced.current) {
      urlSynced.current = true;
      return;
    }
    const url = new URL(window.location.href);
    const has = url.searchParams.get('view') === 'recruiter';
    if (overlay === 'recruiter' && !has) {
      url.searchParams.set('view', 'recruiter');
      window.history.replaceState(window.history.state, '', url);
    } else if (overlay !== 'recruiter' && has) {
      url.searchParams.delete('view');
      window.history.replaceState(window.history.state, '', url);
    }
  }, [overlay]);

  // Backtick opens the terminal, unless the user is typing.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      const typing =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (typing) return;
      e.preventDefault();
      toggle('terminal');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  const value = useMemo(() => ({ overlay, open, close, toggle }), [overlay, open, close, toggle]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
