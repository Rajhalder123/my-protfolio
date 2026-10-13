import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const UIContext = createContext(null);
const THEME_STORAGE_KEY = 'portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* localStorage unavailable */
  }
  return 'light';
}

function applyThemeToDOM(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#07090D' : '#F8FAFC');
  }
}

/** Manages overlay dialogs and global theme state. */
export function UIProvider({ children }) {
  // Starts closed on both server and client so prerendered HTML hydrates cleanly.
  const [overlay, setOverlay] = useState(null);
  const [theme, setThemeState] = useState(getInitialTheme);
  const urlSynced = useRef(false);

  // Overlay changes are transitions so React finishes hydrating the page first
  const set = useCallback((next) => startTransition(() => setOverlay(next)), []);
  const open = useCallback((name) => set(name), [set]);
  const close = useCallback(() => set(null), [set]);
  const toggle = useCallback((name) => set((cur) => (cur === name ? null : name)), [set]);

  const setTheme = useCallback((next) => {
    setThemeState((cur) => {
      const resolved = typeof next === 'function' ? next(cur) : next;
      const val = resolved === 'dark' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, val);
      } catch {
        /* ignore */
      }
      return val;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((cur) => {
      const val = cur === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, val);
      } catch {
        /* ignore */
      }
      return val;
    });
  }, []);

  // Synchronize DOM with current theme
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

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

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      overlay,
      open,
      close,
      toggle,
    }),
    [theme, setTheme, toggleTheme, overlay, open, close, toggle]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
export const useTheme = () => {
  const ctx = useContext(UIContext);
  return { theme: ctx?.theme || 'light', setTheme: ctx?.setTheme, toggleTheme: ctx?.toggleTheme };
};
