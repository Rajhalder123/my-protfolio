import React, { useState } from 'react';
import { 
  ChevronDown, 
  Layers, 
  ExternalLink, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Activity 
} from 'lucide-react';
import { siteData } from '../data/content';

export default function CourseProgram({ onOpenCheckout }) {
  const { program } = siteData;
  const [activeModule, setActiveModule] = useState(0);

  const toggleModule = (idx) => {
    setActiveModule(activeModule === idx ? null : idx);
  };

  const projectMeta = [
    {
      title: "FXTrusts CRM Platform",
      image: "/images/fintech-cover.webp",
      badge: "YoForex Core CRM Architecture",
      status: "Production Architecture",
      url: null,
      ctaText: "Request Architecture Blueprint"
    },
    {
      title: "RTX 5 MetaTrader 5 Web Terminal",
      image: "/images/rtx-web-terminal.webp",
      badge: "14ms WebSocket Stream · MT5 Bridge",
      status: "Live in Production",
      url: "https://webterminal.orrnn.com/",
      ctaText: "Launch Live Web Terminal"
    },
    {
      title: "Yo4x Multi-Broker Trade Copier",
      image: "/images/build-trading.webp",
      badge: "Zero Double-Execution Guardrails",
      status: "Production Engine",
      url: null,
      ctaText: "Request Execution Specs"
    },
    {
      title: "DevPilot AI & Computer Vision Suite",
      image: "/images/devpilot-home.webp",
      badge: "Autonomous Next.js 16 SaaS · YOLOv8 CV",
      status: "Live Platforms",
      url: "https://dev-pilot-ai.vercel.app/",
      ctaText: "Launch DevPilot AI SaaS"
    }
  ];

  return (
    <section className="section-wrapper section-wrapper--subtle" id="program">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Layers size={14} />
            Selected Systems
          </span>
          <h2 className="section-title">Production Systems &amp; Technical Architecture</h2>
          <p className="section-subtitle">
            Real systems. Real code in production. Enterprise engineering spanning multi-tenant CRM portals, MetaTrader 5 bridges, and autonomous AI applications.
          </p>
        </div>

        <div className="modules-container">
          {program.map((mod, idx) => {
            const isOpen = activeModule === idx;
            const meta = projectMeta[idx];
            return (
              <div key={idx} className={`module-card ${isOpen ? 'active' : ''}`}>
                <div
                  className="module-header"
                  onClick={() => toggleModule(idx)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                >
                  <div className="module-header-left">
                    <span className="module-number-badge">{mod.number}</span>
                    <div>
                      <h4 className="module-headline">{mod.title}</h4>
                      <p className="module-summary">
                        {mod.lessons.length} Core Production Subsystems • Verified Architecture
                      </p>
                    </div>
                  </div>

                  <div className="module-chevron">
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div className="module-content-drawer">
                    {/* Visual System Architecture Preview Card */}
                    {meta && (
                      <div className="system-preview-card">
                        <div className="system-preview-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="terminal-dot terminal-dot--green"></span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>
                              {meta.title}
                            </span>
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--brand)', background: 'rgba(154, 168, 58, 0.15)', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>
                            {meta.badge}
                          </span>
                        </div>

                        <img
                          src={meta.image}
                          alt={meta.title}
                          className="system-preview-image"
                        />
                      </div>
                    )}

                    {/* Subsystem Lessons / Architecture Blocks */}
                    <div className="module-lessons-grid">
                      {mod.lessons.map((lesson, lIdx) => (
                        <div key={lIdx} className="lesson-box">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ display: 'inline-flex', padding: '3px 8px', borderRadius: '4px', background: 'var(--brand-light)', color: 'var(--brand)', fontSize: '0.72rem', fontWeight: 700 }}>
                              <Server size={12} style={{ marginRight: '4px' }} />
                              Subsystem 0{lIdx + 1}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Production Verified
                            </span>
                          </div>
                          <h5 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                            {lesson.title}
                          </h5>
                          <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                            {lesson.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Module Footer Actions */}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Implemented by Raj Halder · Rigorous test coverage &amp; operational monitoring
                      </span>
                      {meta?.url ? (
                        <a
                          href={meta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-brand btn-sm"
                          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                        >
                          <span>{meta.ctaText}</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <button
                          onClick={onOpenCheckout}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                        >
                          <span>{meta?.ctaText || 'Request System Architecture Deep Dive'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
