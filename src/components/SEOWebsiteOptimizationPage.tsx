import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChartLine, FaCogs, FaTags, FaGoogle, FaChartBar, FaClipboardCheck, FaStar, FaCheckCircle, FaRocket, FaRegFileAlt, FaUserTie, FaRegEnvelope } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
// import seoLottie from '../assets/lottie-seo.json';
const seoLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

// Icon arrays
const serviceIcons = [
  <FaRegFileAlt className="text-blue-500 text-3xl" />,
  <FaCogs className="text-purple-500 text-3xl" />,
  <FaTags className="text-green-500 text-3xl" />,
  <FaChartBar className="text-pink-500 text-3xl" />,
  <FaGoogle className="text-yellow-500 text-3xl" />,
  <FaClipboardCheck className="text-cyan-500 text-3xl" />,
  <FaChartLine className="text-blue-400 text-3xl" />,
];

// Same icons as serviceIcons, as components so the phone list can size them
const serviceIconTypes = [FaRegFileAlt, FaCogs, FaTags, FaChartBar, FaGoogle, FaClipboardCheck, FaChartLine];

// What we measure (traffic, keywords, Core Web Vitals, enquiries) and how progress is reported
const measureIconTypes = [FaChartLine, FaTags, FaRocket, FaRegEnvelope];
const reportIconTypes = [FaClipboardCheck, FaGoogle, FaRegFileAlt, FaCheckCircle];
const iconColors = ['text-blue-500', 'text-green-500', 'text-yellow-500', 'text-pink-500'];

const workflowIcons = [
  <FaCheckCircle className="text-blue-500 text-2xl" />,
  <FaRegFileAlt className="text-blue-400 text-2xl" />,
  <FaCogs className="text-purple-500 text-2xl" />,
  <FaChartLine className="text-green-500 text-2xl" />,
];

export default function SEOWebsiteOptimizationPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [typed, setTyped] = useState('');

  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  
  // Typing effect για το hero
  useEffect(() => {
    const full = t.services.pages.seoWebsiteOptimization.hero.title;
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [t.services.pages.seoWebsiteOptimization.hero.title]);

  // Services array with useMemo
  const services = useMemo(() =>
    t.services.pages.seoWebsiteOptimization.services.items.map((item, idx) => ({
      icon: serviceIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const measure = t.services.pages.seoWebsiteOptimization.measure.items;
  const reporting = t.services.pages.seoWebsiteOptimization.reporting.items;

  // Workflow array with useMemo
  const workflow = useMemo(() =>
    t.services.pages.seoWebsiteOptimization.workflow.items.map((item, idx) => ({
      icon: workflowIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  // Phones (< 768px): compact layout. Desktop/tablet JSX below is untouched.
  if (isMobile) {
    const p = t.services.pages.seoWebsiteOptimization;
    const heading = 'mb-6 text-center text-[26px] font-extrabold leading-tight tracking-tight gradient-text-premium';
    const cta = 'flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-iris px-6 text-center text-base font-bold leading-tight text-white shadow-[0_10px_30px_-12px_rgba(59,130,246,0.8)] transition-transform active:scale-[0.98]';
    return (
      <div className="bg-gradient-to-br from-ink via-ink-800 to-iris/10 min-h-screen text-paper font-sans">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-yellow-300/10 via-ink-800 to-ink-800">
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-yellow-300/25 via-blue-400/20 to-transparent blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-400/25 via-yellow-200/15 to-transparent blur-3xl" />
          <motion.div className="relative z-10 px-4 pb-12 pt-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-[2rem] font-extrabold leading-[1.12] tracking-tight text-transparent" style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
              <span className="sr-only">{t.services.pages.seoWebsiteOptimization.hero.title}</span>
              <span aria-hidden="true">{typed}</span>
            </h1>
            <p className="mb-7 text-base leading-relaxed text-paper-dim">{p.hero.subtitle}</p>
            <a href="/contact" className={cta}>{p.hero.cta}</a>
          </motion.div>
        </section>

        {/* SEO Υπηρεσίες */}
        <section className="px-4 py-12">
          <h2 className={heading}>{p.services.title}</h2>
          <ul className="card-ink divide-y divide-[var(--line)] overflow-hidden">
            {services.map((s, idx) => {
              const Icon = serviceIconTypes[idx] ?? FaChartLine;
              return (
                <li key={s.title} className="flex items-start gap-3.5 px-4 py-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white shadow-[0_6px_18px_-8px_rgba(110,86,248,0.7)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{s.title}</h3>
                    <p className="mt-0.5 text-sm leading-snug text-paper-dim">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Τι μετράμε: icons, no promised numbers */}
        <section className="px-4 py-12">
          <h2 className="mb-3 text-center text-[26px] font-extrabold leading-tight tracking-tight gradient-text-premium">{p.measure.title}</h2>
          <p className="mb-6 text-center text-[15px] leading-relaxed text-paper-dim">{p.measure.subtitle}</p>
          <div className="card-ink overflow-hidden">
            <ul className="divide-y divide-[var(--line)]">
              {measure.map((m, idx) => {
                const Icon = measureIconTypes[idx] ?? FaChartLine;
                return (
                  <li key={m.title} className="flex items-start gap-3.5 px-4 py-4">
                    <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white shadow-[0_6px_18px_-8px_rgba(110,86,248,0.7)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{m.title}</h3>
                      <p className="mt-0.5 text-sm leading-snug text-paper-dim">{m.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* Decorative trend line, no values */}
            <div className="border-t border-[var(--line)] px-4 py-4">
              <h3 className="text-sm font-semibold text-iris-bright">{p.measure.chartTitle}</h3>
              <svg className="mt-3 h-16 w-full" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="seoMobileArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="0,100 50,90 100,80 150,60 200,40 250,30 300,20 350,10 400,8 400,120 0,120" fill="url(#seoMobileArea)" />
                <polyline points="0,100 50,90 100,80 150,60 200,40 250,30 300,20 350,10 400,8" stroke="#3b82f6" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </section>

        {/* Πώς βλέπετε την πρόοδο */}
        <section className="px-4 py-12">
          <h2 className={heading}>{p.reporting.title}</h2>
          <ul className="card-ink divide-y divide-[var(--line)] overflow-hidden">
            {reporting.map((r, idx) => {
              const Icon = reportIconTypes[idx] ?? FaCheckCircle;
              return (
                <li key={r.title} className="flex items-start gap-3.5 px-4 py-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white shadow-[0_6px_18px_-8px_rgba(110,86,248,0.7)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{r.title}</h3>
                    <p className="mt-0.5 text-sm leading-snug text-paper-dim">{r.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Πως δουλεύουμε */}
        <section className="px-4 py-12">
          <h2 className={heading}>{p.workflow.title}</h2>
          <ol>
            {workflow.map((step, idx) => (
              <li key={step.title} className="relative flex gap-3.5 pb-5 last:pb-0">
                {idx < workflow.length - 1 && (
                  <span aria-hidden="true" className="absolute bottom-1 left-4 top-9 w-px -translate-x-1/2 bg-gradient-to-b from-iris/60 to-iris/10" />
                )}
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-iris-bright to-iris-deep text-sm font-bold text-white">{idx + 1}</span>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="font-semibold leading-snug text-paper">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-snug text-paper-dim">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Τελικό CTA */}
        <section className="px-4 pb-14 pt-2">
          <div className="card-ink p-6 text-center">
            <h2 className="mb-5 text-2xl font-extrabold leading-tight tracking-tight gradient-text-premium">{p.finalCta.title}</h2>
            <a href="/contact" className={cta}>{p.finalCta.button}</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-ink via-ink-800 to-iris/10 min-h-screen text-paper font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none bg-gradient-to-br from-yellow-50 via-ink-800 to-ink-800">
        {/* Animated Background Gradients/Particles */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-yellow-300/40 via-blue-400/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-blue-400/40 via-yellow-200/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/[0.06] rounded-full blur-3xl" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/[0.06] rounded-full blur-3xl" animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          {/* Floating SEO keywords */}
          {['SEO', 'Google', '1η Σελίδα', 'Keywords', 'Analytics', 'On-Page', 'Backlinks', 'Content', 'Ranking', 'Organic'].map((kw, i) => (
            <motion.div
              key={kw}
              className="absolute z-10 hidden opacity-20 text-2xl font-bold text-blue-400 lg:block"
              style={{
                top: `${10 + 60 * Math.sin((i / 10) * 2 * Math.PI)}%`,
                left: `${10 + 80 * Math.cos((i / 10) * 2 * Math.PI)}%`,
                filter: 'drop-shadow(0 4px 24px rgba(80,80,200,0.10))',
              }}
              animate={{ y: [0, i % 2 === 0 ? 20 : -20, 0] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {kw}
            </motion.div>
          ))}
        </motion.div>
        {/* HERO CONTENT SPLIT LAYOUT */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Text */}
          <motion.div className="flex-1 flex flex-col items-start md:items-start text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-yellow-500 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
              <span className="sr-only">{t.services.pages.seoWebsiteOptimization.hero.title}</span>
              <span aria-hidden="true">{typed}</span>
            </motion.h1>
            <motion.p className="text-lg md:text-2xl text-paper-dim mb-10 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {t.services.pages.seoWebsiteOptimization.hero.subtitle}
            </motion.p>
            <motion.button
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-yellow-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { window.location.href = '/contact'; }}
            >
              <span className="relative z-10">{t.services.pages.seoWebsiteOptimization.hero.cta}</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SEO Υπηρεσίες */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.seoWebsiteOptimization.services.title}</motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {services.map((s, idx) => (
              <motion.div key={s.title} className="group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}>
                {/* Animated Gradient Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
                <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-iris/20 to-ink-800 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-blue-300">{s.icon}</div>
                <h4 className="relative z-10 text-xl font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{s.title}</h4>
                <p className="relative z-10 text-paper-dim mb-6 text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Μετρήσιμα Αποτελέσματα */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-blue-400/15 to-purple-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.seoWebsiteOptimization.measure.title}</motion.h2>
          <p className="text-lg md:text-xl text-paper-dim text-center max-w-3xl mx-auto mb-12 leading-relaxed">{t.services.pages.seoWebsiteOptimization.measure.subtitle}</p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {measure.map((m, idx) => {
              const Icon = measureIconTypes[idx] ?? FaChartLine;
              return (
              <motion.div key={m.title} className="group relative flex flex-col items-center text-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.04, y: -8, boxShadow: '0 8px 32px 0 #60a5fa' }} viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.1 }} onMouseEnter={() => playSound(hoverSfx)}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-iris/20 to-ink-800 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-blue-300"><Icon className={`${iconColors[idx]} text-4xl`} /></div>
                <h3 className="relative z-10 text-xl font-bold text-paper mb-2 tracking-tight">{m.title}</h3>
                <p className="relative z-10 text-paper-dim text-base leading-relaxed">{m.desc}</p>
              </motion.div>
              );
            })}
          </motion.div>
          {/* Decorative trend line, no values */}
          <motion.div className="relative w-full max-w-2xl mx-auto bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 md:p-8 flex flex-col items-center mb-8 hover:shadow-2xl transition-all duration-500 overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <motion.h3 className="text-lg font-bold text-iris-bright mb-4">{t.services.pages.seoWebsiteOptimization.measure.chartTitle}</motion.h3>
          <svg width="100%" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <motion.polyline
              points="0,100 50,90 100,80 150,60 200,40 250,30 300,20 350,10 400,8"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.circle cx="400" cy="8" r="7" fill="#3b82f6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5 }} />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Πώς βλέπετε την πρόοδο */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.seoWebsiteOptimization.reporting.title}</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reporting.map((r, idx) => {
              const Icon = reportIconTypes[idx] ?? FaCheckCircle;
              return (
              <motion.div key={r.title} className="group relative flex items-start gap-6 bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }}>
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-iris/20 to-ink-800 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-blue-300"><Icon className={`${iconColors[idx]} text-2xl`} /></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-paper mb-2 tracking-tight">{r.title}</h3>
                  <p className="text-paper-dim text-base leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ροή Εργασίας */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.seoWebsiteOptimization.workflow.title}</motion.h2>
          <motion.div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {workflow.map((step, idx) => (
              <motion.div key={step.title} className="group relative flex flex-col items-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-iris/20 to-ink-800 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-blue-300">{step.icon}</div>
                <h4 className="relative z-10 text-base font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{step.title}</h4>
                <p className="relative z-10 text-paper-dim mb-4 text-sm leading-relaxed">{step.desc}</p>
                {idx < workflow.length - 1 && <div className="relative z-10 w-1 h-10 bg-gradient-to-b from-iris/30 to-iris/15 mx-auto my-2 rounded-full" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Τελικό CTA */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight gradient-text-premium">{t.services.pages.seoWebsiteOptimization.finalCta.title}</h2>
              <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#60a5fa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #60a5fa', filter: 'brightness(1.1)', borderColor: '#60a5fa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contact'; }}><span className="relative z-10">{t.services.pages.seoWebsiteOptimization.finalCta.button}</span></motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 