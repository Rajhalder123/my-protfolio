import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowUp, 
  Calendar,
  Activity,
  Layers
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Footer({ onOpenCheckout, onOpenBooking }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rajhalder.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info & Identity */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="brand-dp-wrapper">
                <img 
                  src="/images/raj-dp.png" 
                  alt="Raj Halder - CRM & FinTech Engineer" 
                  className="brand-dp-img"
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  Raj Halder
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  CRM &amp; FinTech Engineer
                </div>
              </div>
            </div>

            <p style={{ marginTop: '16px', lineHeight: 1.6, color: '#94a3b8', fontSize: '0.9rem' }}>
              Architecting mission-critical CRM portals, ultra-low latency MetaTrader 5 bridges, and resilient full-stack systems. Serving as Full-Stack Engineer with Acting CTO responsibilities at YoForex.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
              <a
                href="https://www.linkedin.com/in/raj-halder-2279a1266/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://github.com/rajhalderdev-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="mailto:rajhalder.dev@gmail.com"
                className="social-btn"
                aria-label="Email"
                title="Direct Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link">About Raj &amp; Credentials</a></li>
              <li><a href="#program" className="footer-link">Selected Production Systems</a></li>
              <li><a href="#audience" className="footer-link">Target Organizations</a></li>
              <li><a href="#tools" className="footer-link">FinTech Simulation Engine</a></li>
              <li><a href="#roadmap" className="footer-link">Engineering Methodology</a></li>
              <li><a href="#faq" className="footer-link">Recruiter FAQ</a></li>
            </ul>
          </div>

          {/* Production Systems & Portals */}
          <div>
            <h4 className="footer-col-title">Live Production Portals</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#program" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>FXTrusts CRM Platform</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://webterminal.orrnn.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link" 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}
                >
                  <span>RTX 5 MT5 Terminal</span>
                  <ExternalLink size={12} style={{ color: 'var(--brand)' }} />
                </a>
              </li>
              <li>
                <a href="#program" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Yo4x Trade Copier</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://dev-pilot-ai.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link" 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}
                >
                  <span>DevPilot AI Platform</span>
                  <ExternalLink size={12} style={{ color: 'var(--brand)' }} />
                </a>
              </li>
              <li>
                <a 
                  href="https://aadhaar-mask-detector.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link" 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Aadhaar Mask Vision API</span>
                  <ExternalLink size={12} style={{ color: 'var(--brand)' }} />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Recruiter Dispatch */}
          <div>
            <h4 className="footer-col-title">Direct Engineering Connect</h4>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '14px', lineHeight: 1.5 }}>
              Open to high-impact FinTech, CRM, and trading infrastructure opportunities worldwide:
            </p>

            {/* Quick Email Copy Box */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 'var(--radius-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <Mail size={16} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  rajhalder.dev@gmail.com
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="btn btn-sm"
                style={{ padding: '6px 10px', fontSize: '0.74rem', background: copied ? 'var(--brand)' : 'rgba(255, 255, 255, 0.12)', color: '#ffffff', borderRadius: '4px' }}
                title="Copy Email to Clipboard"
              >
                {copied ? <Check size={12} style={{ marginRight: '4px' }} /> : <Copy size={12} style={{ marginRight: '4px' }} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn btn-brand btn-sm"
              style={{ width: '100%', marginBottom: '14px' }}
            >
              <Calendar size={14} />
              <span>Schedule Technical Chat</span>
            </button>

            {/* System Status Telemetry */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#94a3b8' }}>
              <span className="status-dot"></span>
              <span>YoForex Systems: 99.98% Uptime · 14ms Latency</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching .footer-bottom in index.css */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Raj Halder. Full-Stack Engineer &amp; Acting CTO at YoForex.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>B.Tech in IT (MAKAUT '25, 8.15 CGPA)</span>
            <a 
              href="#top" 
              onClick={scrollToTop} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--brand)', fontWeight: 600 }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
