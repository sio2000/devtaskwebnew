import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaBrain, FaMagic, FaCogs, FaUserFriends, FaChevronLeft, FaChevronRight, FaPython, FaDatabase, FaCodeBranch, FaRegLightbulb, FaCheckCircle, FaShoppingCart, FaHeadset, FaPenNib } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiOpenai, SiLangchain, SiFlask, SiDjango, SiGraphql } from 'react-icons/si';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import Reveal from './ui/Reveal';
// import aiLottie from '../assets/lottie-ai.json';
const aiLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
// Εισαγωγές εικόνων/εικονιδίων αν χρειάζεται
import aiImg from '../assets/AI.webp';
import codeImg from '../assets/code.webp';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

// Icon arrays
const serviceIcons = [
  <FaChartLine className="text-blue-500 text-3xl" />,
  <FaMagic className="text-purple-500 text-3xl" />,
  <FaBrain className="text-pink-500 text-3xl" />,
  <FaRegLightbulb className="text-yellow-500 text-3xl" />,
  <FaUserFriends className="text-green-500 text-3xl" />,
  <FaRobot className="text-cyan-500 text-3xl" />,
];

// Same icons as components, so the phone list can size/colour them itself
const serviceIconTypes = [FaChartLine, FaMagic, FaBrain, FaRegLightbulb, FaUserFriends, FaRobot];

const workflowIcons = [
  <FaCheckCircle className="text-blue-500 text-2xl" />,
  <FaDatabase className="text-green-500 text-2xl" />,
  <FaBrain className="text-purple-500 text-2xl" />,
  <FaMagic className="text-pink-500 text-2xl" />,
  <FaCogs className="text-cyan-500 text-2xl" />,
  <FaChartLine className="text-blue-400 text-2xl" />,
];

// Use cases (e-shop, support, content, internal processes): what AI can do, not past client results
const useCaseIconTypes = [FaShoppingCart, FaHeadset, FaPenNib, FaCogs];
const useCaseColors = ['text-blue-500', 'text-green-500', 'text-pink-500', 'text-cyan-500'];

// Tech tabs icons (static, not translated)
const techTabsIcons = [
  [
    { icon: <SiTensorflow className="text-yellow-500 text-4xl" />, name: 'TensorFlow' },
    { icon: <SiPytorch className="text-red-500 text-4xl" />, name: 'PyTorch' },
    { icon: <SiOpenai className="text-blue-500 text-4xl" />, name: 'OpenAI' },
    { icon: <SiLangchain className="text-purple-500 text-4xl" />, name: 'LangChain' },
  ],
  [
    { icon: <FaPython className="text-blue-400 text-4xl" />, name: 'Python' },
    { icon: <SiFlask className="text-paper-dim text-4xl" />, name: 'Flask' },
    { icon: <SiDjango className="text-green-400 text-4xl" />, name: 'Django' },
    { icon: <FaDatabase className="text-iris-bright text-4xl" />, name: 'Databases' },
  ],
  [
    { icon: <FaCodeBranch className="text-pink-500 text-4xl" />, name: 'REST' },
    { icon: <SiGraphql className="text-purple-500 text-4xl" />, name: 'GraphQL' },
  ]
];

