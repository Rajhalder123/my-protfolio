import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Activity,
  Globe
} from 'lucide-react';
import { siteData } from '../data/content';
import GlobalTradingMesh from './GlobalTradingMesh';

export default function Hero({ onOpenCheckout }) {
  const { hero } = siteData;

  const scrollToSection = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="top">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Copy & Meta Cards */}
          <div className="hero-content">
            <div className="hero-badge-container">
              <span className="section-tag">
                <Globe size={14} />
                GLOBAL FINTECH &amp; TRADING SYSTEMS ENGINEER
              </span>
            </div>

            <h1 className="hero-headline">
              I BUILD THE <span className="text-highlight">GLOBAL SYSTEMS</span> THAT POWER FINTECH.
            </h1>

            <p className="hero-description">
              Engineering institutional CRM portals, ultra-low latency MetaTrader 5 bridges, and resilient cross-border trading infrastructure. Pairing daily production code commits with technical leadership and Acting CTO responsibilities at YoForex.
            </p>

            {/* 4 Parameter Cards */}
            <div className="hero-meta-grid">
              <div className="meta-card">
                <div className="meta-card-label">Current Company</div>
                <div className="meta-card-value price">YoForex</div>
              </div>
              <div className="meta-card">
                <div className="meta-card-label">Responsibility</div>
                <div className="meta-card-value">Acting CTO</div>
              </div>
              <div className="meta-card">
                <div className="meta-card-label">MT5 Bridge</div>
                <div className="meta-card-value">14ms Latency</div>
              </div>
              <div className="meta-card">
                <div className="meta-card-label">Scope</div>
                <div className="meta-card-value">Global Remote</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta-group">
              <button
                onClick={(e) => scrollToSection(e, '#program')}
                className="btn btn-brand btn-lg"
              >
                <span>Explore Global Systems</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={(e) => scrollToSection(e, '#tools')}
                className="btn btn-outline"
              >
                <Cpu size={18} />
                <span>Simulation Hub</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>YoForex Engineering Lead (Joined Jan 2026)</span>
              </div>
              <div className="trust-item">
                <Activity size={16} />
                <span>B.Tech in IT (MAKAUT '25, 8.15 CGPA)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Global Trading Mesh & Live Telemetry HUD */}
          <div className="hero-media-wrapper">
            <GlobalTradingMesh />
          </div>
        </div>
      </div>
    </section>
  );
}
