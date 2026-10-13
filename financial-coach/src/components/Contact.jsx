import React, { useState } from 'react';
import { identity } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import {
  Mail,
  Globe,
  Copy,
  Check,
  Send,
  MessageSquareCode,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'CRM / FinTech Architecture',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10B981', '#34D399', '#059669', '#FFFFFF']
    });

    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad bg-radial-gradient" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '820px' }}>
          <div className="eyebrow">
            <MessageSquareCode size={14} />
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <h2 className="section-title">
            BUILDING SOMETHING COMPLEX? <br />
            <span style={{ color: 'var(--accent-bright)' }}>LET'S TALK ENGINEERING.</span>
          </h2>
          <p className="section-subtitle">
            I'm open to opportunities in full-stack engineering, CRM development, fintech, trading infrastructure, and product engineering. Supporting both domestic teams in India and international remote engineering organizations.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}
        >
          {/* Left Column: Direct Contact & Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Verified Email Card with Copy Feature */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Mail size={18} style={{ color: 'var(--accent-bright)' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  DIRECT EMAIL INBOX
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--surface-raised)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '14px'
                }}
              >
                <a
                  href={`mailto:${identity.email}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    wordBreak: 'break-all'
                  }}
                >
                  {identity.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '6px 10px', marginLeft: '10px' }}
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={16} style={{ color: 'var(--accent-bright)' }} /> : <Copy size={16} />}
                </button>
              </div>

              {copied && (
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                  ✓ Copied email to clipboard!
                </p>
              )}
            </div>

            {/* Social & Verification Links Card */}
            <div className="card" style={{ padding: '28px' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                VERIFIED PROFESSIONAL PROFILES
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%', padding: '12px 18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LinkedinIcon size={18} style={{ color: '#0a66c2' }} />
                    <span style={{ fontWeight: 600 }}>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={identity.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%', padding: '12px 18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GithubIcon size={18} />
                    <span style={{ fontWeight: 600 }}>GitHub Repositories</span>
                  </div>
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={identity.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%', padding: '12px 18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Globe size={18} style={{ color: 'var(--accent-bright)' }} />
                    <span style={{ fontWeight: 600 }}>Canonical Portfolio</span>
                  </div>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* Availability Spec */}
            <div
              style={{
                padding: '20px',
                backgroundColor: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Clock size={15} style={{ color: 'var(--accent)' }} />
                <strong style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  Availability &amp; Work Preference
                </strong>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {identity.workPreference}. Typically responding within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Send an Engineering Inquiry
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Discuss an open full-stack role, trading platform integration, or architectural consulting.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-inverse)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <Check size={24} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Inquiry Dispatched!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                  Thank you for reaching out. Raj will review your inquiry and follow up promptly at <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'CRM / FinTech Architecture', message: '' });
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}
                  >
                    YOUR NAME OR ORGANIZATION *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance · FinTech recruiter or CTO"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}
                  >
                    YOUR EMAIL ADDRESS *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}
                  >
                    INQUIRY DOMAIN
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Full-Stack Engineering Role">Full-Stack Engineering Role</option>
                    <option value="CRM & FinTech Platform">CRM &amp; FinTech Platform</option>
                    <option value="MetaTrader 5 / Trading Integration">MetaTrader 5 / Trading Integration</option>
                    <option value="Technical Lead / Acting CTO Consultation">Technical Lead Consultation</option>
                    <option value="Other Engineering Discussion">Other Engineering Discussion</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}
                  >
                    MESSAGE / SCOPE DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Share brief requirements, role details, or integration challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.9375rem', marginTop: '8px' }}
                >
                  <Send size={16} />
                  Submit Engineering Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
