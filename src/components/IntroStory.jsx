import React, { useState, useEffect, useCallback } from 'react';

const STORY_SLIDES = [
    {
        id: 0,
        label: 'PROLOGUE',
        title: 'In the vast\ndigital cosmos...',
        body: 'Every extraordinary product begins with a single spark of curiosity.',
        subtext: null,
        color: '#00d4ff',
        emoji: '🌌',
        bg: 'radial-gradient(ellipse at 40% 60%, rgba(0,212,255,0.12) 0%, transparent 70%)',
    },
    {
        id: 1,
        label: 'CHAPTER 01 — ORIGIN',
        title: 'Year 2023.\nA developer awakens.',
        body: 'His name was Raj Haldar. In a small room in West Bengal, with a laptop and an obsession — he decided to build something that mattered.',
        subtext: 'The journey begins.',
        color: '#7c3aed',
        emoji: '⚡',
        bg: 'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)',
    },
    {
        id: 2,
        label: 'CHAPTER 02 — THE CRAFT',
        title: 'He forged skills\nlike weapons.',
        body: 'React. Node.js. Python. Firebase. Docker. AI APIs. One by one, he mastered the tools that shape the modern web.',
        subtext: '15+ technologies. Countless late nights.',
        color: '#10ffa0',
        emoji: '⚙️',
        bg: 'radial-gradient(ellipse at 30% 70%, rgba(16,255,160,0.1) 0%, transparent 70%)',
    },
    {
        id: 3,
        label: 'CHAPTER 03 — THE MISSIONS',
        title: 'He launched\nproduct after product.',
        body: 'An AI that masks Aadhaar numbers. A real-time chat app. A luxury car showroom. An AI platform. Each one a mission completed.',
        subtext: '8 products shipped. Thousands of users reached.',
        color: '#ffd700',
        emoji: '🚀',
        bg: 'radial-gradient(ellipse at 70% 30%, rgba(255,215,0,0.08) 0%, transparent 70%)',
    },
    {
        id: 4,
        label: 'NOW',
        title: 'The odyssey\ncontinues.',
        body: 'The story is still being written. New missions await. New worlds to build. This is where you enter.',
        subtext: null,
        color: '#00d4ff',
        emoji: '🛸',
        bg: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
        isFinal: true,
    },
];

// Particle dots floating around
function Particles({ color }) {
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
    }));

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: color,
                        opacity: 0.4,
                        animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        boxShadow: `0 0 ${p.size * 3}px ${color}`,
                    }}
                />
            ))}
        </div>
    );
}

// Animated typewriter for the title
function TypewriterTitle({ text, color, onDone }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
                if (onDone) onDone();
            }
        }, 40);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#e8f4ff',
            whiteSpace: 'pre-line',
            marginBottom: '28px',
            letterSpacing: '-0.02em',
        }}>
            {displayed}
            <span style={{
                display: 'inline-block',
                width: 3,
                background: color,
                height: '1em',
                marginLeft: 4,
                verticalAlign: 'bottom',
                animation: done ? 'typing-cursor 1s step-end infinite' : 'none',
                boxShadow: `0 0 10px ${color}`,
            }} />
        </h2>
    );
}

