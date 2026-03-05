import React, { useEffect, useRef, useState } from "react";
import SectionNarrator from "./SectionNarrator";
import skillsData from "./data/skills.json";

const SKILL_COLORS = ['#00d4ff', '#7c3aed', '#10ffa0', '#ffd700', '#ff4757'];

function OrbitRing({ radius, speed, skills, ringIndex }) {
  const angleStep = (2 * Math.PI) / skills.length;
  const color = SKILL_COLORS[ringIndex % SKILL_COLORS.length];

  return (
    <div style={{
      position: 'absolute',
      width: radius * 2,
      height: radius * 2,
      borderRadius: '50%',
      border: `1px solid ${color}22`,
      animation: `${ringIndex % 2 === 0 ? 'orbit-slow' : 'orbit-medium'} ${speed}s linear infinite`,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      {skills.map((skill, i) => {
        const angle = angleStep * i;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={skill.id}
            title={skill.title}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              width: '52px', height: '52px',
              borderRadius: '12px',
              background: 'rgba(5,15,35,0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${color}44`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: `0 0 12px ${color}22`,
              // Counter-rotate so icons stay upright
              animation: `${ringIndex % 2 === 0 ? 'orbit-medium' : 'orbit-slow'} ${speed}s linear infinite`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.3)`;
              e.currentTarget.style.boxShadow = `0 0 20px ${color}66`;
              e.currentTarget.style.border = `1px solid ${color}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
              e.currentTarget.style.boxShadow = `0 0 12px ${color}22`;
              e.currentTarget.style.border = `1px solid ${color}44`;
            }}
          >
            <img
              src={skill.imageSrc}
              alt={skill.title}
              style={{ width: '24px', height: '24px', objectFit: 'contain' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span style={{
              fontSize: '0.5rem',
              color: color,
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1,
            }}>
              {skill.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const Skills = () => {
  // Distribute skills across 3 orbital rings
  const ring1 = skillsData.slice(0, 5);
  const ring2 = skillsData.slice(5, 11);
  const ring3 = skillsData.slice(11);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="skills"
      style={{ position: 'relative', padding: isMobile ? '60px 0' : '100px 0', zIndex: 1, overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px', maxWidth: '100vw',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">// TECH ARSENAL</span>
          <h2 className="section-title-3d">Skills & Tools</h2>
          <p style={{ color: '#7bb3d4', maxWidth: '480px', margin: '16px auto 0', fontSize: '0.9rem' }}>
            Technologies orbiting my development universe — hover to explore.
          </p>
          <div style={{ maxWidth: '560px', margin: '20px auto 0' }}>
            <SectionNarrator
              align="center"
              color="#10ffa0"
              text="He didn't just learn tools — he made each one part of him. Every technology a weapon forged through late nights and real projects."
            />
          </div>
        </div>

        {/* Solar System — desktop only */}
        <div className="skills-orbit-container" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          aspectRatio: '1',
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Central core */}
          <div style={{
            position: 'relative', zIndex: 10,
            width: '90px', height: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '2.5rem' }}>⚡</span>
          </div>

          {/* Orbit rings */}
          <OrbitRing radius={130} speed={20} skills={ring1} ringIndex={0} />
          <OrbitRing radius={220} speed={35} skills={ring2} ringIndex={1} />
          <OrbitRing radius={310} speed={50} skills={ring3} ringIndex={2} />
        </div>

        {/* Mobile skills grid — shown on mobile only */}
        <div className="skills-mobile-grid" style={{
          display: isMobile ? 'flex' : 'none',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto 32px',
        }}>
          {skillsData.map((skill, i) => {
            const color = SKILL_COLORS[i % SKILL_COLORS.length];
            return (
              <div key={skill.id} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '6px',
                width: '70px', height: '70px',
                borderRadius: '14px',
                background: 'rgba(5,15,35,0.9)',
                border: `1px solid ${color}44`,
                boxShadow: `0 0 10px ${color}22`,
                transition: 'all 0.3s',
              }}>
                <img
                  src={skill.imageSrc}
                  alt={skill.title}
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <span style={{
                  fontSize: '0.5rem',
                  color: color,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1,
                }}>
                  {skill.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          justifyContent: 'center', marginTop: '48px',
        }}>
          {skillsData.map(skill => (
            <div key={skill.id} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px',
              background: 'rgba(5,15,35,0.6)',
              border: '1px solid rgba(0,212,255,0.1)',
              borderRadius: '999px',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00d4ff'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <img src={skill.imageSrc} alt={skill.title} style={{ width: '18px', height: '18px', objectFit: 'contain' }} onError={e => { e.target.style.display = 'none'; }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#7bb3d4' }}>
                {skill.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
