import React, { useState, useRef, useCallback } from "react";
import projectData from "./data/Projects.json";
import { Link } from "react-router-dom";
import SectionNarrator from "./SectionNarrator";

const TAGS = ["All", "AI & Full-Stack", "MERN Stack", "React & API", "Full-Stack", "Frontend UI", "React & Framer", "React & Firebase", "React Utility"];

function TiltCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(0,212,255,0.15), 0 20px 60px rgba(0,0,0,0.6)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
  }, []);

  const isExternal = !project.slug;
  const hasSlug = !!project.slug;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(5, 15, 35, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.1s ease-out, box-shadow 0.15s ease-out',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        animation: `reveal-up 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img
          src={project.imageSrc}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          onError={(e) => {
            e.target.src = `https://placehold.co/600x300/020408/00d4ff?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,15,35,0.9) 0%, transparent 60%)',
        }} />
        {/* Tag */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(0,212,255,0.15)',
          border: '1px solid rgba(0,212,255,0.4)',
          borderRadius: '999px',
          padding: '4px 12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: '#00d4ff',
          letterSpacing: '0.1em',
        }}>
          {project.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px' }}>
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#e8f4ff',
          marginBottom: '10px',
          letterSpacing: '0.04em',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.82rem',
          color: '#7bb3d4',
          lineHeight: 1.7,
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.techStack?.slice(0, 4).map(tech => (
            <span key={tech} style={{
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.4)',
              color: '#c4b5fd',
              padding: '2px 10px',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                padding: '8px 0',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                color: 'white',
                fontSize: '0.72rem',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              LIVE DEMO
            </a>
          )}
          {hasSlug && (
            <Link
              to={`/project/${project.slug}`}
              style={{
                flex: 1, textAlign: 'center',
                padding: '8px 0',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff',
                fontSize: '0.72rem',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              DETAILS
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeTag, setActiveTag] = useState("All");

  const filtered = projectData.filter(p => activeTag === "All" || p.tag === activeTag);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        padding: '100px 0',
        zIndex: 1,
      }}
    >
      {/* Section glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Header */}
        <div className="section-header">
          <span className="section-label">// MISSION LOGS</span>
          <h2 className="section-title-3d">Crafted Projects</h2>
          <p style={{ color: '#7bb3d4', maxWidth: '500px', margin: '16px auto 0', fontSize: '0.95rem' }}>
            A selection of my finest work — blending performant code with premium design.
          </p>
          <div style={{ maxWidth: '540px', margin: '20px auto 0' }}>
            <SectionNarrator
              align="center"
              color="#7c3aed"
              text="Each build was a mission with a purpose. Not just code — but solutions that real people use every day."
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          justifyContent: 'center', marginBottom: '48px',
        }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setShowAll(false); }}
              style={{
                padding: '7px 18px',
                borderRadius: '999px',
                border: activeTag === tag ? '1px solid #00d4ff' : '1px solid rgba(255,255,255,0.1)',
                background: activeTag === tag ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                color: activeTag === tag ? '#00d4ff' : '#7bb3d4',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: activeTag === tag ? '0 0 12px rgba(0,212,255,0.2)' : 'none',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
        }}>
          {visible.map((project, i) => (
            <TiltCard key={project.key} project={project} index={i} />
          ))}
        </div>

        {/* Show More */}
        {filtered.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-cosmic btn-outline-cosmic"
            >
              {showAll ? '⬆ SHOW LESS' : `⬇ VIEW ALL ${filtered.length} MISSIONS`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;