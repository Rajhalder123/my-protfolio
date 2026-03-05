import React, { useState, useEffect } from "react";
import EmailSender from "./EmailSender";
import SectionNarrator from "./SectionNarrator";

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Rajhalder123', icon: 'fab fa-github', color: '#e8f4ff', bg: 'rgba(255,255,255,0.08)' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/raj-haldar', icon: 'fab fa-linkedin-in', color: '#0a66c2', bg: 'rgba(10,102,194,0.15)' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'fab fa-twitter', color: '#1da1f2', bg: 'rgba(29,161,242,0.15)' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'fab fa-instagram', color: '#e1306c', bg: 'rgba(225,48,108,0.12)' },
];

const Contact = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="contact" style={{ position: 'relative', padding: isMobile ? '60px 0 40px' : '100px 0 60px', zIndex: 1, overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px', maxWidth: '100vw',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.03,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,1) 2px, rgba(0,212,255,1) 4px)',
      }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">// HQ COMMS</span>
          <h2 className="section-title-3d">Get In Touch</h2>
          <p style={{ color: '#7bb3d4', maxWidth: '460px', margin: '16px auto 0', fontSize: '0.9rem' }}>
            Whether you have a project, opportunity, or just want to say hi — open channel!
          </p>
          <div style={{ maxWidth: '540px', margin: '20px auto 0' }}>
            <SectionNarrator
              align="center"
              color="#7c3aed"
              text="And now the chapter turns to you. Every great story needs a collaborator — perhaps that's you."
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`, gap: isMobile ? '24px' : '40px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Left: Info panel */}
          <div style={{
            background: 'rgba(5,15,35,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '24px 16px' : '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}>
            {/* Status indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: '#10ffa0',
                boxShadow: '0 0 12px rgba(16,255,160,0.8)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#10ffa0', letterSpacing: '0.1em' }}>
                AVAILABLE FOR HIRE
              </span>
            </div>

            <div>
              <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.4rem', color: '#e8f4ff', marginBottom: '12px' }}>
                Let's Build Something
              </h3>
              <p style={{ color: '#7bb3d4', fontSize: '0.9rem', lineHeight: 1.8 }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '📧', label: 'Email', value: 'rajhalder9832@gmail.com' },
                { icon: '📍', label: 'Location', value: 'West Bengal, India' },
                { icon: '⏰', label: 'Response', value: 'Within 24 hours' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#4a7a9b', letterSpacing: '0.15em', marginBottom: '2px' }}>
                      {item.label.toUpperCase()}
                    </div>
                    <div style={{ color: '#e8f4ff', fontSize: '0.85rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#4a7a9b', letterSpacing: '0.2em', marginBottom: '16px' }}>
                FIND ME ON
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: '44px', height: '44px',
                      borderRadius: '12px',
                      background: s.bg,
                      border: `1px solid ${s.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: s.color,
                      fontSize: '1.1rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)'; e.currentTarget.style.boxShadow = `0 0 15px ${s.color}44`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Email form */}
          <div style={{
            background: 'rgba(5,15,35,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '24px 16px' : '40px 32px',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#7c3aed', letterSpacing: '0.2em', marginBottom: '24px' }}>
              // SEND MESSAGE
            </div>
            <EmailSender />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
