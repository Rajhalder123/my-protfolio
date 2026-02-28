import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionReveal v2 — "Coming from the background"
 *
 * Sections start scaled small + blurred (as if far away in the 3D universe)
 * and zoom INTO the viewer as they scroll into view — like a realm appearing
 * out of the deep void and rushing toward you.
 *
 * ❌ NO translateY — sections do NOT slide up from the bottom of the screen
 * ✅ Pure depth zoom: scale(0.72) + blur → scale(1) + clear, no Y movement
 */
const SectionReveal = ({ children }) => {
    const ref = useRef(null);
    const wrapRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        // Perspective container — this is what creates the 3D depth illusion
        <div
            ref={wrapRef}
            style={{
                perspective: '1400px',
                perspectiveOrigin: '50% 40%',
                overflow: 'visible',
            }}
        >
            {/* The actual content zooms out from "far away" — no Y movement */}
            <div
                ref={ref}
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                        ? 'scale3d(1, 1, 1) rotateX(0deg)'
                        : 'scale3d(0.78, 0.78, 0.78) rotateX(4deg)',
                    filter: visible ? 'blur(0px)' : 'blur(8px)',
                    transition: [
                        'opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                        'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        'filter 1.0s ease',
                    ].join(', '),
                    transformOrigin: 'center bottom',
                    willChange: 'transform, opacity, filter',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default SectionReveal;