const IntroStory = ({ onEnter }) => {
    const [current, setCurrent] = useState(0);
    const [bodyVisible, setBodyVisible] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [slideIn, setSlideIn] = useState(true);

    const slide = STORY_SLIDES[current];

    const goToNext = useCallback(() => {
        if (current >= STORY_SLIDES.length - 1) {
            // Final slide — enter portfolio
            setExiting(true);
            setTimeout(() => onEnter(), 800);
            return;
        }
        setSlideIn(false);
        setBodyVisible(false);
        setTimeout(() => {
            setCurrent(c => c + 1);
            setSlideIn(true);
        }, 400);
    }, [current, onEnter]);

    const skip = useCallback(() => {
        setExiting(true);
        setTimeout(() => onEnter(), 600);
    }, [onEnter]);

    // Auto-advance after 6 seconds per slide
    useEffect(() => {
        const timer = setTimeout(goToNext, 6500);
        return () => clearTimeout(timer);
    }, [current, goToNext]);

    const handleTitleDone = () => {
        setTimeout(() => setBodyVisible(true), 200);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#020408',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'opacity 0.8s ease',
            opacity: exiting ? 0 : 1,
        }}>
            {/* Animated radial bg */}
            <div style={{
                position: 'absolute', inset: 0,
                background: slide.bg,
                transition: 'background 1s ease',
            }} />

            {/* Floating particles */}
            <Particles color={slide.color} key={`particles-${current}`} />

            {/* Scanlines */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px)',
            }} />

            {/* Corner brackets */}
            {[
                { top: 20, left: 20, br: 'none', bl: '2px solid', bt: '2px solid', bb: 'none' },
                { top: 20, right: 20, bl: 'none', br: '2px solid', bt: '2px solid', bb: 'none' },
                { bottom: 20, left: 20, br: 'none', bl: '2px solid', bt: 'none', bb: '2px solid' },
                { bottom: 20, right: 20, bl: 'none', br: '2px solid', bt: 'none', bb: '2px solid' },
            ].map((corner, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    width: 40, height: 40,
                    borderColor: `${slide.color}66`,
                    borderStyle: 'solid',
                    borderTopWidth: corner.bt !== 'none' ? '2px' : '0',
                    borderBottomWidth: corner.bb !== 'none' ? '2px' : '0',
                    borderLeftWidth: corner.bl !== 'none' ? '2px' : '0',
                    borderRightWidth: corner.br !== 'none' ? '2px' : '0',
                    ...corner,
                    transition: 'border-color 1s ease',
                }} />
            ))}

            {/* Skip button */}
            <button
                onClick={skip}
                style={{
                    position: 'absolute', top: 24, right: 24,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#4a7a9b',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem', letterSpacing: '0.2em',
                    padding: '8px 16px', borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    zIndex: 10,
                }}
                onMouseEnter={e => { e.target.style.color = '#e8f4ff'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { e.target.style.color = '#4a7a9b'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
                SKIP INTRO ▶▶
            </button>

            {/* Progress dots */}
            <div style={{
                position: 'absolute', top: 30,
                left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: '8px',
            }}>
                {STORY_SLIDES.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            setBodyVisible(false);
                            setSlideIn(false);
                            setTimeout(() => { setCurrent(i); setSlideIn(true); }, 300);
                        }}
                        style={{
                            width: i === current ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: i === current ? slide.color : 'rgba(255,255,255,0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            boxShadow: i === current ? `0 0 10px ${slide.color}` : 'none',
                        }}
                    />
                ))}
            </div>

            {/* Main story content */}
            <div style={{
                maxWidth: '800px',
                width: '90%',
                textAlign: 'center',
                padding: '40px 20px',
                opacity: slideIn ? 1 : 0,
                transform: slideIn ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}>
                {/* Chapter label */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    marginBottom: '32px',
                    background: `${slide.color}15`,
                    border: `1px solid ${slide.color}44`,
                    borderRadius: '999px', padding: '6px 20px',
                    transition: 'all 1s ease',
                }}>
                    <span style={{ fontSize: '1rem' }}>{slide.emoji}</span>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.25em',
                        color: slide.color,
                    }}>
                        {slide.label}
                    </span>
                </div>

                {/* Title with typewriter */}
                <TypewriterTitle text={slide.title} color={slide.color} onDone={handleTitleDone} key={`title-${current}`} />

                {/* Body text */}
                <div style={{
                    opacity: bodyVisible ? 1 : 0,
                    transform: bodyVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}>
                    <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#7bb3d4',
                        lineHeight: 1.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontStyle: 'italic',
                    }}>
                        "{slide.body}"
                    </p>

                    {slide.subtext && (
                        <p style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.75rem',
                            color: slide.color,
                            letterSpacing: '0.15em',
                            marginTop: '20px',
                            opacity: 0.8,
                        }}>
                            — {slide.subtext}
                        </p>
                    )}

                    {/* CTA */}
                    <div style={{ marginTop: '48px' }}>
                        {slide.isFinal ? (
                            <button
                                onClick={goToNext}
                                style={{
                                    padding: '16px 48px',
                                    background: `linear-gradient(135deg, ${slide.color}, #7c3aed)`,
                                    border: 'none',
                                    borderRadius: '14px',
                                    color: 'white',
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.15em',
                                    cursor: 'pointer',
                                    boxShadow: `0 0 40px ${slide.color}44, 0 16px 40px rgba(0,0,0,0.5)`,
                                    transition: 'all 0.3s',
                                    animation: 'pulse-glow 2s ease-in-out infinite',
                                }}
                                onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; }}
                                onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                            >
                                ENTER THE PORTFOLIO →
                            </button>
                        ) : (
                            <button
                                onClick={goToNext}
                                style={{
                                    padding: '12px 36px',
                                    background: 'transparent',
                                    border: `1px solid ${slide.color}66`,
                                    borderRadius: '10px',
                                    color: slide.color,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = `${slide.color}15`;
                                    e.target.style.borderColor = slide.color;
                                    e.target.style.boxShadow = `0 0 20px ${slide.color}33`;
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.borderColor = `${slide.color}66`;
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                CONTINUE THE STORY ▶
                            </button>
                        )}
                    </div>

                    {/* Auto-progress bar */}
                    {!slide.isFinal && (
                        <div style={{ marginTop: '24px', opacity: 0.4 }}>
                            <div style={{
                                width: '120px', height: '2px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '1px', margin: '0 auto', overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '100%',
                                    background: slide.color,
                                    borderRadius: '1px',
                                    animation: 'auto-progress 6.5s linear',
                                    animationFillMode: 'forwards',
                                    transformOrigin: 'left',
                                }} />
                            </div>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#4a7a9b', marginTop: '6px', letterSpacing: '0.2em' }}>
                                AUTO-ADVANCING...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes auto-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
        </div>
    );
};

export default IntroStory;
