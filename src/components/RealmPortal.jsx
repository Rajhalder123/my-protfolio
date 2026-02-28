import React, { useEffect, useRef, useState } from 'react';

const REALMS = {
    projects: { label: 'MISSION LOGS', color: '#7c3aed', glow: 'rgba(124,58,237,', emoji: '🚀' },
    skills: { label: 'TECH ARSENAL', color: '#10ffa0', glow: 'rgba(16,255,160,', emoji: '⚙️' },
    experience: { label: "CAPTAIN'S LOG", color: '#00d4ff', glow: 'rgba(0,212,255,', emoji: '📖' },
    contact: { label: 'HQ COMMS', color: '#ffd700', glow: 'rgba(255,215,0,', emoji: '📡' },
};

/* 
 * PortalInner is always rendered (no conditional return above hooks),
 * so useEffect is always called in the same order — Rules of Hooks satisfied.
 */
const PortalInner = ({ d }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease',
            }}
        >
            <div style={{
                position: 'absolute',
                left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
                height: '120px',
                background: 'radial-gradient(ellipse 80% 100% at 50% 50%, ' + d.glow + '0.12) 0%, transparent 100%)',
                filter: 'blur(20px)',
            }} />

            <div style={{
                position: 'absolute',
                left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
                height: '1px',
                background: 'linear-gradient(to right, transparent 0%, ' + d.glow + '0.3) 10%, ' + d.glow + '1) 45%, ' + d.color + ' 50%, ' + d.glow + '1) 55%, ' + d.glow + '0.3) 90%, transparent 100%)',
                boxShadow: '0 0 20px ' + d.color + ', 0 0 60px ' + d.glow + '0.3)',
                animation: 'pulse-glow 3s ease-in-out infinite',
            }} />

            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(2,4,8,0.92)',
                border: '1px solid ' + d.glow + '0.5)',
                borderRadius: '12px',
                padding: '10px 28px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px ' + d.glow + '0.2), inset 0 0 20px ' + d.glow + '0.05)',
                transform: visible ? 'scale(1)' : 'scale(0.8)',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}>
                <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: d.color,
                    boxShadow: '0 0 12px ' + d.color,
                    animation: 'pulse-glow 1.5s ease-in-out infinite',
                }} />
                <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.35em',
                    color: d.color,
                    textTransform: 'uppercase',
                }}>
                    {'//'} ENTERING {d.label}
                </span>
                <span style={{ fontSize: '1rem' }}>{d.emoji}</span>
            </div>

            {[-1, 1].map(side => (
                <div key={side} style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: side === -1 ? '60px' : undefined,
                    right: side === 1 ? '60px' : undefined,
                    display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center',
                }}>
                    {[6, 4, 2].map((h, i) => (
                        <div key={i} style={{ width: '1px', height: h, background: d.glow + (0.6 - i * 0.15) + ')' }} />
                    ))}
                </div>
            ))}
        </div>
    );
};

/* Outer guard: no hooks, just a null check */
const RealmPortal = ({ realm }) => {
    const d = REALMS[realm];
    if (!d) return null;
    return <PortalInner d={d} />;
};

export default RealmPortal;
