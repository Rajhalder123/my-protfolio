import React, { useState } from 'react';
import { projects, additionalProjects } from '../data/portfolioData';
import {
  ExternalLink,
  ArrowRight,
  Layers,
  Lock,
  Server,
  Activity,
  Cpu,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function SelectedWork({ onOpenCaseStudy }) {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'crm', label: 'CRM & FinTech' },
    { id: 'trading', label: 'Trading & MT5' },
    { id: 'ai', label: 'AI & Systems' }
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'crm') return project.id === 'fxtrusts-crm';
    if (filter === 'trading') return project.id === 'asr-trading-infrastructure' || project.id === 'yo4x-trade-copier';
    if (filter === 'ai') return project.id === 'devpilot-ai' || project.id === 'aadhaar-mask-detector';
    return true;
  });

  return (
    <section id="work" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="eyebrow">
            <Layers size={14} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="section-title">SELECTED WORK</h2>
          <p className="section-subtitle">
            Real systems. Real implementation. Production-minded engineering.
          </p>

          {/* Filter Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`chip ${filter === opt.id ? 'chip-accent' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: `1px solid ${filter === opt.id ? 'var(--accent)' : 'var(--border)'}`,
                  padding: '8px 18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Selected Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '64px' }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card"
              style={{
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                backgroundColor: 'var(--surface)',
                borderColor: project.featured ? 'var(--border-strong)' : 'var(--border)'
              }}
            >
              {/* Left Details Column */}
              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Category & Project Index */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 600
                      }}
                    >
                      PROJECT {project.index} · {project.category}
                    </span>
                    {project.isConfidential ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <Lock size={11} />
                        Production Work
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: 'var(--accent-bright)'
                        }}
                      >
                        <CheckCircle2 size={11} />
                        Public / Live
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      marginBottom: '12px',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Short Description */}
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    "{project.shortDescription}"
                  </p>

                  {/* Role & Verification Badge */}
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        Verified Scope &amp; Responsibility:
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                      {project.role} {project.company ? `(${project.company})` : ''}
                    </p>
                  </div>

                  {/* Implementation Highlights */}
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      IMPLEMENTATION HIGHLIGHTS:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {project.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent)', marginTop: '3px' }}>▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--surface-raised)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Links */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => onOpenCaseStudy(project)}
                    className="btn btn-primary btn-sm"
                  >
                    View Deep-Dive Case Study
                    <ChevronRight size={15} />
                  </button>

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <span>{project.liveDemoLabel || 'Live Demo'}</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      <GithubIcon size={14} />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Visual / Architecture Column */}
              <div
                style={{
                  backgroundColor: 'var(--surface-raised)',
                  borderLeft: '1px solid var(--border)',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* System Preview Image */}
                <div
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-strong)',
                    marginBottom: '24px',
                    position: 'relative'
                  }}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} system showcase`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '240px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(8, 11, 16, 0.95), transparent)',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-primary)' }}>
                      {project.name} · Production View
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent-bright)' }}>
                      Active Node
                    </span>
                  </div>
                </div>

                {/* System Overview Pipeline Flow */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <Server size={14} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      SYSTEM ARCHITECTURE FLOW:
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {project.systemFlow.map((flow, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '10px 14px',
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)' }}>
                            0{idx + 1}
                          </span>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {flow.step}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                          {flow.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Engineering Projects Bento Grid */}
        <div style={{ marginTop: '72px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="eyebrow">PROJECT 06 · COMPACT ENGINEERING ARCHIVE</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Additional Engineering Work
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Compact collection of verified applications, AI analyzers, real-time messaging, and utilities.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {additionalProjects.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)' }}>
                      {item.category}
                    </span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                  </div>

                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {item.name}
                  </h4>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
                    {item.tagline}
                  </p>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {item.summary}
                  </p>

                  {/* Stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '18px' }}>
                    {item.stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--surface-raised)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  {item.liveDemo && (
                    <a
                      href={item.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <span>Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <GithubIcon size={12} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
