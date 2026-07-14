import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin, FaYoutube, FaTwitter, FaPinterest, FaRegLightbulb, FaRegImages, FaBullhorn, FaUsers, FaChartBar, FaRobot, FaChevronRight, FaChevronLeft, FaCheckCircle, FaRocket, FaChartLine, FaMagic, FaVideo, FaSnapchat, FaWhatsapp, FaTelegram, FaDiscord, FaTwitch, FaReddit } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
// import socialLottie from '../assets/lottie-socialmedia.json';
const socialLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
// ΝΕΟ: Imports για τα logo promotion images
import logosPromotion1 from '../assets/logos_promotion.png';
import logosPromotion2 from '../assets/logos_promotion2.png';
import logosPromotion3 from '../assets/logos_promotion3.png';
import logosPromotion4 from '../assets/logos_promotion4.png';
import logosPromotion5 from '../assets/logos_promotion5.png';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

// Icon arrays
const serviceIcons = [
  <FaRegLightbulb className="text-yellow-400 text-3xl" />,
  <FaRegImages className="text-pink-400 text-3xl" />,
  <FaBullhorn className="text-blue-400 text-3xl" />,
  <FaUsers className="text-green-400 text-3xl" />,
  <FaChartBar className="text-purple-400 text-3xl" />,
  <FaRobot className="text-cyan-400 text-3xl" />,
];

const workflowIcons = [
  <FaCheckCircle className="text-blue-500 text-2xl" />,
  <FaRegLightbulb className="text-yellow-400 text-2xl" />,
  <FaRegImages className="text-pink-400 text-2xl" />,
  <FaUsers className="text-green-400 text-2xl" />,
  <FaChartBar className="text-purple-400 text-2xl" />,
];

// Platforms array (names are universal, no translation needed)
const platforms = [
  { icon: <FaInstagram className="text-pink-500 text-4xl" />, name: 'Instagram' },
  { icon: <FaFacebook className="text-blue-600 text-4xl" />, name: 'Facebook' },
  { icon: <FaTiktok className="text-paper text-4xl" />, name: 'TikTok' },
  { icon: <FaLinkedin className="text-iris-bright text-4xl" />, name: 'LinkedIn' },
  { icon: <FaYoutube className="text-red-500 text-4xl" />, name: 'YouTube' },
  { icon: <FaTwitter className="text-blue-400 text-4xl" />, name: 'Twitter' },
  { icon: <FaPinterest className="text-red-400 text-4xl" />, name: 'Pinterest' },
  { icon: <FaSnapchat className="text-yellow-400 text-4xl" />, name: 'Snapchat' },
  { icon: <FaWhatsapp className="text-green-500 text-4xl" />, name: 'WhatsApp' },
  { icon: <FaTelegram className="text-blue-500 text-4xl" />, name: 'Telegram' },
  { icon: <FaDiscord className="text-purple-500 text-4xl" />, name: 'Discord' },
  { icon: <FaTwitch className="text-purple-600 text-4xl" />, name: 'Twitch' },
  { icon: <FaReddit className="text-orange-500 text-4xl" />, name: 'Reddit' },
];

const trendIcons = [
  <FaVideo className="text-orange-400 text-4xl mb-4" />,
  <FaRegImages className="text-pink-400 text-4xl mb-4" />,
  <FaRobot className="text-blue-400 text-4xl mb-4" />,
  <FaUsers className="text-emerald-400 text-4xl mb-4" />,
  <FaChartBar className="text-purple-400 text-4xl mb-4" />,
  <FaMagic className="text-cyan-400 text-4xl mb-4" />,
];

