import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaMobileAlt, FaVrCardboard, FaUsers, FaPenNib, FaCheckCircle, FaArrowRight, FaCogs, FaLayerGroup, FaGlobe } from "react-icons/fa";
import { SiUnity, SiUnrealengine, SiGodotengine, SiBlender, SiAutodesk } from "react-icons/si";
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileRail from './ui/MobileRail';

const heroImg = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80";

// "Game types" (mobile, web/HTML5, VR/AR, multiplayer): stock photos as illustrations only, not client projects
const gameTypeImgs = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",   // retro arcade gear
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80", // lit keyboard
  "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=900&q=80", // VR headset
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80", // friends with controllers
];
const gameTypeIconTypes = [FaMobileAlt, FaGlobe, FaVrCardboard, FaUsers];

// Icon arrays
const serviceIcons = [
  <FaMobileAlt className="text-pink-400 text-4xl" />,
  <FaVrCardboard className="text-blue-400 text-4xl" />,
  <FaUsers className="text-green-400 text-4xl" />,
  <FaPenNib className="text-purple-400 text-4xl" />,
];

// Phones: same service icons as components, rendered small inside iris tiles
const serviceIconTypes = [FaMobileAlt, FaVrCardboard, FaUsers, FaPenNib];
const mH2 = "mb-6 text-center text-[26px] font-bold leading-tight text-pink-200";
const mReveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true } };

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
  const isMobile = useIsMobile();

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

  const gameTypes = useMemo(() =>
    (gameDev?.gameTypes?.items || []).map((item, idx) => ({
      img: gameTypeImgs[idx % gameTypeImgs.length],
      Icon: gameTypeIconTypes[idx] || FaGamepad,
      title: item.title || '',
      desc: item.desc || ''
    })), [gameDev]);

  // Benefits array with useMemo
  const benefits = useMemo(() =>
    gameDev?.whyUs?.items || [], [gameDev]);

  // Phones (< 768px): compact layout with the same texts and links; desktop/tablet JSX below is untouched
  if (isMobile) return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 min-h-screen text-white font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Game Dev Hero" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/60 to-pink-800/40" />
        <div className="relative z-10 px-4 pb-12 pt-14 text-center">
          <motion.h1 className="text-[30px] font-extrabold leading-[1.15] text-white drop-shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>{gameDev?.hero?.title || 'Innovative Game Development Services'}</motion.h1>
          <motion.p className="mt-4 text-base font-medium leading-relaxed text-pink-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>{gameDev?.hero?.subtitle || 'Develop your next successful game with expertise, creativity, and cutting-edge technology.'}</motion.p>
          <a href="/contact" className="btn-accent mt-7 min-h-12 w-full justify-center px-5 py-3 text-center text-base leading-snug">
            {gameDev?.hero?.cta || 'Start Your Game Project'} <FaArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Services: one list card */}
      <section className="px-4 py-12">
        <motion.h2 className={mH2} {...mReveal}>{gameDev?.services?.title || 'Our Services'}</motion.h2>
        <ul className="card-ink divide-y divide-[var(--line)]">
          {services.map((s, idx) => {
            const Icon = serviceIconTypes[idx] || serviceIconTypes[0];
            return (
              <li key={s.title} className="flex items-start gap-3.5 px-4 py-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{s.title}</h3>
                  <p className="mt-0.5 text-sm leading-snug text-paper-dim">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Process: vertical stepper */}
      <section className="px-4 py-12">
        <motion.h2 className={mH2} {...mReveal}>{gameDev?.process?.title || 'Development Process'}</motion.h2>
        <ol className="card-ink px-4 py-5">
          {process.map((step, idx) => (
            <li key={step.step} className="relative flex gap-4 pb-5 last:pb-0">
              {idx < process.length - 1 && <span aria-hidden="true" className="absolute bottom-1 left-4 top-9 w-px -translate-x-1/2 bg-[var(--line-strong)]" />}
              <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-iris-bright to-iris-deep text-sm font-bold text-white">{idx + 1}</span>
              <div className="min-w-0 pt-1">
                <h3 className="font-semibold leading-snug text-paper">{step.step}</h3>
                <p className="mt-0.5 text-sm leading-snug text-paper-dim">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Technologies: 3 column tiles */}
      <section className="px-4 py-12">
        <motion.h2 className={mH2} {...mReveal}>{gameDev?.technologies?.title || 'Technologies & Tools'}</motion.h2>
        <ul className="grid grid-cols-3 gap-2.5">
          {techStack.map((tech) => (
            <li key={tech.name} className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-[var(--line)] bg-white/[0.03] p-3 text-center">
              {tech.icon}
              <span className="text-xs leading-tight text-paper-dim">{tech.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Game types: swipe rail, illustrative images */}
      <section className="px-4 py-12">
        <motion.h2 className="mb-3 text-center text-[26px] font-bold leading-tight text-pink-200" {...mReveal}>{gameDev?.gameTypes?.title}</motion.h2>
        <p className="mb-6 text-center text-[15px] leading-relaxed text-paper-dim">{gameDev?.gameTypes?.subtitle}</p>
        <MobileRail label={gameDev?.gameTypes?.title || ''}>
          {gameTypes.map((g) => (
            <article key={g.title} className="card-ink h-full overflow-hidden">
              <img src={g.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="flex items-start gap-3.5 px-4 py-3.5">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white">
                  <g.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{g.title}</h3>
                  <p className="mt-0.5 text-sm leading-snug text-paper-dim">{g.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </MobileRail>
      </section>

      {/* Why us: one checklist card (long Greek words would overflow 2 columns at 320px) */}
      <section className="px-4 py-12">
        <motion.h2 className={mH2} {...mReveal}>{gameDev?.whyUs?.title || 'Why Choose Us?'}</motion.h2>
        <ul className="card-ink divide-y divide-[var(--line)]">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 px-4 py-3.5">
              <FaCheckCircle className="h-5 w-5 flex-shrink-0 text-signal" aria-hidden="true" />
              <span className="text-[15px] font-medium leading-snug text-paper">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-12 pt-4 text-center">
        <div className="flex flex-col items-center rounded-3xl bg-gradient-to-br from-pink-900 via-blue-800 to-blue-400 p-6 shadow-3xl">
          <h2 className="text-2xl font-extrabold leading-tight text-white drop-shadow-lg">{gameDev?.finalCta?.title || 'Ready to build your next hit game?'}</h2>
          <p className="mt-3 text-base leading-relaxed text-white/90">{gameDev?.finalCta?.subtitle || 'Contact us to start your next gaming project.'}</p>
          <a href="/contact" className="btn-accent mt-6 min-h-12 w-full justify-center px-5 py-3 text-center text-base leading-snug">
            {gameDev?.finalCta?.button || 'Contact Us Today'} <FaArrowRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );

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

      {/* Game types: illustrative images, not finished client projects */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-pink-200 mb-4 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>{gameDev?.gameTypes?.title}</motion.h2>
        <p className="text-lg text-blue-100 mb-12 text-center max-w-2xl mx-auto">{gameDev?.gameTypes?.subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gameTypes.map((g, idx) => (
            <motion.div key={g.title} className="group bg-white/5 rounded-3xl shadow-2xl border border-pink-900/30 backdrop-blur-xl overflow-hidden flex flex-col hover:shadow-3xl transition-all duration-300" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.08 }} viewport={{ once: true }} whileHover={{ y: -6 }}>
              <div className="relative h-40 overflow-hidden">
                <img src={g.img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-600 to-blue-500 text-white shadow-lg">
                  <g.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-pink-200 mb-2">{g.title}</h3>
                <p className="text-blue-100 text-base">{g.desc}</p>
              </div>
            </motion.div>
          ))}
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