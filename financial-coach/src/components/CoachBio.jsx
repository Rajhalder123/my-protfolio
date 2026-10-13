import React from 'react';
import { Award, Users, TrendingUp, Calendar, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { siteData } from '../data/content';

export default function CoachBio({ onOpenBooking }) {
  const { coach } = siteData;

  const iconMap = {
    award: Award,
    users: Users,
    'trending-up': TrendingUp
  };

  return (
    <section className="section-wrapper section-wrapper--white" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Cpu size={14} />
            Engineering Leadership &amp; Background
          </span>
          <h2 className="section-title">Engineering Ownership, Beyond the Code</h2>
          <p className="section-subtitle">
            {coach.quote}
          </p>
        </div>

        <div className="coach-grid">
          {/* Left Column: Portrait Card & Role Details */}
          <div className="coach-media-card">
            <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--ink)' }}>
              <img
                src="/images/portrait.webp"
                alt="Raj Halder - Full-Stack Engineer & Acting CTO"
                style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'linear-gradient(180deg, transparent 0%, rgba(12, 33, 51, 0.95) 100%)',
                padding: '24px 20px 16px 20px'
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(154, 168, 58, 0.25)', border: '1px solid var(--brand)', borderRadius: 'var(--radius-pill)', padding: '2px 10px', fontSize: '0.72rem', color: '#ffffff', fontWeight: 700, marginBottom: '6px' }}>
                  <ShieldCheck size={12} style={{ color: 'var(--brand)' }} />
                  MAKAUT '25 Honors (8.15 CGPA)
                </div>
              </div>
            </div>

            <div style={{ padding: '22px 24px', background: 'var(--ink)', color: '#ffffff', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '2px' }}>{coach.name}</h3>
                  <p style={{ color: 'var(--brand)', fontSize: '0.84rem', fontWeight: 700 }}>
                    {coach.title} · YoForex
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="btn btn-brand btn-sm"
                >
                  <Calendar size={14} />
                  <span>Let's Talk</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Credentials & Production Standards */}
          <div className="coach-details">
            <h3 style={{ fontSize: '1.65rem', marginBottom: '16px', color: 'var(--ink)' }}>
              Practical leadership experience in an{' '}
              <span className="text-highlight">early-career engineering role</span> with real production ownership
            </h3>

            <p style={{ color: 'var(--text-body)', marginBottom: '28px', fontSize: '1.02rem', lineHeight: 1.7 }}>
              At YoForex, I pair active daily code commits with Acting CTO and technical lead responsibilities:
              coordinating technical implementation across workstreams, driving architecture choices for MetaTrader 5
              bridges, and directly triaging production anomalies like HTTP 429 rate limits, 502 bad gateways, and WebSocket disconnects.
            </p>

            <div className="coach-credentials-list">
              {coach.credentials.map((cred) => {
                const Icon = iconMap[cred.icon] || Award;
                return (
                  <div key={cred.id} className="credential-item">
                    <div className="credential-icon">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="credential-title">{cred.title}</h4>
                      <p className="credential-desc">{cred.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Tech Stack Badges */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '14px' }}>
                Verified Core Production Technologies:
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', padding: '6px 14px', background: 'var(--light-accent)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>React / Next.js</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', padding: '6px 14px', background: 'var(--light-accent)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>TypeScript</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', padding: '6px 14px', background: 'var(--light-accent)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>Node.js / Express</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', padding: '6px 14px', background: 'var(--light-accent)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-subtle)' }}>PostgreSQL &amp; Redis</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--brand)', padding: '6px 14px', background: 'var(--brand-light)', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(154, 168, 58, 0.3)' }}>MetaTrader 5 API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
