import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/** Wraps a control so it drifts toward the cursor (desktop). Pointer-fine only; harmless on touch. */
const MagneticButton: React.FC<MagneticProps> = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
