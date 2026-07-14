import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Animates the first integer inside a label (e.g. "50+", "3+") from 0 when scrolled into view.
 *  Non-numeric values (e.g. "24/7") render as-is. */
const CountUp: React.FC<CountUpProps> = ({ value, duration = 1.6, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      setN(Math.round(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match, target, duration]);

  return (
    <span ref={ref} className={className}>
      {match ? value.replace(match[0], String(n)) : value}
    </span>
  );
};

export default CountUp;
