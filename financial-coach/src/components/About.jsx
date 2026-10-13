import React from 'react';
import { identity } from '../data/portfolioData';
import { GraduationCap, Award, MapPin, Briefcase, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  const ed = identity.education;

  return (
    <section id="about" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Terminal size={14} />
            <span>BACKGROUND &amp; CREDENTIALS</span>
          </div>
          <h2 className="section-title">ABOUT ME</h2>
          <p className="section-subtitle">
            Grounded in software engineering fundamentals, production ownership, and enterprise trading systems.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {/* Left Column: Biography */}
          <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span className="status-indicator">
                  <span className="pulse-dot" />
                  <span>Kolkata, West Bengal, India</span>
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                Engineering for High-Reliability FinTech
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '16px', fontWeight: 500 }}>
                "{identity.aboutExtended}"
              </p>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                My engineering approach is built around clarity and defensive architecture: defining clean data models, ensuring transactional safety in distributed environments, and testing for worst-case failure modes before releasing to production.
              </p>
            </div>

            {/* Current Position Tag */}
            <div
              style={{
                marginTop: '28px',
                padding: '16px',
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={16} style={{ color: 'var(--accent-bright)' }} />
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'block' }}>
                    {identity.company}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {identity.roleStatus} · Since {identity.joinedCompany}
                  </span>
                </div>
              </div>
              <span className="chip chip-accent" style={{ fontSize: '0.6875rem' }}>
                Active Production
              </span>
            </div>
          </div>

          {/* Right Column: Education & Standards Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Education Card */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--surface-raised)',
                    border: '1px solid var(--accent-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-bright)'
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    ACADEMIC FOUNDATION
                  </span>
                  <h4 style={{ fontSize: '1.1875rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {ed.degree}
                  </h4>
                </div>
              </div>

              <div style={{ padding: '16px', backgroundColor: 'var(--surface-raised)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {ed.shortUniv}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--accent-bright)', fontWeight: 700 }}>
                    CGPA {ed.cgpa}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                  {ed.university} · Class of {ed.year} · {ed.location}
                </p>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Rigorous coursework spanning Algorithms, Database Management Systems, Computer Networks, Operating Systems, and Distributed Computing.
              </p>
            </div>

            {/* Engineering Principles Card */}
            <div className="card" style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                Core Engineering Creed
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▸</span>
                  <span><strong>Zero Assumptions on Ledger Balances:</strong> Always enforce server-side ACID concurrency locks.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▸</span>
                  <span><strong>Defensive Integration:</strong> External broker APIs will time out; design resilient retry queues and dead-letter channels.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>▸</span>
                  <span><strong>Clear Security Boundaries:</strong> Never trust client tokens; validate permissions on every endpoint.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
