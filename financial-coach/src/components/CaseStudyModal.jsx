import React from 'react';
import {
  X,
  ExternalLink,
  Server,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Terminal,
  Activity,
  AlertCircle
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function CaseStudyModal({ project, onClose }) {
  if (!project || !project.caseStudy) return null;

  const cs = project.caseStudy;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="eyebrow" style={{ margin: 0 }}>
                DETAILED CASE STUDY · PROJECT {project.index}
              </span>
              {project.isConfidential && (
                <span className="chip" style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>
                  <Lock size={10} />
                  Private Architecture
                </span>
              )}
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
              {project.name}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              {project.category}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close case study"
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Case Study Meta Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px',
            padding: '16px',
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ marginRight: '16px' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block' }}>
              ROLE &amp; SCOPE
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {project.role}
            </span>
          </div>

          <div style={{ marginRight: '16px' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block' }}>
              TIMELINE
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {project.period}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block' }}>
              TECH STACK
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-bright)' }}>
              {project.stack.slice(0, 5).join(' · ')}
            </span>
          </div>
        </div>

        {/* Case Study Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* 1. Project Overview */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>01.</span>
              Project Overview
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              {cs.overview}
            </p>
          </div>

          {/* 2. Business Problem */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>02.</span>
              Business Problem
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              {cs.businessProblem}
            </p>
          </div>

          {/* 3. Technical Challenges */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>03.</span>
              Technical Challenges
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cs.technicalChallenges.map((ch, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <AlertCircle size={16} style={{ color: 'var(--accent)', shrink: 0, marginTop: '3px' }} />
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. My Responsibilities */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>04.</span>
              My Responsibilities
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cs.myResponsibilities.map((resp, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-bright)', shrink: 0, marginTop: '3px' }} />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Architecture and System Flow */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>05.</span>
              Architecture &amp; System Flow
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '12px' }}>
              {project.systemFlow.map((flow, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px',
                    backgroundColor: 'var(--surface-raised)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', display: 'block', marginBottom: '4px' }}>
                    STEP 0{i + 1}
                  </span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                    {flow.step}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {flow.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Key Implementation Decisions */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>06.</span>
              Key Implementation Decisions
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cs.keyDecisions.map((dec, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-bright)', fontWeight: 700 }}>▸</span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Security and Reliability Considerations */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>07.</span>
              Security &amp; Reliability Considerations
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              {cs.securityReliability}
            </p>
          </div>

          {/* 8. Testing and Deployment */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>08.</span>
              Testing &amp; Deployment
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              {cs.testingDeployment}
            </p>
          </div>

          {/* 9. Results and Verified Outcomes */}
          <div
            style={{
              padding: '20px',
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-bright)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>09.</span>
              Results &amp; Verified Outcomes
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {cs.outcomes}
            </p>
          </div>

          {/* 10. Lessons Learned */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>10.</span>
              Lessons Learned
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              "{cs.lessonsLearned}"
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <span>Live Demo</span>
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
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