export default function AIIntegrationApplicationsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [typed, setTyped] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  
  // Typing effect για το hero
  useEffect(() => {
    const full = t.services.pages.aiIntegrationApplications.hero.title;
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [t.services.pages.aiIntegrationApplications.hero.title]);

  // Services array with useMemo
  const services = useMemo(() =>
    t.services.pages.aiIntegrationApplications.services.items.map((item, idx) => ({
      icon: serviceIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  // TechTabs array with useMemo
  const techTabs = useMemo(() =>
    t.services.pages.aiIntegrationApplications.technologies.tabs.map((tab, idx) => ({
      label: tab.label,
      icons: techTabsIcons[idx]
    })), [t]);

  // Workflow array with useMemo
  const workflow = useMemo(() =>
    t.services.pages.aiIntegrationApplications.workflow.items.map((item, idx) => ({
      icon: workflowIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const useCases = t.services.pages.aiIntegrationApplications.useCases.items;

  // Phones: compact single-column layout with the same text; desktop/tablet render below untouched
  if (isMobile) {
    const p = t.services.pages.aiIntegrationApplications;
    const sectionTitle = 'text-3xl font-extrabold mb-6 text-center gradient-text-premium';
    return (
      <div className="bg-gradient-to-br from-ink via-ink-800 to-ink-800 min-h-screen text-paper font-sans">
        {/* Hero */}
        <section className="relative overflow-hidden select-none bg-gradient-to-br from-ink-800 via-ink-800 to-ink-800">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-ink/0 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/30 via-blue-400/20 to-ink/0 blur-3xl" />
          </div>
          <motion.div className="relative z-10 px-4 pt-10 pb-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-4 text-[34px] font-extrabold leading-[1.12] tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
              {p.hero.title}
            </h1>
            <p className="mb-7 text-[17px] font-medium leading-relaxed text-paper-dim">{p.hero.subtitle}</p>
            <a href="/contact" className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-iris text-base font-bold text-white shadow-[0_10px_30px_-12px_rgba(110,86,248,0.8)] transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {p.hero.cta}
            </a>
            <img src={aiImg} alt="AI Hero" className="mt-8 aspect-[21/9] w-full rounded-2xl border border-white/10 object-cover" />
          </motion.div>
        </section>

        {/* AI Υπηρεσίες */}
        <section className="px-4 py-12">
          <Reveal as="h2" className={sectionTitle}>{p.services.title}</Reveal>
          <Reveal as="ul" className="card-ink divide-y divide-[var(--line)] overflow-hidden">
            {services.map((s, idx) => {
              const Icon = serviceIconTypes[idx] ?? FaRobot;
              return (
                <li key={idx} className="flex items-start gap-3.5 px-4 py-4">
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
          </Reveal>
        </section>

        {/* Τεχνολογίες & Πλατφόρμες: all tabs shown at once as grouped chips */}
        <section className="px-4 py-12">
          <Reveal as="h2" className={sectionTitle}>{p.technologies.title}</Reveal>
          <Reveal className="card-ink divide-y divide-[var(--line)] overflow-hidden">
            {techTabs.map((tab) => (
              <div key={tab.label} className="px-4 py-4">
                <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper-muted">{tab.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {tab.icons.map((tech) => (
                    <li key={tech.name} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium text-paper">
                      <span className="flex [&>svg]:h-4 [&>svg]:w-4" aria-hidden="true">{tech.icon}</span>
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Πώς Εργάζομαι: vertical stepper */}
        <section className="px-4 py-12">
          <Reveal as="h2" className={sectionTitle}>{p.workflow.title}</Reveal>
          <Reveal as="ol" className="px-1">
            {workflow.map((step, idx) => (
              <li key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                {idx < workflow.length - 1 && (
                  <span className="absolute left-4 top-10 bottom-1 w-px -translate-x-1/2 bg-gradient-to-b from-iris/60 to-iris/10" aria-hidden="true" />
                )}
                <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-iris-bright to-iris-deep font-display text-sm font-bold text-white">{idx + 1}</span>
                <div className="min-w-0 pt-1">
                  <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-snug text-paper-dim">{step.desc}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </section>

        {/* Παραδείγματα χρήσης */}
        <section className="px-4 py-12">
          <Reveal as="h2" className="text-3xl font-extrabold mb-2 text-center gradient-text-premium">{p.useCases.title}</Reveal>
          <p className="mb-6 text-center text-[15px] font-semibold text-blue-400">{p.useCases.subtitle}</p>
          <Reveal as="ul" className="card-ink divide-y divide-[var(--line)] overflow-hidden">
            {useCases.map((u, idx) => {
              const Icon = useCaseIconTypes[idx] ?? FaRobot;
              return (
                <li key={u.title} className="flex items-start gap-3.5 px-4 py-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-iris-bright to-iris-deep text-white shadow-[0_6px_18px_-8px_rgba(110,86,248,0.7)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[17px] font-semibold leading-snug text-paper">{u.title}</h3>
                    <p className="mt-0.5 text-sm leading-snug text-paper-dim">{u.desc}</p>
                    <p className="mt-1.5 text-sm leading-snug text-paper-dim">{p.useCases.techLabel} <span className="font-semibold text-paper">{u.tech}</span></p>
                  </div>
                </li>
              );
            })}
          </Reveal>
        </section>

        {/* Τελικό CTA */}
        <section className="px-4 pt-2 pb-14">
          <Reveal className="card-ink px-5 py-8 text-center">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight gradient-text-premium">{p.finalCta.title}</h2>
            <a href="/contact" className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-iris text-base font-bold text-white shadow-[0_10px_30px_-12px_rgba(110,86,248,0.8)] transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {p.finalCta.button}
            </a>
          </Reveal>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-ink via-ink-800 to-ink-800 min-h-screen text-paper font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none bg-gradient-to-br from-ink-800 via-ink-800 to-ink-800">
        {/* Animated AI-inspired Background */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-ink/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          {/* Floating AI keywords */}
          {['AI', 'ML', 'Neural Net', 'GPT', 'Python', 'TensorFlow', 'Data', 'NLP', 'Vision', 'Automation'].map((kw, i) => (
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
            <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
              {t.services.pages.aiIntegrationApplications.hero.title}
            </motion.h1>
            <motion.p className="text-lg md:text-2xl text-paper-dim mb-10 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {t.services.pages.aiIntegrationApplications.hero.subtitle}
            </motion.p>
            <motion.button
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { window.location.href = '/contact'; }}
            >
              <span className="relative z-10">{t.services.pages.aiIntegrationApplications.hero.cta}</span>
            </motion.button>
          </motion.div>
          {/* Right: AI Image */}
          <motion.div
            className="flex-1 flex items-center justify-center w-full md:w-auto mt-12 md:mt-0"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.img
              src={aiImg}
              alt="AI Hero"
              className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] object-cover rounded-3xl shadow-2xl border-4 border-white/10/60 bg-white/[0.045]"
              animate={{ y: [0, -18, 0, 18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 8px 48px 0 rgba(80,80,200,0.13)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* AI Υπηρεσίες */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.aiIntegrationApplications.services.title}</motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {services.map((s, idx) => (
              <motion.div key={idx} className="group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Animated Gradient Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
                <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-iris/20 to-iris/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-purple-300 text-4xl">{s.icon}</div>
                <h4 className="relative z-10 text-xl font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{s.title}</h4>
                <p className="relative z-10 text-paper-dim mb-6 text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Τεχνολογίες & Πλατφόρμες */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/20 via-blue-400/15 to-pink-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.aiIntegrationApplications.technologies.title}</motion.h2>
          <div className="flex flex-wrap justify-center mb-8 gap-3 px-4 sm:gap-4">
            {techTabs.map((tab, idx) => (
              <button key={tab.label} className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ${currentTab === idx ? 'bg-gradient-to-r from-blue-600 to-purple-400 text-white shadow-lg' : 'bg-white/[0.045] backdrop-blur-lg text-iris-bright border border-white/10 hover:shadow-md'}`} onClick={() => setCurrentTab(idx)}>{tab.label}</button>
            ))}
          </div>
          <motion.div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {techTabs[currentTab].icons.map((t, idx) => (
              <motion.div key={t.name} className="group relative flex flex-col items-center gap-2 bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 md:p-8 hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.05, y: -4, boxShadow: '0 0 24px 0 #a5b4fc' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10">{t.icon}</div>
                <span className="relative z-10 text-base text-paper font-semibold mt-2">{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Πώς Εργάζομαι / AI Workflow */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.aiIntegrationApplications.workflow.title}</motion.h2>
          <motion.div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {workflow.map((step, idx) => (
              <motion.div key={idx} className="group relative flex flex-col items-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-iris/20 to-iris/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-purple-300">{step.icon}</div>
                <h4 className="relative z-10 text-base font-bold text-paper mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">{step.title}</h4>
                <p className="relative z-10 text-paper-dim mb-4 text-sm leading-relaxed">{step.desc}</p>
                {idx < workflow.length - 1 && <div className="relative z-10 w-1 h-10 bg-gradient-to-b from-iris/30 to-iris/15 mx-auto my-2 rounded-full" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Παραδείγματα χρήσης */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.aiIntegrationApplications.useCases.title}</motion.h2>
          <p className="text-lg md:text-xl font-semibold text-blue-400 mb-10 text-center">{t.services.pages.aiIntegrationApplications.useCases.subtitle}</p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {useCases.map((u, idx) => {
              const Icon = useCaseIconTypes[idx] ?? FaRobot;
              return (
              <motion.div key={u.title} className="group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl overflow-hidden w-full" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.02, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-iris/20 to-iris/10 shadow-inner border-4 border-iris/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:border-purple-300">
                  <Icon className={`${useCaseColors[idx]} text-3xl`} />
                </div>
                <h3 className="relative z-10 text-xl font-bold text-paper mb-2 tracking-tight">{u.title}</h3>
                <p className="relative z-10 text-paper-dim text-base leading-relaxed mb-4 flex-1">{u.desc}</p>
                <p className="relative z-10 text-iris-bright text-sm">{t.services.pages.aiIntegrationApplications.useCases.techLabel} <span className="font-semibold">{u.tech}</span></p>
              </motion.div>
              );
            })}
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight gradient-text-premium">{t.services.pages.aiIntegrationApplications.finalCta.title}</h2>
              <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contact'; }}><span className="relative z-10">{t.services.pages.aiIntegrationApplications.finalCta.button}</span></motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 