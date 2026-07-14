import React from 'react';
import { motion } from 'framer-motion';

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** re-trigger key: change to replay the reveal (e.g. hero slide index) */
  triggerKey?: string | number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Per-word mask reveal — words rise from behind a clip edge. Used for hero/section headlines. */
const WordReveal: React.FC<WordRevealProps> = ({ text, className = '', delay = 0, stagger = 0.055, triggerKey }) => {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${triggerKey ?? ''}-${i}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.14em',
            marginBottom: '-0.14em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '115%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default WordReveal;
