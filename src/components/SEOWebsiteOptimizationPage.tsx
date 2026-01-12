import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChartLine, FaCogs, FaTags, FaGoogle, FaChartBar, FaClipboardCheck, FaStar, FaChevronLeft, FaChevronRight, FaCheckCircle, FaRocket, FaRegFileAlt, FaUserTie } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
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

const statIcons = [
  <FaRocket className="text-blue-500 text-4xl" />,
  <FaGoogle className="text-yellow-500 text-4xl" />,
  <FaTags className="text-green-500 text-4xl" />,
];

const workflowIcons = [
  <FaCheckCircle className="text-blue-500 text-2xl" />,
  <FaRegFileAlt className="text-blue-400 text-2xl" />,
  <FaCogs className="text-purple-500 text-2xl" />,
  <FaChartLine className="text-green-500 text-2xl" />,
];

export default function SEOWebsiteOptimizationPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [typed, setTyped] = useState('');
  const [currentCase, setCurrentCase] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0]);
  
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

  // Stats array with useMemo
  const stats = useMemo(() =>
    t.services.pages.seoWebsiteOptimization.stats.items.map((item, idx) => ({
      icon: statIcons[idx],
      value: item.value,
      suffix: item.suffix,
      label: item.label,
      desc: item.desc
    })), [t]);

  // Workflow array with useMemo
  const workflow = useMemo(() =>
    t.services.pages.seoWebsiteOptimization.workflow.items.map((item, idx) => ({
      icon: workflowIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  // CaseStudies array with useMemo
  const caseStudies = useMemo(() =>
    t.services.pages.seoWebsiteOptimization.caseStudies.items, [t]);
  // Animated counters
  useEffect(() => {
    const targets = [300, 1, 120];
    const delays = [0, 400, 800];
    targets.forEach((target, idx) => {
      setTimeout(() => {
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const interval = setInterval(() => {
          current += step;
          if ((idx === 1 && current <= target) || (idx !== 1 && current >= target)) {
            setCounters(prev => prev.map((v, i) => i === idx ? target : v));
            clearInterval(interval);
          } else {
            setCounters(prev => prev.map((v, i) => i === idx ? current : v));
          }
        }, 30);
      }, delays[idx]);
    });
  }, []);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        {/* Animated Background Gradients/Particles */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-yellow-300/40 via-blue-400/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-blue-400/40 via-yellow-200/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          {/* Floating SEO keywords */}
          {['SEO', 'Google', '1η Σελίδα', 'Keywords', 'Analytics', 'On-Page', 'Backlinks', 'Content', 'Ranking', 'Organic'].map((kw, i) => (
            <motion.div
              key={kw}
              className="absolute z-10 opacity-20 text-lg md:text-2xl font-bold text-blue-400"
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
              {typed}
            </motion.h1>
            <motion.p className="text-lg md:text-2xl text-gray-700 mb-10 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {t.services.pages.seoWebsiteOptimization.hero.subtitle}
            </motion.p>
            <motion.button
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-yellow-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { window.location.href = '/contactme'; }}
            >
              <span className="relative z-10">{t.services.pages.seoWebsiteOptimization.hero.cta}</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SEO Υπηρεσίες */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.seoWebsiteOptimization.services.title}</motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {services.map((s, idx) => (
            <motion.div key={s.title} className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-100/40 p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 relative overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}><div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-blue-300">{s.icon}</div><h4 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 tracking-tight">{s.title}</h4><p className="text-gray-600 mb-6 text-base leading-relaxed">{s.desc}</p><motion.div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-blue-400 group-focus:border-blue-400 transition-all duration-300" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} /></motion.div>
          ))}
        </motion.div>
      </section>

      {/* Μετρήσιμα Αποτελέσματα */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.seoWebsiteOptimization.stats.title}</motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {stats.map((s, idx) => (
            <motion.div key={s.label} className="flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/40 p-12 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.09, boxShadow: '0 8px 32px 0 #60a5fa' }} viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.1 }} onMouseEnter={() => playSound(hoverSfx)}>
              <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-blue-300">{s.icon}</div>
              <span className="text-4xl font-extrabold text-blue-700 mb-2 animate-pulse">{idx === 1 ? counters[idx] + 'η' : '+' + counters[idx]}{idx === 2 ? '' : ''}</span>
              <span className="text-blue-900 font-semibold text-lg text-center tracking-tight">{s.desc}</span>
            </motion.div>
          ))}
        </motion.div>
        {/* Animated Line Chart (mockup) */}
        <motion.div className="w-full max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center mb-8 border border-blue-100/40">
          <motion.h3 className="text-lg font-bold text-blue-700 mb-4">{t.services.pages.seoWebsiteOptimization.stats.chartTitle}</motion.h3>
          <svg width="100%" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </section>

      {/* Case Study / Example */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.seoWebsiteOptimization.caseStudies.title}</motion.h2>
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 z-10 p-3 bg-white/80 rounded-full shadow hover:bg-blue-100 transition-all" onClick={() => setCurrentCase((currentCase - 1 + caseStudies.length) % caseStudies.length)}><FaChevronLeft className="text-blue-500 text-2xl" /></button>
          <motion.div className="w-full max-w-lg mx-auto group bg-white/90 rounded-3xl shadow-2xl border border-blue-100/40 overflow-hidden flex flex-col hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200" key={caseStudies[currentCase].label} initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-8">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-blue-500 transition-colors duration-300 tracking-tight">{caseStudies[currentCase].label}</h4>
                <p className="text-gray-700 text-base mb-4 flex-1 leading-relaxed">{caseStudies[currentCase].desc}</p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <span className="text-sm text-blue-700 font-semibold">{caseStudies[currentCase].beforeLabel}</span>
                  <span className="text-2xl font-bold text-blue-400">{caseStudies[currentCase].before}</span>
                  <span className="text-sm text-blue-700 font-semibold">{caseStudies[currentCase].afterLabel}</span>
                  <span className="text-2xl font-bold text-green-500">{caseStudies[currentCase].after}</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" stroke="#e0e7ef" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="60" cy="60" r="54" stroke="#3b82f6" strokeWidth="8" fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
          <button className="absolute right-0 z-10 p-3 bg-white/80 rounded-full shadow hover:bg-blue-100 transition-all" onClick={() => setCurrentCase((currentCase + 1) % caseStudies.length)}><FaChevronRight className="text-blue-500 text-2xl" /></button>
        </div>
      </section>

      {/* Ροή Εργασίας */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.seoWebsiteOptimization.workflow.title}</motion.h2>
        <motion.div className="flex flex-col md:flex-row justify-center items-center gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {workflow.map((step, idx) => (
            <motion.div key={step.title} className="flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/40 p-10 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}><div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-blue-300">{step.icon}</div><h4 className="text-base font-bold text-blue-900 mb-2 group-hover:text-blue-500 transition-colors duration-300 tracking-tight">{step.title}</h4><p className="text-gray-600 mb-4 text-sm leading-relaxed">{step.desc}</p>{idx < workflow.length - 1 && <div className="w-1 h-10 bg-gradient-to-b from-blue-300 to-blue-200 mx-auto my-2 rounded-full" />}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* Τελικό CTA */}
      <section className="max-w-7xl mx-auto py-24 px-4 flex flex-col items-center text-center">
        <motion.div className="relative bg-gradient-to-br from-blue-100 via-white to-blue-200/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-12 flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">{t.services.pages.seoWebsiteOptimization.finalCta.title}</h2>
          <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#60a5fa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #60a5fa', filter: 'brightness(1.1)', borderColor: '#60a5fa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.seoWebsiteOptimization.finalCta.button}</span></motion.button>
        </motion.div>
      </section>
    </div>
  );
} 