import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGamepad, FaMobileAlt, FaVrCardboard, FaUsers, FaPenNib, FaCheckCircle, FaArrowRight, FaCogs, FaLayerGroup } from "react-icons/fa";
import { SiUnity, SiUnrealengine, SiGodotengine, SiBlender, SiAutodesk } from "react-icons/si";
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const heroImg = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80";

// Icon arrays
const serviceIcons = [
  <FaMobileAlt className="text-pink-400 text-4xl" />,
  <FaVrCardboard className="text-blue-400 text-4xl" />,
  <FaUsers className="text-green-400 text-4xl" />,
  <FaPenNib className="text-purple-400 text-4xl" />,
];

const techStack = [
  { icon: <SiUnity className="text-white text-3xl" />, name: "Unity" },
  { icon: <SiUnrealengine className="text-blue-400 text-3xl" />, name: "Unreal Engine" },
  { icon: <SiGodotengine className="text-cyan-400 text-3xl" />, name: "Godot" },
  { icon: <FaCogs className="text-purple-400 text-3xl" />, name: "C#" },
  { icon: <SiBlender className="text-orange-400 text-3xl" />, name: "Blender" },
  { icon: <FaLayerGroup className="text-pink-400 text-3xl" />, name: "Maya" },
];

export default function GameDevelopmentPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const [portfolioIdx, setPortfolioIdx] = useState(0);

  // Get game development translations with fallback
  const gameDev = t?.services?.pages?.gameDevelopment;

  // Services array with useMemo
  const services = useMemo(() =>
    (gameDev?.services?.items || []).map((item, idx) => ({
      icon: serviceIcons[idx] || serviceIcons[0],
      title: item.title || '',
      desc: item.desc || ''
    })), [gameDev]);

  // Process array with useMemo
  const process = useMemo(() =>
    gameDev?.process?.items || [], [gameDev]);

  // Portfolio array with useMemo
  const portfolio = useMemo(() =>
    (gameDev?.portfolio?.items || []).map((item, idx) => ({
      img: `/src/assets/game${idx + 1}.jpg`,
      title: item.title || '',
      desc: item.desc || ''
    })), [gameDev]);

  // Benefits array with useMemo
  const benefits = useMemo(() =>
    gameDev?.whyUs?.items || [], [gameDev]);
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Game Dev Hero" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/60 to-pink-800/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-32 text-center flex flex-col items-center">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide text-white" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>{gameDev?.hero?.title || 'Innovative Game Development Services'}</motion.h1>
          <motion.p className="text-lg md:text-2xl text-pink-200 mb-10 font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>{gameDev?.hero?.subtitle || 'Develop your next successful game with expertise, creativity, and cutting-edge technology.'}</motion.p>
          <motion.a href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-pink-600 to-blue-400 text-white rounded-full font-bold text-lg shadow-3xl hover:from-pink-700 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 animate-fade-in flex items-center gap-2" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #ec4899' }} whileTap={{ scale: 0.97 }}>{gameDev?.hero?.cta || 'Start Your Game Project'} <FaArrowRight className="ml-2 animate-bounce" /></motion.a>
          {/* Scroll indicator */}
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-6 h-10 border-2 border-pink-400/50 rounded-full flex justify-center">
              <motion.div className="w-1 h-3 bg-pink-400 rounded-full mt-2" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Overview */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-12 text-center tracking-wide" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.services?.title || 'Our Services'}</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {services.map((s, idx) => (
            <motion.div key={s.title} className="bg-white/5 rounded-3xl shadow-2xl border border-pink-900/30 backdrop-blur-xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.07 }} viewport={{ once: true }} whileHover={{ scale: 1.07 }}>{s.icon}<h4 className="text-lg font-bold text-pink-200 mb-2 mt-2">{s.title}</h4><p className="text-blue-100 text-base">{s.desc}</p></motion.div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.process?.title || 'Development Process'}</motion.h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
          {process.map((step, idx) => (
            <motion.div key={step.step} className="flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }} viewport={{ once: true }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-900 to-blue-900 flex items-center justify-center text-2xl font-bold text-white shadow-3xl mb-4 border border-pink-800">{idx + 1}</div>
              <span className="text-pink-200 font-semibold text-base mb-1 text-center">{step.step}</span>
              <span className="text-blue-100 text-sm text-center">{step.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies & Tools */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.technologies?.title || 'Technologies & Tools'}</motion.h2>
        <div className="flex flex-wrap justify-center gap-10">
          {techStack.map((t, idx) => (
            <motion.div key={t.name} className="flex flex-col items-center gap-2 group bg-white/5 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.1 }}>
              {t.icon}
              <span className="text-base text-pink-200 font-semibold mt-2">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.portfolio?.title || 'Portfolio Highlights'}</motion.h2>
        <div className="relative w-full max-w-2xl mx-auto mb-4">
          <AnimatePresence mode="wait">
            <motion.div key={portfolio[portfolioIdx].title} className="relative group rounded-3xl overflow-hidden shadow-3xl border border-pink-900/40" initial={{ opacity: 0, scale: 0.95, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: -40 }} transition={{ duration: 0.6 }}>
              <img src={portfolio[portfolioIdx].img} alt={portfolio[portfolioIdx].title} className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900/80 to-transparent p-6">
                <h4 className="text-lg font-bold text-white">{portfolio[portfolioIdx].title}</h4>
                <span className="text-pink-200 text-sm">{portfolio[portfolioIdx].desc}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Carousel controls */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button onClick={() => setPortfolioIdx((portfolioIdx - 1 + portfolio.length) % portfolio.length)} className="bg-white/10 rounded-full p-2 shadow-3xl hover:bg-pink-900/40 transition" aria-label="Previous"><FaArrowRight className="text-2xl rotate-180" /></button>
            <button onClick={() => setPortfolioIdx((portfolioIdx + 1) % portfolio.length)} className="bg-white/10 rounded-full p-2 shadow-3xl hover:bg-pink-900/40 transition" aria-label="Next"><FaArrowRight className="text-2xl" /></button>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">{portfolio.map((_, idx) => (<span key={idx} className={`w-2 h-2 rounded-full ${idx === portfolioIdx ? 'bg-pink-400' : 'bg-pink-900'} transition`}></span>))}</div>
        </div>
      </section>

      {/* Why Choose Us? */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.whyUs?.title || 'Why Choose Us?'}</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <motion.div key={b} className="flex items-center gap-4 bg-white/5 rounded-2xl shadow-xl border border-pink-900/30 p-6 mb-4 hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.04 }}>
              <FaCheckCircle className="text-green-400 text-2xl animate-pulse" />
              <span className="text-lg text-pink-200 font-semibold">{b}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto py-20 px-4 text-center">
        <motion.div className="rounded-3xl bg-gradient-to-br from-pink-900 via-blue-800 to-blue-400 shadow-3xl p-12 md:p-20 flex flex-col items-center relative overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <motion.h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 drop-shadow-lg">{gameDev?.finalCta?.title || 'Ready to build your next hit game?'}</motion.h2>
          <motion.p className="text-lg text-white/90 mb-8">{gameDev?.finalCta?.subtitle || 'Contact us to start your next gaming project.'}</motion.p>
          <motion.a href="/contact" className="px-12 py-6 bg-gradient-to-r from-pink-600 to-blue-400 text-white font-bold rounded-full shadow-3xl hover:from-pink-700 hover:to-blue-500 transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center gap-2" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>{gameDev?.finalCta?.button || 'Contact Us Today'} <FaArrowRight className="ml-2 animate-bounce" /></motion.a>
        </motion.div>
      </section>
    </div>
  );
} 