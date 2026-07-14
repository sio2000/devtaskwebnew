import React from 'react';
import { motion, type Variants } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered fade + rise. Respects reduced-motion (via CSS) and staggering via delay. */
const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0, y = 26, once = true, as = 'div' }) => {
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: EASE } },
  };
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
