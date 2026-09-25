import { useEffect, useState } from 'react';
import { profile } from './content';

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades `.reveal` elements in as they enter the viewport.
 * Content is visible by default. The observer's first callback hides only the
 * elements that are still off-screen, so nothing on screen ever blinks and no
 * layout is forced on load.
 */
export function useReveal(key) {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.remove('reveal-wait');
            io.unobserve(el);
          } else {
            el.classList.add('reveal-wait');
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const idsKey = ids.join(',');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const sections = idsKey
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [idsKey]);

  return active;
}

/** Runs once when the element first scrolls into view. */
export function useInViewOnce(ref, options) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, options || { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, options]);
  return seen;
}

const DEFAULT_TITLE = `${profile.name} — Full Stack Engineer | AI & Production Systems`;

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Keeps the document title, description and canonical URL in sync with the route. */
export function usePageMeta({ title, description, path = '/' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${profile.name}` : DEFAULT_TITLE;
    const url = `${profile.links.site}${path}`;
    document.title = fullTitle;
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, path]);
}

/** Traps focus inside a modal while it is open and restores it on close. */
export function useDialog(ref, open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const node = ref.current;
    const previous = document.activeElement;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select, [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(node.querySelectorAll(selector));

    const first = node.querySelector('[data-autofocus]') || focusables()[0];
    if (first) first.focus();

    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous && previous.focus) previous.focus();
    };
  }, [ref, open, onClose]);
}
