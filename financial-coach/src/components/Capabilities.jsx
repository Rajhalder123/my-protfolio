import React, { useState } from 'react';
import { capabilities } from '../data/portfolioData';
import { Cpu, CheckCircle2, Layers, ShieldCheck, Terminal, Filter } from 'lucide-react';

export default function Capabilities() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all'
    ? capabilities
    : capabilities.filter(c => c.id === selectedCategory);

  return (
    <section id="capabilities" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <Cpu size={14} />
            <span>ENGINEERING STACK &amp; MATRIX</span>
          </div>
          <h2 className="section-title">TECHNICAL CAPABILITIES</h2>
          <p className="section-subtitle">
            Categorized capabilities rooted in production experience and verified deliverables. Production competencies are clearly separated from working knowledge.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`chip ${selectedCategory === 'all' ? 'chip-accent' : ''}`}
              style={{
                cursor: 'pointer',
                border: `1px solid ${selectedCategory === 'all' ? 'var(--accent)' : 'var(--border)'}`,
                padding: '8px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem'
              }}
            >
              All Categories
            </button>
            {capabilities.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`chip ${selectedCategory === c.id ? 'chip-accent' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: `1px solid ${selectedCategory === c.id ? 'var(--accent)' : 'var(--border)'}`,
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem'
                }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                    {cat.skills.length} competencies
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {cat.summary}
                </p>

                {/* Skills Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'var(--surface-raised)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-pill)',
                            backgroundColor: skill.level === 'Production' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                            color: skill.level === 'Production' ? 'var(--accent-bright)' : 'var(--text-muted)',
                            border: `1px solid ${skill.level === 'Production' ? 'var(--accent-border)' : 'var(--border-subtle)'}`
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Validation Line */}
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
                <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Verified Production Delivery Baseline
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