export default function SocialMediaManagementPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [currentSample, setCurrentSample] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [typed, setTyped] = useState('');

  const services = useMemo(() =>
    t.services.pages.socialMediaManagement.services.items.map((item, idx) => ({
      icon: serviceIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const workflow = useMemo(() =>
    t.services.pages.socialMediaManagement.workflow.items.map((item, idx) => ({
      icon: workflowIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const trends = useMemo(() =>
    t.services.pages.socialMediaManagement.trends.items.map((item, idx) => ({
      icon: trendIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const logoTransformations = useMemo(() => {
    const images = [logosPromotion1, logosPromotion2, logosPromotion3, logosPromotion4, logosPromotion5];
    return t.services.pages.socialMediaManagement.logoTransformations.items.map((item, idx) => ({
      img: images[idx],
      title: item.title,
      desc: item.desc
    }));
  }, [t]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalImg(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  
  // Typing effect για το hero
  useEffect(() => {
    const full = t.services.pages.socialMediaManagement.hero.title;
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [language, t]);

  const scrollToTransformations = () => {
    const element = document.querySelector('[data-section="logo-transformations"]');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-ink via-pink-50 to-ink-800 min-h-screen text-paper font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none">
        {/* Floating Social Icons */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              className={`absolute z-10 opacity-20 text-6xl`}
              style={{
                top: `${10 + 60 * Math.sin((i / platforms.length) * 2 * Math.PI)}%`,
                left: `${10 + 80 * Math.cos((i / platforms.length) * 2 * Math.PI)}%`,
                filter: 'drop-shadow(0 4px 24px rgba(200,80,200,0.10))',
              }}
              animate={{ y: [0, i % 2 === 0 ? 20 : -20, 0] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {p.icon}
            </motion.div>
          ))}
        </motion.div>
        {/* Hero Content */}
        <motion.div className="relative z-20 max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
            {typed}
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-paper-dim mb-10 font-medium max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {t.services.pages.socialMediaManagement.hero.subtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-pink-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-pink-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-pink-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.socialMediaManagement.hero.cta}</span></motion.button>
            <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={scrollToTransformations}><span className="relative z-10">{t.services.pages.socialMediaManagement.hero.viewTransformations}</span></motion.button>
          </div>
        </motion.div>
      </section>

      {/* Υπηρεσίες που προσφέρουμε */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/20 via-purple-400/15 to-blue-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.socialMediaManagement.services.title}</motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {services.map((s, idx) => (
              <motion.div key={idx} className="group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}>
                {/* Animated Gradient Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
                <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-iris/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-pink-200 group-hover:border-blue-300">{s.icon}</div>
                <h4 className="relative z-10 text-xl font-bold text-pink-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-blue-600 transition-all duration-300 tracking-tight">{s.title}</h4>
                <p className="relative z-10 text-paper-dim mb-6 text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Πλατφόρμες που υποστηρίζουμε */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.socialMediaManagement.platforms.title}</motion.h2>
          <motion.div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {platforms.map((p, idx) => (
              <motion.div key={p.name} className="group relative flex flex-col items-center gap-2 bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.05, y: -4, boxShadow: '0 0 24px 0 #a5b4fc' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10">{p.icon}</div>
                <span className="relative z-10 text-base text-paper font-semibold mt-2 text-center">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ΝΕΑ ΕΝΟΤΗΤΑ: Social Media Excellence & Logo Transformation */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden" data-section="logo-transformations">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-blue-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.socialMediaManagement.logoTransformations.title}</motion.h2>
        <motion.p className="text-lg text-paper-dim text-center max-w-4xl mx-auto mb-16">{t.services.pages.socialMediaManagement.logoTransformations.subtitle}</motion.p>
        
        {/* Hero Content */}
        <motion.div className="bg-gradient-to-br from-ink-800 via-ink-800 to-ink-800 rounded-3xl shadow-xl border border-white/10/40 p-8 md:p-12 mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">{t.services.pages.socialMediaManagement.logoTransformations.whyUsTitle}</h3>
              <ul className="space-y-3 text-paper-dim">
                {t.services.pages.socialMediaManagement.logoTransformations.whyUsItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">{t.services.pages.socialMediaManagement.logoTransformations.viralSuccessTitle}</h4>
              <p className="text-paper-dim">{t.services.pages.socialMediaManagement.logoTransformations.viralSuccessDesc}</p>
            </div>
          </div>
        </motion.div>

        {/* Logo Transformation Showcase */}
        <motion.h3 className="text-2xl md:text-3xl font-bold text-center text-paper mb-12">{t.services.pages.socialMediaManagement.logoTransformations.showcaseTitle}</motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logoTransformations.map((logo, idx) => {
            const gradientClasses = [
              'from-ink-800 to-ink-800',
              'from-ink-800 to-ink-800',
              'from-ink-800 to-red-50',
              'from-ink-800 to-ink-800',
              'from-orange-50 to-yellow-50'
            ];
            return (
              <motion.div key={idx} className="bg-ink-800 rounded-3xl shadow-xl border border-white/10/40 overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer relative" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: idx * 0.1 }} viewport={{ once: true }} onClick={() => setModalImg(logo.img)}>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-purple-800 mb-3">{logo.title}</h4>
                  <p className="text-paper-dim text-sm mb-4">{logo.desc}</p>
                </div>
                <div className="relative overflow-hidden">
                  <img src={logo.img} alt={logo.title} className={`w-full h-64 object-contain bg-gradient-to-br ${gradientClasses[idx]} p-4 group-hover:scale-110 transition-transform duration-500`} />
                  {/* Fullscreen indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.05] rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-paper-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                  {/* Click hint */}
                  <div className="absolute bottom-2 right-2 bg-white/[0.045] text-xs text-paper-dim px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.services.pages.socialMediaManagement.logoTransformations.clickToZoom}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for full size image */}
        {modalImg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalImg(null)}>
            <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 bg-white/[0.045] hover:bg-ink-800 text-paper rounded-full p-2 shadow-lg text-2xl z-10 focus:outline-none"
                aria-label={t.services.pages.socialMediaManagement.logoTransformations.closeModal}
                onClick={() => setModalImg(null)}
              >✕</button>
              <img
                src={modalImg}
                alt="Logo Full Size"
                className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white object-contain"
                style={{ background: 'white' }}
              />
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Δείγματα Δουλειάς / Case Studies */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-paper mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.socialMediaManagement.trends.title}</motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {trends.map((trend, idx) => (
            <motion.div key={trend.title} className="bg-white/[0.05] rounded-3xl shadow-xl border border-white/10 p-10 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
              {trend.icon}
              <h4 className="text-xl font-bold text-paper mb-2">{trend.title}</h4>
              <p className="text-paper-dim mb-4 text-base leading-relaxed">{trend.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Πως δουλεύουμε / Ροή Εργασιών */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-12 text-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.socialMediaManagement.workflow.title}</motion.h2>
        <motion.div className="flex flex-col md:flex-row justify-center items-center gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {workflow.map((step, idx) => (
            <motion.div key={step.title} className="flex flex-col items-center bg-white/[0.045] backdrop-blur-lg rounded-2xl shadow-xl border border-pink-100/40 p-10 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}><div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-iris/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-pink-200 group-hover:border-blue-300">{step.icon}</div><h4 className="text-base font-bold text-pink-900 mb-2 group-hover:text-pink-500 transition-colors duration-300 tracking-tight">{step.title}</h4><p className="text-paper-dim mb-4 text-sm leading-relaxed">{step.desc}</p>{idx < workflow.length - 1 && <div className="w-1 h-10 bg-gradient-to-b from-pink-300 to-iris/15 mx-auto my-2 rounded-full" />}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* Τελικό CTA */}
      <section className="max-w-7xl mx-auto py-24 px-4 flex flex-col items-center text-center">
        <motion.div className="relative bg-gradient-to-br from-pink-100 via-ink-800 to-iris/10/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-100/40 p-12 flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-pink-900 mb-6 tracking-tight">{t.services.pages.socialMediaManagement.finalCta.title}</h2>
          <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-pink-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-pink-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-pink-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.socialMediaManagement.finalCta.button}</span></motion.button>
        </motion.div>
      </section>
    </div>
  );
} 