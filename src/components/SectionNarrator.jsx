import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionNarrator — a floating story caption that fades in when the section
 * enters the viewport. Adds the storytelling narrative layer to each section.
 */
const SectionNarrator = ({ text, color = '#00d4ff', align = 'left' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                textAlign: align,
                marginBottom: '16px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}
        >
            <p style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'italic',
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                color: '#7bb3d4',
                lineHeight: 1.8,
                maxWidth: '640px',
                position: 'relative',
                paddingLeft: '18px',
            }}>
                {/* Colored left bar */}
                <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '4px',
                    bottom: '4px',
                    width: '3px',
                    borderRadius: '2px',
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                }} />
                {text}
            </p>
        </div>
    );
};

export default SectionNarrator;
