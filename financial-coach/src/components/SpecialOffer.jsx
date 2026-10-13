import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { siteData } from '../data/content';

export default function SpecialOffer({ onOpenCheckout }) {
  const { specialOffer } = siteData;

  return (
    <section className="section-wrapper section-wrapper--white" id="offer">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Cpu size={14} />
            {specialOffer.tag}
          </span>
          <h2 className="section-title">{specialOffer.title}</h2>
          <p className="section-subtitle">
            {specialOffer.description}
          </p>
        </div>

        <div className="special-offer-card">
          {/* Left Column: Specialization Pillars & Architecture Visual */}
          <div className="offer-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand)', fontWeight: 700, marginBottom: '6px' }}>
              <Sparkles size={18} />
              <span>Core Architectural Pillars:</span>
            </div>

            <div className="offer-bonuses-list">
              {specialOffer.bonuses.map((bonus, idx) => (
                <div key={idx} className="bonus-item">
                  <span className="bonus-badge">{bonus.badge}</span>
                  <div className="bonus-content">
                    <h4>{bonus.title}</h4>
                    <p>{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Generated High-Resolution FinTech CRM & Ledger Architecture Diagram */}
            <div style={{ marginTop: '20px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <img
                src="/images/fintech-ledger-arch.jpg"
                alt="FinTech CRM & Digital Ledger Architecture with MetaTrader 5 Bridge Connectivity"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Right Column: Investment / Role Availability Card matching index.css .investment-card */}
          <div className="offer-right">
            <div className="investment-card">
              <div className="investment-tag">
                {specialOffer.investment.type}
              </div>

              <div className="investment-price-row">
                <span className="investment-price">{specialOffer.investment.price}</span>
                <span className="investment-period">Remote / Hybrid / Relocation</span>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.55 }}>
                Available for full-time engineering and technical leadership opportunities in forward-thinking FinTech, trading, and platform companies.
              </p>

              <ul className="investment-features">
                {specialOffer.investment.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenCheckout}
                className="btn btn-brand btn-lg"
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <span>Discuss An Opportunity</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem', color: '#94a3b8' }}>
                <ShieldCheck size={16} style={{ color: 'var(--brand)' }} />
                <span>Verified Production Engineering Delivery · MAKAUT '25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
