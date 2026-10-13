import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Pre-calculated chaotic displacement vectors for the "shattered / broken" state
const SCATTER_CONFIG = [
  // R
  { rx: '-28px', ry: '-38px', rot: '-16deg', scale: 0.85 },
  // A
  { rx: '14px', ry: '-52px', rot: '14deg', scale: 1.2 },
  // J
  { rx: '36px', ry: '24px', rot: '26deg', scale: 0.8 },
  // H
  { rx: '-32px', ry: '38px', rot: '-20deg', scale: 0.88 },
  // A
  { rx: '16px', ry: '-42px', rot: '12deg', scale: 1.15 },
  // L
  { rx: '-18px', ry: '-26px', rot: '-12deg', scale: 0.92 },
  // D
  { rx: '30px', ry: '34px', rot: '22deg', scale: 1.18 },
  // E
  { rx: '-14px', ry: '-48px', rot: '-10deg', scale: 0.86 },
  // R
  { rx: '34px', ry: '-20px', rot: '18deg', scale: 1.1 },
];

const WORDS = [
  { word: 'RAJ', startIdx: 0 },
  { word: 'HALDER', startIdx: 3 },
];

export default function KineticName({ name = 'RAJ HALDER', className = '' }) {
  // 'broken' -> 'building' -> 'built'
  const [stage, setStage] = useState('broken');
  const [hintVisible, setHintVisible] = useState(true);
  const timerRef = useRef(null);

  // Initial cinematic entrance: starts broken, then rapidly snaps together
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage('built');
    }, 280);

    return () => clearTimeout(t1);
  }, []);

  // Trigger the break and rebuild sequence on click
  const triggerRebuild = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHintVisible(false);

    // Shatter outward
    setStage('broken');

    // Snap & spring back into place
    timerRef.current = setTimeout(() => {
      setStage('built');
    }, 360);
  }, []);

  return (
    <div className="relative inline-block select-none">
      {/* Accessible Screen Reader label */}
      <span className="sr-only">{name}</span>

      {/* Interactive Kinetic Name display */}
      <span
        aria-hidden="true"
        onClick={triggerRebuild}
        title="Click to break & rebuild!"
        className={`kinetic-name group relative inline-flex flex-wrap items-baseline gap-x-[0.3em] font-wide font-bold uppercase leading-[0.9] tracking-[-0.02em] cursor-pointer ${
          stage === 'built' ? 'is-built' : 'is-broken'
        } ${className}`}
      >
        {WORDS.map((w, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {w.word.split('').map((char, cIdx) => {
              const charIdx = w.startIdx + cIdx;
              const cfg = SCATTER_CONFIG[charIdx] || { rx: '0px', ry: '-20px', rot: '0deg', scale: 1 };

              return (
                <span
                  key={cIdx}
                  className="kinetic-char inline-block"
                  style={{
                    '--i': charIdx,
                    '--rx': cfg.rx,
                    '--ry': cfg.ry,
                    '--rot': cfg.rot,
                    '--scale': cfg.scale,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </span>

      {/* Subtle stylish UX prompt indicating interactivity */}
      <div className="mt-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={triggerRebuild}
          className="group/badge inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-raised/70 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-fog transition-all duration-200 hover:border-signal/50 hover:bg-graphite hover:text-signal"
          aria-label="Replay break and rebuild animation"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span>Break & Build</span>
          <Icon
            name="sparkle"
            className="h-3 w-3 text-signal transition-transform duration-300 group-hover/badge:rotate-45"
          />
        </button>

        {hintVisible && (
          <span className="hidden font-mono text-[0.65rem] text-dim sm:inline animate-pulse">
            (click letters to scatter & assemble)
          </span>
        )}
      </div>
    </div>
  );
}
