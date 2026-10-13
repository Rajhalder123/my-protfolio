import React from 'react';
import { engineeringApproach } from '../data/portfolioData';
import { GitPullRequest, ArrowRight, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

export default function EngineeringApproach() {
  return (
    <section id="approach" className="section-pad bg-radial-gradient" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <GitPullRequest size={14} />
            <span>DISCIPLINED EXECUTION</span>
          </div>
          <h2 className="section-title">FROM REQUIREMENTS TO PRODUCTION</h2>
          <p className="section-subtitle">
            A battle-tested 6-step engineering workflow designed to build reliable, high-availability CRM and financial systems without architectural shortcuts.
          </p>
        </div>

        {/* Workflow Grid / Horizontal Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {engineeringApproach.map((step, idx) => (
            <div
              key={step.step}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px',
                position: 'relative'
              }}
            >
              <div>
                {/* Step Number Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--accent-bright)'
                    }}
                  >
                    {step.step}
                  </span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    PHASE {idx + 1}
                  </span>
                </div>

                {/* Step Title */}
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {step.title}
                </h3>

                {/* Summary */}
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-bright)', lineHeight: 1.5, marginBottom: '12px', fontWeight: 500 }}>
                  {step.summary}
                </p>

                {/* Technical Real-world Detail */}
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.detail}
                </p>
              </div>

              {/* Bottom Indicator */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Production Milestone Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
