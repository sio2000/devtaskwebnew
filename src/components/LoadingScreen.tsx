import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import logo from '../assets/logo.png';

/**
 * Aesthetic intro splash: brand logo + name + tagline + animated loader.
 * Shows once on initial load for ~1.6s, then fades out. Respects reduced-motion.
 */
const LoadingScreen: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 400 : 1600;
    const timer = setTimeout(() => setVisible(false), duration);
    // Prevent scroll while the splash is visible
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a18] via-[#141430] to-[#1a1340]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {/* Soft glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Logo with pulsing halo */}
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 blur-2xl"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={logo}
                alt="DevTaskHub"
                className="relative h-24 w-auto rounded-2xl shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Brand name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevTaskHub
            </h1>

            {/* Tagline */}
            <p
              className="text-sm sm:text-base text-blue-100/80 italic mb-7 text-center px-6"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {t.nav.tagline}
            </p>

            {/* Loading bar */}
            <div className="w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
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
