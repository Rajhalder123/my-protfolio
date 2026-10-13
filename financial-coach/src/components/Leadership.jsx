import React from 'react';
import { leadershipPoints } from '../data/portfolioData';
import { ShieldCheck, Award, Layers, Users, Activity, CheckCircle2, Terminal } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="section-pad bg-radial-gradient" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <ShieldCheck size={14} />
            <span>OPERATIONAL LEADERSHIP</span>
          </div>
          <h2 className="section-title">ENGINEERING OWNERSHIP, BEYOND THE CODE</h2>
          <p className="section-subtitle">
            At YoForex, I pair hands-on full-stack development with Acting CTO and technical lead responsibilities—coordinating workstreams, evaluating architecture choices, and triaging production emergencies.
          </p>
        </div>

        {/* Lead Scope Banner */}
        <div
          style={{
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '28px 32px',
            marginBottom: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-bright)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600
              }}
            >
              Current Engagement · YoForex (Joined January 2026)
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px', marginBottom: '8px' }}>
              Practical Leadership in an Early-Career Engineering Role
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Rather than just writing isolated components, I assume end-to-end accountability for system reliability, MT5 integration boundaries, and delivery timelines across both client-facing and back-office services.
            </p>
          </div>

          <div
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block' }}>
              OPERATIONAL ROLE
            </span>
            <strong style={{ fontSize: '0.9375rem', color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)' }}>
              Acting CTO / Tech Lead
            </strong>
          </div>
        </div>

        {/* Leadership Points Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {leadershipPoints.map((point, idx) => (
            <div
              key={point.id}
              className="card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-bright)'
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                    PRACTICE 0{idx + 1}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {point.title}
                </h4>

                <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {point.desc}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Active Operational Responsibility
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
