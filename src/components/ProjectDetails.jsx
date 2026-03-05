import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectData from './data/Projects.json';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';

const ProjectDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const foundProject = projectData.find(p => p.slug === slug);
        setProject(foundProject);
    }, [slug]);

    if (!project) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-void)',
            color: 'var(--primary)',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
        }}>
            <StarField />
            <span style={{ animation: 'pulse-glow 2s ease-in-out infinite', position: 'relative', zIndex: 1 }}>
                LOADING MISSION DATA...
            </span>
        </div>
    );

    return (
        <>
            <StarField />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <div style={{
                    minHeight: '100vh',
                    paddingTop: isMobile ? '90px' : '120px',
                    paddingBottom: isMobile ? '40px' : '60px',
                    background: 'transparent',
                }}>
                    <div className="container" style={{ maxWidth: '1100px' }}>

                        {/* ——— Back Navigation ——— */}
                        <motion.button
                            onClick={() => navigate('/')}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(0,212,255,0.08)',
                                border: '1px solid rgba(0,212,255,0.25)',
                                borderRadius: '999px',
                                padding: '10px 22px',
                                color: '#00d4ff',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.75rem',
                                letterSpacing: '0.15em',
                                cursor: 'pointer',
                                marginBottom: isMobile ? '32px' : '48px',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(0,212,255,0.15)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
                                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            BACK TO PORTFOLIO
                        </motion.button>

                        {/* ——— Hero Section ——— */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="project-hero-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: isMobile ? '28px' : '48px',
                                alignItems: 'center',
                                marginBottom: isMobile ? '48px' : '80px',
                            }}
                        >
                            {/* Text Content */}
                            <div>
                                {project.tag && (
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '5px 16px',
                                        marginBottom: '24px',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.15em',
                                        color: '#00d4ff',
                                        background: 'rgba(0,212,255,0.1)',
                                        border: '1px solid rgba(0,212,255,0.3)',
                                        borderRadius: '999px',
                                    }}>
                                        {project.tag}
                                    </span>
                                )}
                                <h1 style={{
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                                    fontWeight: 900,
                                    lineHeight: 1.15,
                                    marginBottom: '20px',
                                    background: 'linear-gradient(135deg, #e8f4ff, #00d4ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    {project.title}
                                </h1>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#7bb3d4',
                                    lineHeight: 1.8,
                                    marginBottom: '32px',
                                    maxWidth: '480px',
                                }}>
                                    {project.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-cosmic btn-primary-cosmic"
                                            style={{ fontSize: '0.7rem', padding: '12px 28px' }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                            </svg>
                                            LIVE PREVIEW
                                        </a>
                                    )}
                                    {project.source && (
                                        <a
                                            href={project.source}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-cosmic btn-outline-cosmic"
                                            style={{ fontSize: '0.7rem', padding: '12px 28px' }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                            </svg>
                                            SOURCE CODE
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div style={{ position: 'relative' }}>
                                {/* Glow behind image */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '-6px',
                                    background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(124,58,237,0.3))',
                                    borderRadius: '20px',
                                    filter: 'blur(20px)',
                                    opacity: 0.5,
                                    transition: 'opacity 0.5s',
                                    zIndex: 0,
                                }} />
                                <div style={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,212,255,0.2)',
                                    aspectRatio: '16/10',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(5,15,35,0.6)',
                                    zIndex: 1,
                                }}>
                                    <img
                                        src={project.imageSrc}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/600x375/020408/00d4ff?text=${encodeURIComponent(project.title)}`;
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* ——— Glowing Divider ——— */}
                        <div style={{
                            height: '1px',
                            background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4), rgba(124,58,237,0.4), transparent)',
                            marginBottom: isMobile ? '48px' : '80px',
                        }} />

                        {/* ——— Deep Dive Section ——— */}
                        <div className="project-deep-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                            gap: isMobile ? '28px' : '48px',
                        }}>
                            {/* Left Column: Challenge & Solution */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

                                {/* The Challenge */}
                                <motion.section
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h3 style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#e8f4ff',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                    }}>
                                        <span style={{
                                            width: '36px', height: '36px',
                                            borderRadius: '50%',
                                            background: 'rgba(0,212,255,0.1)',
                                            border: '1px solid rgba(0,212,255,0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '0.7rem',
                                            color: '#00d4ff',
                                        }}>01</span>
                                        The Challenge
                                    </h3>
                                    <div style={{
                                        padding: isMobile ? '20px' : '28px',
                                        borderRadius: '16px',
                                        background: 'rgba(5,15,35,0.7)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(0,212,255,0.12)',
                                        color: '#7bb3d4',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.85,
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                                            e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {project.problemStatement || "The core challenge involved building a scalable, responsive, and robust application that solved complex user-specific problems without compromising on performance."}
                                    </div>
                                </motion.section>

                                {/* The Solution */}
                                <motion.section
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <h3 style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: '#e8f4ff',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                    }}>
                                        <span style={{
                                            width: '36px', height: '36px',
                                            borderRadius: '50%',
                                            background: 'rgba(16,255,160,0.1)',
                                            border: '1px solid rgba(16,255,160,0.3)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '0.7rem',
                                            color: '#10ffa0',
                                        }}>02</span>
                                        The Solution
                                    </h3>
                                    <div style={{
                                        padding: isMobile ? '20px' : '28px',
                                        borderRadius: '16px',
                                        background: 'rgba(5,15,35,0.7)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(16,255,160,0.12)',
                                        color: '#7bb3d4',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.85,
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(16,255,160,0.3)';
                                            e.currentTarget.style.boxShadow = '0 0 25px rgba(16,255,160,0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(16,255,160,0.12)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {project.solution || "We architected a solution built on modern frameworks, heavily optimizing the rendering pipeline and ensuring state management was predictable resulting in a premium user experience."}
                                    </div>
                                </motion.section>
                            </div>

                            {/* Right Column: Tech Stack & Features */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                                {/* Tech Stack */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    style={{
                                        padding: isMobile ? '20px' : '28px',
                                        borderRadius: '16px',
                                        background: 'rgba(5,15,35,0.7)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(124,58,237,0.2)',
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                                        e.currentTarget.style.boxShadow = '0 0 25px rgba(124,58,237,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <h4 style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        color: '#e8f4ff',
                                        letterSpacing: '0.1em',
                                        marginBottom: '20px',
                                        paddingBottom: '14px',
                                        borderBottom: '1px solid rgba(124,58,237,0.2)',
                                    }}>
                                        TECHNOLOGIES USED
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.techStack ? project.techStack.map((tech, i) => (
                                            <span key={i} style={{
                                                padding: '5px 14px',
                                                borderRadius: '999px',
                                                background: 'rgba(124,58,237,0.15)',
                                                border: '1px solid rgba(124,58,237,0.35)',
                                                color: '#c4b5fd',
                                                fontFamily: 'JetBrains Mono, monospace',
                                                fontSize: '0.7rem',
                                                letterSpacing: '0.05em',
                                            }}>
                                                {tech}
                                            </span>
                                        )) : (
                                            <span style={{ color: '#4a7a9b', fontStyle: 'italic', fontSize: '0.85rem' }}>
                                                Core web technologies
                                            </span>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Key Features */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.25 }}
                                    style={{
                                        padding: isMobile ? '20px' : '28px',
                                        borderRadius: '16px',
                                        background: 'rgba(5,15,35,0.7)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(0,212,255,0.15)',
                                        transition: 'border-color 0.3s, box-shadow 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)';
                                        e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.08)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <h4 style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        color: '#e8f4ff',
                                        letterSpacing: '0.1em',
                                        marginBottom: '20px',
                                        paddingBottom: '14px',
                                        borderBottom: '1px solid rgba(0,212,255,0.15)',
                                    }}>
                                        KEY FEATURES
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                        {project.features ? project.features.map((feature, i) => (
                                            <li key={i} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '10px',
                                            }}>
                                                <span style={{
                                                    minWidth: '18px', height: '18px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(16,255,160,0.15)',
                                                    border: '1px solid rgba(16,255,160,0.4)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    marginTop: '3px',
                                                }}>
                                                    <svg width="10" height="10" viewBox="0 0 20 20" fill="#10ffa0">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <span style={{
                                                    color: '#7bb3d4',
                                                    fontSize: '0.85rem',
                                                    lineHeight: 1.6,
                                                }}>
                                                    {feature}
                                                </span>
                                            </li>
                                        )) : (
                                            <li style={{ color: '#4a7a9b', fontStyle: 'italic', fontSize: '0.85rem' }}>
                                                Premium tailored features for optimal UX
                                            </li>
                                        )}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ProjectDetails;
