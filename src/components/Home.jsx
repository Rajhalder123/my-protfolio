import React, { useState, useEffect, useRef } from "react";
import HeroOrb from "./HeroOrb";
import resume from "../pdf/resume.pdf";
import { useScrollParallax } from "./useScrollParallax";

const TYPED_WORDS = [
  "Full-Stack Engineer",
  "AI Enthusiast",
  "Web Developer",
  "MERN Stack Dev",
  "Problem Solver",
];

function useTypingEffect(words, speed = 80, deleteSpeed = 40, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), deleteSpeed);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(w => w + 1);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, deleteSpeed, pause]);

  return displayed;
}

// Multi-layer parallax depth background component
function ParallaxDepthLayer({ speed, children, style }) {
  const ref = useScrollParallax(speed, 'up');
  return (
    <div ref={ref} style={{ position: 'absolute', ...style, willChange: 'transform' }}>
      {children}
    </div>
  );
}

const Home = () => {
  const typedText = useTypingEffect(TYPED_WORDS);
  const [visitorCount] = useState(1101);

  // Scroll parallax refs for different depth layers
  const textRef = useScrollParallax(0.25, 'up');   // text moves up slowly
  const orbRef = useScrollParallax(0.5, 'up');   // orb moves faster = appears closer
  const badgeRef = useScrollParallax(0.15, 'up');  // badge drifts slowest = furthest

  // Mouse parallax for hero content
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <header
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      {/* ——— Parallax depth glow layers ——— */}
      {/* Layer 3 (far) — barely moves */}
      <ParallaxDepthLayer speed={0.05} style={{ inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'rgba(0,212,255,0.07)', filter: 'blur(80px)',
          top: '-200px', left: '-150px',
        }} />
      </ParallaxDepthLayer>

      {/* Layer 2 (mid) */}
      <ParallaxDepthLayer speed={0.15} style={{ inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'rgba(124,58,237,0.09)', filter: 'blur(60px)',
          bottom: '-100px', right: '10%',
        }} />
      </ParallaxDepthLayer>

      {/* Layer 1 (close) — grid dots */}
      <ParallaxDepthLayer speed={0.08} style={{ inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </ParallaxDepthLayer>

      {/* ——— Main content ——— */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 24px 60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>

          {/* LEFT — Text Content with scroll parallax */}
          <div
            ref={textRef}
            style={{ flex: '1 1 400px', minWidth: 300 }}
          >
            {/* Badge — drifts at own speed */}
            <div
              ref={badgeRef}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '999px', padding: '6px 16px', marginBottom: '24px',
                transform: `translate(${mouse.x * -8}px, ${mouse.y * -5}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10ffa0', boxShadow: '0 0 8px rgba(16,255,160,0.8)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#7bb3d4' }}>
                STATUS: AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Name — reacts deepest to mouse */}
            <h1
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 900, lineHeight: 1.1, marginBottom: '16px',
                transform: `translate(${mouse.x * -14}px, ${mouse.y * -8}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <span style={{ color: '#e8f4ff' }}>Hi, I'm </span>
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #10ffa0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Raj Haldar
              </span>
            </h1>

            {/* Typing Effect */}
            <div style={{ marginBottom: '24px', minHeight: '2.5rem', transform: `translate(${mouse.x * -10}px, ${mouse.y * -6}px)`, transition: 'transform 0.18s ease-out' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#00d4ff' }}>{`> `}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#10ffa0' }}>{typedText}</span>
              <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: '#00d4ff', marginLeft: '2px', verticalAlign: 'middle', animation: 'typing-cursor 1s step-end infinite' }} />
            </div>

            {/* Description */}
            <p style={{ color: '#7bb3d4', fontSize: '1rem', lineHeight: 1.8, maxWidth: '520px', marginBottom: '36px', transform: `translate(${mouse.x * -6}px, ${mouse.y * -4}px)`, transition: 'transform 0.22s ease-out' }}>
              I design and engineer scalable, production-ready web applications
              using the Full Stack and integrate AI-driven features
              to build intelligent digital solutions.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
              <a href="#projects" className="btn-cosmic btn-primary-cosmic"><span>🚀</span> View Projects</a>
              <a href={resume} download className="btn-cosmic btn-outline-cosmic"><span>📄</span> Download Resume</a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { label: 'Projects Shipped', value: '8+' },
                { label: 'Tech Stack', value: '15+' },
                { label: 'Visitors', value: `${visitorCount}+` },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #00d4ff, #10ffa0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#4a7a9b', letterSpacing: '0.1em' }}>
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Orb with scroll parallax (moves faster = closer) */}
          <div
            ref={orbRef}
            style={{
              flex: '1 1 380px', minWidth: 300,
              display: 'flex', justifyContent: 'center',
              transform: `translate(${mouse.x * 20}px, ${mouse.y * 12}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            <HeroOrb />
          </div>

        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'float 2s ease-in-out infinite' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#4a7a9b' }}>SCROLL TO ENTER REALM</span>
          <div style={{ width: '24px', height: '40px', border: '2px solid rgba(0,212,255,0.3)', borderRadius: '12px', display: 'flex', justifyContent: 'center', padding: '4px' }}>
            <div style={{ width: '4px', height: '8px', borderRadius: '2px', background: '#00d4ff', animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;