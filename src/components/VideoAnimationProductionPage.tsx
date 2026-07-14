import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaMagic, FaPaintBrush, FaBullhorn, FaGraduationCap, FaShoppingCart, FaMobileAlt, FaSyncAlt, FaPhoneAlt, FaChevronLeft, FaChevronRight, FaCheckCircle, FaPlayCircle, FaQuoteRight } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
// import reelLottie from '../assets/lottie-reel.json';
const reelLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import video2Img from '../assets/video2.jpg';
import video3Img from '../assets/video3.jpg';
import video4Img from '../assets/video4.jpg';
import videoImg from '../assets/video.jpg';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

const icons = [
  <FaVideo className="text-blue-500 text-3xl" />,
  <FaMagic className="text-purple-500 text-3xl" />,
  <FaPaintBrush className="text-pink-500 text-3xl" />,
  <FaBullhorn className="text-cyan-500 text-3xl" />,
  <FaGraduationCap className="text-green-500 text-3xl" />,
  <FaShoppingCart className="text-yellow-500 text-3xl" />,
  <FaMobileAlt className="text-blue-400 text-3xl" />,
  <FaSyncAlt className="text-purple-400 text-3xl" />,
];

const processIcons = [
  <FaPhoneAlt className="text-blue-500 text-2xl" />,
  <FaMagic className="text-purple-500 text-2xl" />,
  <FaVideo className="text-pink-500 text-2xl" />,
  <FaPaintBrush className="text-cyan-500 text-2xl" />,
  <FaSyncAlt className="text-green-500 text-2xl" />,
];

