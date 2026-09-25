import { useCallback, useEffect, useRef } from 'react';
import { useInViewOnce } from '../../lib/hooks';

export function SectionHeader({ eyebrow, title, lede, id, children, className = '' }) {
  return (
    <header className={`reveal max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h-section mt-4">
        {title}
      </h2>
      {lede && <p className="lede mt-4 max-w-2xl">{lede}</p>}
      {children}
    </header>
  );
}

export function Status({ status, className = '' }) {
  if (!status) return null;
  return (
    <span className={`status status-${status.tone} ${className}`}>
      <span className="dot" aria-hidden="true" />
      {status.label}
    </span>
  );
}

export function Chips({ items, max, className = '' }) {
  const shown = max ? items.slice(0, max) : items;
  const hidden = items.length - shown.length;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
      {hidden > 0 && (
        <li className="chip border-dashed" aria-label={`and ${hidden} more`}>
          +{hidden}
        </li>
      )}
    </ul>
  );
}

export function TechIcon({ item, size = 20 }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-sm text-paper">
      {item.icon ? (
        <img
          src={`/icons/${item.icon}.svg`}
          width={size}
          height={size}
          alt=""
          loading="lazy"
          decoding="async"
          className={`shrink-0 ${item.invert ? 'logo-invert' : ''}`}
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid shrink-0 place-items-center rounded-md border border-rule-strong"
          style={{ width: size, height: size }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fog/70" />
        </span>
      )}
      <span>{item.name}</span>
    </span>
  );
}

/** Card with a soft cursor spotlight. Pointer position is written to CSS vars. */
export function SpotlightCard({ as: Tag = 'article', className = '', children, ...rest }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return (
    <Tag ref={ref} onPointerMove={onMove} className={`card spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function BrowserFrame({ image, url, priority = false, className = '', imgClassName = '' }) {
  return (
    <figure className={`frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
          <span className="h-2 w-2 rounded-full bg-rule-strong" />
        </span>
        {url && <span className="ml-2 truncate">{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>}
      </div>
      <div className="overflow-hidden">
        <img
          src={image.src}
          width={image.w}
          height={image.h}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchpriority: 'high' } : {})}
          className={`block h-auto w-full ${imgClassName}`}
        />
      </div>
      {image.caption && <figcaption className="border-t border-rule px-3 py-2 text-xs text-dim">{image.caption}</figcaption>}
    </figure>
  );
}

/**
 * Architecture schematic: columns of nodes joined by dashed links.
 * When it first scrolls into view, one request pulse travels left to right.
 */
export function Schematic({ architecture, className = '', label }) {
  const ref = useRef(null);
  const live = useInViewOnce(ref);
  const { columns, note } = architecture;
  return (
    <figure className={className}>
      <ol ref={ref} className={`schematic ${live ? 'is-live' : ''}`} aria-label={label || 'Architecture'}>
        {columns.map((col, i) => [
          i > 0 && (
            <li key={`link-${col.title}`} className="sch-link" aria-hidden="true" style={{ '--i': i - 1 }}>
              <span className="sch-pulse" />
            </li>
          ),
          <li key={col.title} className="sch-col" style={{ '--i': i }}>
            <span className="label">{col.title}</span>
            {col.nodes.map((n) => (
              <div key={n.title} className="sch-node">
                <div className="sch-node-title">{n.title}</div>
                {n.detail && <div className="sch-node-detail">{n.detail}</div>}
              </div>
            ))}
          </li>,
        ])}
      </ol>
      {note && <figcaption className="mt-3 text-xs text-dim">{note}</figcaption>}
    </figure>
  );
}

/** Nudges its child toward the cursor. Mouse pointers only; off for reduced motion. */
export function Magnetic({ children, strength = 0.18 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${Math.max(-6, Math.min(6, x))}px, ${Math.max(-5, Math.min(5, y))}px, 0)`;
    };
    const leave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="inline-flex transition-transform duration-200 ease-out">
      {children}
    </span>
  );
}
