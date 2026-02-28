import React from "react";

const Footer = () => {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      padding: '40px 24px',
      borderTop: '1px solid rgba(0,212,255,0.1)',
      background: 'rgba(2,4,8,0.8)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
    }}>
      {/* Glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '300px', height: '1px',
        background: 'linear-gradient(to right, transparent, #00d4ff, transparent)',
      }} />

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '12px',
        }}>
          RAJ HALDAR
        </div>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          color: '#4a7a9b',
          letterSpacing: '0.1em',
        }}>
          © {new Date().getFullYear()} · CRAFTED WITH ⚡ · ALL SYSTEMS ONLINE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
