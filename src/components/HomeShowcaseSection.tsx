import React from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaBolt, FaBullseye, FaTools, FaRocket } from 'react-icons/fa';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { ArrowRight, Sparkles } from 'lucide-react';

const HomeShowcaseSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const t = translations[language];

  const bullets = [
    {
      icon: <FaGem className="text-cyan-500 text-3xl md:text-4xl" />,
      text: t.homeShowcase.bullets[0],
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
    },
    {
      icon: <FaBolt className="text-yellow-400 text-3xl md:text-4xl" />,
      text: t.homeShowcase.bullets[1],
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-400/10 to-orange-500/10',
    },
    {
      icon: <FaBullseye className="text-pink-500 text-3xl md:text-4xl" />,
      text: t.homeShowcase.bullets[2],
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-500/10 to-rose-500/10',
    },
    {
      icon: <FaTools className="text-indigo-500 text-3xl md:text-4xl" />,
      text: t.homeShowcase.bullets[3],
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
    },
    {
      icon: <FaRocket className="text-blue-500 text-3xl md:text-4xl" />,
      text: t.homeShowcase.bullets[4],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
  ];

  return (
    <section
      className="relative py-32 md:py-40 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30 overflow-hidden"
      aria-label="Εντυπωσιακές Ιστοσελίδες"
    >
      {/* Premium Animated Background - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/25 via-purple-400/20 to-cyan-400/25 rounded-full blur-3xl z-0"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/25 via-purple-400/20 to-pink-400/25 rounded-full blur-3xl z-0"
            animate={{ scale: [1.1, 0.9, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          {/* Central Radial Gradient */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:40px_40px]" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Premium Main Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-8 gradient-text-premium px-4 break-words"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {t.homeShowcase.title}
          {!isMobile && (
            <motion.div
              className="h-2 w-48 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto mt-6 shadow-lg"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          )}
        </motion.h2>

        {/* Premium Subheading */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 max-w-4xl mx-auto mb-20 leading-relaxed font-medium px-4 break-words"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
        >
          {t.homeShowcase.subtitle}
        </motion.p>

        {/* Premium Bullets Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-20 w-full max-w-5xl mx-auto">
          {bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative group"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:border-blue-200/70 px-10 py-8 text-xl font-medium text-gray-800 transition-all duration-500 overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${b.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />

                {/* Premium Border Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${b.bgGradient} blur-xl`} />
                </div>

                {/* Icon Container - Premium Design */}
                <motion.span
                  className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100/50 mb-6 mx-auto group-hover:border-blue-200/50 transition-all duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Icon Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-center">
                    {b.icon}
                  </div>
                </motion.span>

                <span className="relative z-10 flex-1 text-left block leading-relaxed">
                  {b.text}
                </span>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Premium CTA Button */}
        <motion.a
          href="#portfolio"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-block px-16 py-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xl shadow-2xl hover:shadow-premium-glow-xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-400/50 overflow-hidden group"
        >
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.9 }}
          />
          {/* Sparkle Effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-full h-full text-white/20" />
          </motion.div>
          
          <span className="relative z-10 flex items-center justify-center gap-3">
            {t.homeShowcase.cta}
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.span>
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default HomeShowcaseSection;
