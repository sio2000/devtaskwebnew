import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Difference-blend cursor: a precise dot + a lagging ring that swells over interactive targets.
 *  Renders only on fine-pointer, motion-allowed devices. Adds `cursor-host` to <body> to hide the native cursor. */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add('cursor-host');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest('a,button,[role="button"],input,textarea,select,label,[data-cursor]'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('cursor-host');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y, marginLeft: -3.5, marginTop: -3.5 }}
        animate={{ scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, marginLeft: -20, marginTop: -20 }}
        animate={{ scale: active ? 1.7 : 1, opacity: active ? 1 : 0.55 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
