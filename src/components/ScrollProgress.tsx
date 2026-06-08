import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient progress bar pinned to the very top of the page. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
    />
  );
};

export default ScrollProgress;
