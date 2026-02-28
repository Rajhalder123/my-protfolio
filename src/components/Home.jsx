import React, { useState, useEffect, useRef } from "react";
import HeroOrb from "./HeroOrb";
import resume from "../pdf/resume.pdf";

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

function FloatingOrb({ size, color, top, left, delay }) {
  return (
    <div style={{
      position: 'absolute',
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      filter: 'blur(60px)',
      top, left,
      animation: `float ${3 + delay}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    }} />
  );
}

const Home = () => {
  const typedText = useTypingEffect(TYPED_WORDS);
  const [visitorCount] = useState(1101);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    el.addEventListener('mousemove', handleMouse);
    return () => el.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <header
      ref={containerRef}
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
      {/* Ambient glows */}
      <FloatingOrb size="500px" color="rgba(0,212,255,0.08)" top="-100px" left="-100px" delay={0} />
      <FloatingOrb size="400px" color="rgba(124,58,237,0.1)" top="50%" left="60%" delay={1.5} />
      <FloatingOrb size="300px" color="rgba(16,255,160,0.06)" top="70%" left="10%" delay={0.8} />

      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 24px 60px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>

          {/* LEFT — Text Content */}
          <div style={{ flex: '1 1 400px', minWidth: 300 }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '24px',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#10ffa0',
                boxShadow: '0 0 8px rgba(16,255,160,0.8)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#7bb3d4' }}>
                STATUS: AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              <span style={{ color: '#e8f4ff' }}>Hi, I'm </span>
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #10ffa0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Raj Haldar
              </span>
            </h1>

            {/* Typing Effect */}
            <div style={{ marginBottom: '24px', minHeight: '2.5rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#00d4ff' }}>
                {`> `}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#10ffa0' }}>
                {typedText}
              </span>
              <span style={{
                display: 'inline-block', width: '2px', height: '1.2em',
                background: '#00d4ff', marginLeft: '2px', verticalAlign: 'middle',
                animation: 'typing-cursor 1s step-end infinite',
              }} />
            </div>

            {/* Description */}
            <p style={{
              color: '#7bb3d4', fontSize: '1rem', lineHeight: 1.8, maxWidth: '520px',
              marginBottom: '36px',
            }}>
              I design and engineer scalable, production-ready web applications
              using the Full Stack and integrate AI-driven features
              to build intelligent digital solutions.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
              <a href="#projects" className="btn-cosmic btn-primary-cosmic">
                <span>🚀</span> View Projects
              </a>
              <a href={resume} download className="btn-cosmic btn-outline-cosmic">
                <span>📄</span> Download Resume
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { label: 'Projects Shipped', value: '8+' },
                { label: 'Tech Stack', value: '15+' },
                { label: 'Visitors', value: `${visitorCount}+` },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00d4ff, #10ffa0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#4a7a9b', letterSpacing: '0.1em' }}>
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Orb */}
          <div style={{ flex: '1 1 380px', minWidth: 300, display: 'flex', justifyContent: 'center' }}>
            <HeroOrb />
          </div>

        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#4a7a9b' }}>
            SCROLL
          </span>
          <div style={{
            width: '24px', height: '40px', border: '2px solid rgba(0,212,255,0.3)',
            borderRadius: '12px', display: 'flex', justifyContent: 'center', padding: '4px',
          }}>
            <div style={{
              width: '4px', height: '8px', borderRadius: '2px', background: '#00d4ff',
              animation: 'float 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;