export default function VideoAnimationProductionPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [typed, setTyped] = useState('');
  const [currentPortfolio, setCurrentPortfolio] = useState(0);
  const isMobile = useIsMobile();
  
  const offers = useMemo(() => 
    t.services.pages.videoAnimationProduction.offers.items.map((item, idx) => ({
      icon: icons[idx],
      title: item.title
    })), [t]);
  
  const process = useMemo(() =>
    t.services.pages.videoAnimationProduction.process.items.map((item, idx) => ({
      icon: processIcons[idx],
      title: item.title
    })), [t]);
  
  const whyUs = useMemo(() =>
    t.services.pages.videoAnimationProduction.whyUs.items, [t]);
  
  const portfolio = useMemo(() =>
    t.services.pages.videoAnimationProduction.portfolio.items.map((item, idx) => {
      const images = [videoImg, video2Img, video3Img, video4Img, videoImg, video2Img, video3Img, video4Img, videoImg];
      return {
        thumb: images[idx % images.length],
        title: item.title,
        desc: item.desc,
        url: 'https://www.youtube.com/watch?v=' + (idx + 1),
      };
    }), [t]);
  
  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  
  // Typing effect για το hero subtitle
  useEffect(() => {
    const full = t.services.pages.videoAnimationProduction.hero.subtitle;
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [language, t]);
  return (
    <div className="bg-gradient-to-br from-ink via-ink-800 to-ink-800 min-h-screen text-paper font-sans">
      {/* Hero Section */}
      <section className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden ${isMobile ? 'bg-iris/10' : ''}`}>
        {/* Σε mobile: χωρίς motion/animation, διαφορετικό background */}
        {isMobile ? (
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide text-purple-900">{t.services.pages.videoAnimationProduction.hero.title}</h1>
            <p className="text-lg md:text-2xl text-purple-700 mb-10 font-medium">{t.services.pages.videoAnimationProduction.hero.subtitle}</p>
            <a href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-400 text-white rounded-full font-bold text-lg shadow-3xl hover:from-purple-700 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2">{t.services.pages.videoAnimationProduction.hero.contact}</a>
          </div>
        ) : (
          // ... existing desktop hero ...
          <>
            {/* (κρατάω το motion/animation μόνο για desktop) */}
            {/* Animated Background Gradients/Particles */}
            <motion.div className="absolute inset-0 z-0 pointer-events-none">
              <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/[0.06] rounded-full blur-3xl" animate={{ y: [0, -20, 0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/[0.06] rounded-full blur-3xl" animate={{ y: [0, 30, 0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
              {/* Decorative images */}
              <motion.img src={video2Img} alt="Video 2" className="absolute top-10 right-32 w-40 h-28 object-cover rounded-2xl shadow-xl opacity-70" animate={{ y: [0, 12, 0, -12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.img src={video3Img} alt="Video 3" className="absolute bottom-10 left-32 w-40 h-28 object-cover rounded-2xl shadow-xl opacity-70" animate={{ y: [0, -12, 0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
            </motion.div>
            {/* HERO CONTENT SPLIT LAYOUT */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 w-full flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Left: Text */}
              <motion.div className="flex-1 flex flex-col items-start md:items-start text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
                  {t.services.pages.videoAnimationProduction.hero.title}
                </motion.h1>
                <motion.p className="text-lg md:text-2xl text-paper-dim mb-10 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  {t.services.pages.videoAnimationProduction.hero.subtitle}
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { window.location.href = '/contactme'; }}
                  >
                    <span className="relative z-10">{t.services.pages.videoAnimationProduction.hero.cta}</span>
                  </motion.button>
                  <motion.button
                    className="inline-block px-10 py-4 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const section = document.getElementById('project-examples-section');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="relative z-10">{t.services.pages.videoAnimationProduction.hero.viewExamples}</span>
                  </motion.button>
                </div>
              </motion.div>
              {/* Right: Decorative Video Image */}
              <motion.div
                className="flex-1 flex items-center justify-center w-full md:w-auto mt-12 md:mt-0"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.img
                  src={video2Img}
                  alt="Video Hero"
                  className="w-[320px] h-[220px] md:w-[400px] md:h-[320px] object-cover rounded-3xl shadow-2xl border-4 border-white/10/60 bg-white/[0.045]"
                  animate={{ y: [0, -18, 0, 18, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 8px 48px 0 rgba(80,80,200,0.13)' }}
                />
              </motion.div>
            </div>
          </>
        )}
      </section>

      {/* What We Offer */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-gray-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        )}
        <div className="relative z-10">
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.videoAnimationProduction.offers.title}</motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {offers.map((o, idx) => (
              <motion.div key={idx} className="group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}>
                {/* Animated Gradient Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-iris/20 to-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-white/15">{o.icon}</div>
                <h4 className="relative z-10 text-xl font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{o.title}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Production Process */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/20 via-blue-400/15 to-gray-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1.1, 0.9, 1.1],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        )}
        <div className="relative z-10">
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.videoAnimationProduction.process.title}</motion.h2>
          <motion.div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {process.map((step, idx) => (
              <motion.div key={idx} className="group relative flex flex-col items-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-iris/20 to-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-white/15">{step.icon}</div>
                <h4 className="relative z-10 text-base font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{step.title}</h4>
                {idx < process.length - 1 && <div className="relative z-10 w-1 h-10 bg-gradient-to-b from-iris/30 to-gray-200 mx-auto my-2 rounded-full" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        )}
        <div className="relative z-10">
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.videoAnimationProduction.whyUs.title}</motion.h2>
          <motion.ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }}>
            {whyUs.map((w, idx) => (
              <motion.li key={idx} className="group relative flex items-center gap-4 bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 text-lg font-medium text-paper hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02, y: -4 }} viewport={{ once: true }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <FaCheckCircle className="relative z-10 text-green-500 text-2xl flex-shrink-0" />
                <span className="relative z-10">{w}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section id="project-examples-section" className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-gray-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        )}
        <div className="relative z-10">
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.videoAnimationProduction.portfolio.title}</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {portfolio.map((item, idx) => (
              <motion.div key={idx} className="group relative flex flex-col items-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.02, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <img src={item.thumb} alt={item.title} className="relative z-10 rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
                <h4 className="relative z-10 text-lg font-bold text-paper mb-2">{item.title}</h4>
                <p className="relative z-10 text-paper-dim text-base text-center">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-gray-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
          </>
        )}
        <div className="relative z-10 w-full max-w-4xl">
          <motion.div className="relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-12 flex flex-col items-center hover:shadow-2xl transition-all duration-500 overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {/* Animated Gradient Background on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-gray-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight gradient-text-premium">{t.services.pages.videoAnimationProduction.finalCta.title}</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-gray-400 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.videoAnimationProduction.finalCta.button}</span></motion.button>
                <motion.a href="tel:+306971982563" className="inline-block px-10 py-4 bg-gradient-to-r from-gray-400 to-blue-600 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-gray-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)}><FaPhoneAlt className="mr-2" />{t.services.pages.videoAnimationProduction.finalCta.callUs}</motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 