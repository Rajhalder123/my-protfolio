import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['projects', 'skills', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const getLinkPath = (hash) => location.pathname === '/' ? hash : `/${hash}`;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: scrolled ? '12px 0' : '18px 0',
      background: scrolled
        ? 'rgba(2, 4, 8, 0.9)'
        : 'rgba(2, 4, 8, 0.4)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled
        ? '1px solid rgba(0,212,255,0.15)'
        : '1px solid rgba(255,255,255,0.04)',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0,212,255,0.4)',
            fontSize: '1rem', fontWeight: 900,
            color: 'white',
          }}>
            R
          </div>
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            RAJ.DEV
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            {NAV_LINKS.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.name}>
                  <a
                    href={getLinkPath(link.href)}
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      color: isActive ? '#00d4ff' : '#7bb3d4',
                      background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(0,212,255,0.3)' : '1px solid transparent',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#e8f4ff';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#7bb3d4';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {/* Right side — CTA + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isMobile && (
            <a
              href="#contact"
              className="btn-cosmic btn-primary-cosmic"
              style={{ padding: '8px 20px', fontSize: '0.62rem' }}
            >
              Hire Me
            </a>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{
                display: 'flex',
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                gap: '5px', width: '40px', height: '40px',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '10px', cursor: 'pointer',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '18px', height: '2px',
                  background: '#00d4ff', borderRadius: '1px',
                  transition: 'all 0.3s',
                  transform: isOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 1 ? 'opacity: 0'
                        : 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',
                  opacity: isOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(0,212,255,0.1)',
              background: 'rgba(2,4,8,0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="container" style={{ padding: '16px 24px' }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={getLinkPath(link.href)}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block', padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.75rem', letterSpacing: '0.15em',
                    color: '#7bb3d4', textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#7bb3d4'}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </nav>
  );
};

export default Navbar;
