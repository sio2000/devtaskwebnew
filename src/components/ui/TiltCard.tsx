import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/** Subtle 3D tilt following the cursor. Mouse-only, so touch devices stay flat. */
const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', max = 7, glare = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 170, damping: 16 });
  const sy = useSpring(py, { stiffness: 170, damping: 16 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glareOpacity = useSpring(hover, { stiffness: 200, damping: 24 });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 50%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative [perspective:1200px] ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
