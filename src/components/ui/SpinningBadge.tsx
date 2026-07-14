import React, { useId } from 'react';
import { motion } from 'framer-motion';

type SpinningBadgeProps = {
  text?: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
  duration?: number;
};

/** Rotating circular text ring with a static centre slot — the classic award-site "spin badge". */
const SpinningBadge: React.FC<SpinningBadgeProps> = ({
  text = 'DEVTASKHUB · DIGITAL STUDIO · THESSALONIKI · ',
  size = 128,
  className = '',
  children,
  duration = 22,
}) => {
  const id = useId().replace(/:/g, '');
  const pathId = `spin-${id}`;
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id={pathId} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="6.4" fill="currentColor" letterSpacing="0.9" fontFamily="'JetBrains Mono', monospace">
          <textPath href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default SpinningBadge;
