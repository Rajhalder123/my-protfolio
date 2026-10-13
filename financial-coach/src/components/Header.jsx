import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Header({ onOpenCheckout, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#audience' },
    { label: 'Systems', href: '#program' },
    { label: 'FinTech Hub', href: '#tools' },
    { label: 'Methodology', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo with User DP Image & Green Title */}
        <a href="#top" className="brand-logo" onClick={(e) => handleNavClick(e, '#top')}>
          <div className="brand-dp-wrapper">
            <img 
              src="/images/raj-dp.png" 
              alt="Raj Halder" 
              className="brand-dp-img"
            />
          </div>
          <div className="brand-text">
            <span className="brand-name">Raj Halder</span>
            <span className="brand-title">CRM &amp; FinTech Engineer</span>
          </div>
        </a>

        {/* Desktop Nav - Strictly 1 Line */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Socials - Strictly 1 Line */}
        <div className="header-actions">
          <div className="social-links">
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
              title="Direct Email (rajhalder.dev@gmail.com)"
            >
              <Mail size={16} />
            </a>
          </div>

          <button
            onClick={onOpenBooking}
            className="btn btn-brand btn-sm"
          >
            <span>Let's Talk</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="container mobile-menu-inner">
            <div className="mobile-brand">
              <div className="brand-dp-wrapper">
                <img 
                  src="/images/raj-dp.png" 
                  alt="Raj Halder" 
                  className="brand-dp-img"
                />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1.15rem' }}>Raj Halder</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  CRM &amp; FinTech Engineer
                </div>
              </div>
            </div>

            <nav className="mobile-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn btn-brand"
                style={{ flex: 1 }}
              >
                Schedule Technical Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
