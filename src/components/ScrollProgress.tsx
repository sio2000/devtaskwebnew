import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin progress bar pinned to the very top of the page (iris → signal). */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, background: 'linear-gradient(90deg, var(--iris), var(--signal))' }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
};

export default ScrollProgress;
