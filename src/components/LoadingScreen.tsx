import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import logo from '../assets/logo.png';

/**
 * Intro splash: brand logo + name + tagline + loader. Shows once (~1.6s), then fades.
 * Respects reduced-motion.
 */
const LoadingScreen: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 400 : 1600;
    const timer = setTimeout(() => setVisible(false), duration);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="aurora-blob" style={{ width: '30rem', height: '30rem', top: '20%', left: '20%', background: 'radial-gradient(circle, rgba(110,86,248,0.45), transparent 62%)' }} />
          <div className="aurora-blob" style={{ width: '26rem', height: '26rem', bottom: '18%', right: '18%', background: 'radial-gradient(circle, rgba(52,228,234,0.28), transparent 62%)' }} />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-iris blur-2xl"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={logo}
                alt="DevTaskHub"
                className="relative h-24 w-24 rounded-2xl bg-white object-contain p-3 shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <h1 className="font-display mb-2 text-3xl font-bold text-paper sm:text-4xl">DevTaskHub</h1>
            <p className="font-editorial mb-7 px-6 text-center text-base italic text-paper-dim">{t.nav.tagline}</p>

            <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--iris), var(--signal))' }}
                initial={{ x: '-100%' }}
                animate={{ x: ['-100%', '0%', '100%'] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
