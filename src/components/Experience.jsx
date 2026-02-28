import React, { useEffect, useRef } from "react";
import SectionNarrator from "./SectionNarrator";
import experienceData from "./data/experience.json";

const CHAPTER_ICONS = ["🚀", "🤖", "🎨", "⚡"];
const CHAPTER_COLORS = ['#00d4ff', '#7c3aed', '#10ffa0', '#ffd700'];

function ChapterCard({ exp, index }) {
  const cardRef = useRef(null);
  const color = CHAPTER_COLORS[index % CHAPTER_COLORS.length];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('chapter-visible');
          el.classList.remove('chapter-hidden');
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="chapter-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: index % 2 === 0 ? '1fr auto 1fr' : '1fr auto 1fr',
        gap: '32px',
        alignItems: 'center',
        marginBottom: '60px',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Date (left on even, empty on odd) */}
      <div style={{ textAlign: index % 2 === 0 ? 'right' : 'left', order: index % 2 === 0 ? 0 : 2 }}>
        {index % 2 === 0 ? (
          <div style={{
            display: 'inline-block',
            background: `${color}15`,
            border: `1px solid ${color}44`,
            borderRadius: '12px',
            padding: '12px 20px',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            <div style={{ color: color, fontWeight: 700, fontSize: '0.9rem' }}>{exp.startDate}</div>
            <div style={{ color: '#4a7a9b', fontSize: '0.75rem' }}>→ {exp.endDate}</div>
          </div>
        ) : (
          <div style={{
            background: 'rgba(5,15,35,0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}33`,
            borderRadius: '20px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.8rem' }}>{CHAPTER_ICONS[index % CHAPTER_ICONS.length]}</span>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: color, letterSpacing: '0.2em', marginBottom: '4px' }}>
                  CHAPTER {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.95rem', color: '#e8f4ff', fontWeight: 700 }}>
                  {exp.organisation}
                </h3>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exp.experiences.map((detail, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: color, marginTop: '4px', flexShrink: 0, fontSize: '0.7rem' }}>▶</span>
                  <span style={{ color: '#7bb3d4', fontSize: '0.85rem', lineHeight: 1.6 }}>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Center node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
          boxShadow: `0 0 20px ${color}44, 0 0 60px ${color}22`,
          zIndex: 2,
          position: 'relative',
        }}>
          {CHAPTER_ICONS[index % CHAPTER_ICONS.length]}
        </div>
        {/* Vertical line */}
        {index < experienceData.length - 1 && (
          <div style={{
            position: 'absolute',
            top: '52px', bottom: '-60px',
            width: '2px',
            background: `linear-gradient(to bottom, ${color}66, transparent)`,
          }} />
        )}
      </div>

      {/* Card content (right on even, date on odd) */}
      <div style={{ order: index % 2 === 0 ? 2 : 0 }}>
        {index % 2 === 0 ? (
          <div style={{
            background: 'rgba(5,15,35,0.7)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}33`,
            borderRadius: '20px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.8rem' }}>{CHAPTER_ICONS[index % CHAPTER_ICONS.length]}</span>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: color, letterSpacing: '0.2em', marginBottom: '4px' }}>
                  CHAPTER {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.95rem', color: '#e8f4ff', fontWeight: 700 }}>
                  {exp.organisation}
                </h3>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exp.experiences.map((detail, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: color, marginTop: '4px', flexShrink: 0, fontSize: '0.7rem' }}>▶</span>
                  <span style={{ color: '#7bb3d4', fontSize: '0.85rem', lineHeight: 1.6 }}>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{
            display: 'inline-block',
            background: `${color}15`,
            border: `1px solid ${color}44`,
            borderRadius: '12px',
            padding: '12px 20px',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            <div style={{ color: color, fontWeight: 700, fontSize: '0.9rem' }}>{exp.startDate}</div>
            <div style={{ color: '#4a7a9b', fontSize: '0.75rem' }}>→ {exp.endDate}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const Experience = () => {
  return (
    <section id="experience" style={{ position: 'relative', padding: '100px 0', zIndex: 1 }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,255,160,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-label">// CAPTAIN'S LOG</span>
          <h2 className="section-title-3d">Experience</h2>
          <p style={{ color: '#7bb3d4', maxWidth: '460px', margin: '16px auto 0', fontSize: '0.9rem' }}>
            Every chapter of the journey — from first code to production deployments.
          </p>
          <div style={{ maxWidth: '560px', margin: '20px auto 0' }}>
            <SectionNarrator
              align="center"
              color="#00d4ff"
              text="Every great coder has a story. This is his — chapter by chapter, line by line, deploy by deploy."
            />
          </div>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {experienceData.map((exp, index) => (
            <ChapterCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
