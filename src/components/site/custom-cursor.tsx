'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.2 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-5 w-5 rounded-full border border-cyan-brand/70 bg-cyan-brand/10 mix-blend-screen"
      style={{ x: springX, y: springY }}
    />
  );
}
