import { useEffect, useRef, useState } from 'react';

/**
 * useScrollParallax
 * Returns { scrollY, scrollProgress, scrollVelocity, section }
 * and provides a ref to attach to a parallax element.
 *
 * @param {number} speed  - parallax depth multiplier (0 = fixed, 1 = normal, >1 = fast)
 * @param {string} dir    - 'up' | 'down' | 'left' | 'right'
 */
export function useScrollParallax(speed = 0.3, dir = 'up') {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let rafId;
        const update = () => {
            const scrollY = window.scrollY;
            const offset = scrollY * speed;
            let transform = '';
            if (dir === 'up') transform = `translateY(${-offset}px)`;
            if (dir === 'down') transform = `translateY(${offset}px)`;
            if (dir === 'left') transform = `translateX(${-offset}px)`;
            if (dir === 'right') transform = `translateX(${offset}px)`;
            el.style.transform = transform;
            el.style.willChange = 'transform';
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update(); // initial
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [speed, dir]);

    return ref;
}

/**
 * useScrollStats — returns live scroll metrics
 */
export function useScrollStats() {
    const [stats, setStats] = useState({ scrollY: 0, scrollVelocity: 0, scrollProgress: 0 });
    const lastY = useRef(0);
    const rafId = useRef();

    useEffect(() => {
        const update = () => {
            const y = window.scrollY;
            const velocity = y - lastY.current;
            lastY.current = y;
            const progress = y / Math.max(1, document.body.scrollHeight - window.innerHeight);
            setStats({ scrollY: y, scrollVelocity: velocity, scrollProgress: Math.min(1, progress) });
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return stats;
}

/**
 * useMouseParallax — returns { x, y } in -1..1 range, smoothed
 */
export function useMouseParallax(smoothing = 0.06) {
    const mouse = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const rafId = useRef();

    useEffect(() => {
        const onMouse = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouse, { passive: true });

        const loop = () => {
            current.current.x += (mouse.current.x - current.current.x) * smoothing;
            current.current.y += (mouse.current.y - current.current.y) * smoothing;
            rafId.current = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('mousemove', onMouse);
            cancelAnimationFrame(rafId.current);
        };
    }, [smoothing]);

    return current; // use .current.x / .current.y
}
