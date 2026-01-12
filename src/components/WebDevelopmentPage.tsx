import React, { useEffect, useState } from 'react';
import { FaCode, FaMobileAlt, FaSearch, FaSyncAlt, FaCogs, FaCloud, FaPaintBrush, FaRocket } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiFigma, SiVercel } from 'react-icons/si';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
// import heroLottie from '../assets/lottie-webdev.json'; // Τοποθετήστε εδώ το Lottie JSON animation για το hero
// import ctaLottie from '../assets/lottie-cta.json'; // Τοποθετήστε εδώ το Lottie JSON animation για το CTA
const heroLottie = {};
const ctaLottie = {};
// import hoverSfx from '../assets/sounds/hover.mp3'; // Τοποθετήστε εδώ το ηχητικό hover
// import clickSfx from '../assets/sounds/click.mp3'; // Τοποθετήστε εδώ το ηχητικό click
// import successSfx from '../assets/sounds/success.mp3'; // Τοποθετήστε εδώ το ηχητικό success
const hoverSfx = '';
const clickSfx = '';
const successSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import codeImg from '../assets/code.jpg';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { motion } from 'framer-motion';
import hotelImg from '../assets/Hotel.png';
import architectureImg from '../assets/architecture.png';
import hydrogenImg from '../assets/hydrogen.png';
import cryptoImg from '../assets/crypto.png';
import cmdImg from '../assets/cmd.jpg';

const floatingIcons = [
  { icon: <FaCode />, style: 'top-10 left-10 text-blue-400' },
  { icon: <FaMobileAlt />, style: 'top-1/2 left-4 text-pink-400' },
  { icon: <FaCogs />, style: 'top-20 right-16 text-purple-400' },
  { icon: <FaCloud />, style: 'bottom-10 left-1/3 text-cyan-400' },
  { icon: <FaPaintBrush />, style: 'bottom-16 right-10 text-yellow-400' },
  { icon: <FaRocket />, style: 'top-1/3 right-1/4 text-green-400' },
  { icon: <FaSearch />, style: 'bottom-1/4 left-1/4 text-pink-300' },
  { icon: <FaSyncAlt />, style: 'top-1/4 right-1/3 text-blue-300' },
  { icon: <FaCloud />, style: 'bottom-1/3 right-1/5 text-cyan-300' },
];

// Features will be loaded from translations

const techStack = [
  { icon: <SiReact className="text-blue-500 text-4xl" />, name: 'React' },
  { icon: <SiNextdotjs className="text-gray-900 text-4xl" />, name: 'Next.js' },
  { icon: <SiNodedotjs className="text-green-500 text-4xl" />, name: 'Node.js' },
  { icon: <SiTailwindcss className="text-cyan-500 text-4xl" />, name: 'Tailwind CSS' },
  { icon: <SiFigma className="text-pink-500 text-4xl" />, name: 'Figma' },
  { icon: <SiVercel className="text-black text-4xl" />, name: 'Vercel' },
];

// Stats will be loaded from translations

const unsplashHero = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80';
const unsplashTech = cmdImg;
const unsplashWorkspace = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80';

// const unsplashWhyMe = require('../assets/code.jpg');

function playSound(src: string) {
  const audio = new Audio(src);
  audio.volume = 0.18;
  audio.play();
}

export default function WebDevelopmentPage() {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const t = translations[language];
  // const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  // const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // const heroControls = useAnimation();

  // Stats array from translations
  const stats = [
    { value: 3, suffix: '', icon: <FaRocket className="text-purple-500 text-3xl" /> },
    { value: 100, suffix: '%', icon: <FaCloud className="text-cyan-500 text-3xl" /> },
    { value: 24, suffix: '/7', icon: <FaCogs className="text-pink-500 text-3xl" /> }
  ];

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  // GSAP parallax effect for floating icons
  useEffect(() => {
    floatingIcons.forEach((_, i) => {
      gsap.to(`#float-icon-${i}`, {
        y: i % 2 === 0 ? 20 : -20,
        repeat: -1,
        yoyo: true,
        duration: 3 + i,
        ease: 'power1.inOut',
      });
    });
  }, []);

  // Animated counters for stats
  useEffect(() => {
    const timeouts: number[] = [];
    stats.forEach((b, i) => {
      timeouts.push(window.setTimeout(() => {
        let start = 0;
        const end = b.value;
        const duration = 1200;
        const step = Math.max(1, Math.ceil(end / 40));
        let current = 0;
        const interval = window.setInterval(() => {
          current += step;
          if (current >= end) {
            // setAnimatedStats(prev => prev.map((v, idx) => idx === i ? end : v));
            clearInterval(interval);
          } else {
            // setAnimatedStats(prev => prev.map((v, idx) => idx === i ? current : v));
          }
        }, duration / (end / step));
      }, 400 + i * 200));
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Mouse parallax for hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // setMouse({ x: e.clientX, y: e.clientY });
      // heroControls.start({
      //   x: (e.clientX - window.innerWidth / 2) / 30,
      //   y: (e.clientY - window.innerHeight / 2) / 30,
      //   transition: { type: 'spring', stiffness: 40, damping: 12 }
      // });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Removed heroControls dependency

  // Parallax state για τίτλο/σχόλιο
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Εισάγω το motion ΜΟΝΟ αν δεν είναι mobile
  // const Motion = !isMobile ? require('framer-motion').motion : undefined;
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen text-gray-900 font-sans">
      {/* Hero Section (με Unsplash background) */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pb-10 select-none">
        {/* Animated Gradients/Particles, Floating Icons, Parallax: ΜΟΝΟ σε desktop */}
        {!isMobile && (
          <>
            <motion.div className="absolute inset-0 z-0 pointer-events-none">
              <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-blue-400/50 via-purple-400/40 to-white/0 rounded-full blur-3xl animate-spin-slow"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-purple-400/50 via-blue-400/40 to-white/0 rounded-full blur-3xl animate-spin-slow"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              />
              {/* Soft particles */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl"
                animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </motion.div>
            {floatingIcons.map((f, i) => (
              <motion.div
                key={i}
                id={`float-icon-${i}`}
                className={`absolute z-10 text-5xl opacity-20 ${f.style}`}
                animate={{ y: [0, i % 2 === 0 ? 20 : -20, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 4px 24px rgba(80,80,200,0.12))' }}
              >
                {f.icon}
              </motion.div>
            ))}
          </>
        )}
        {/* Unsplash Hero Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img src={unsplashTech} alt="Hero Background" className="w-full h-full object-cover object-center opacity-80" style={{mixBlendMode:'multiply'}} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/80 to-purple-50/80" />
        </div>
        {/* Hero Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
          {!isMobile ? (
            <>
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, x: parallax.x, y: parallax.y }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 60, damping: 18 }}
              >
                {t.services.pages.webDevelopment.hero.title}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-10 font-medium max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, x: parallax.x, y: parallax.y }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 60, damping: 18 }}
              >
                {t.services.pages.webDevelopment.hero.subtitle}
              </motion.p>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent px-4 break-words" style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif", wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {t.services.pages.webDevelopment.hero.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 font-medium max-w-2xl mx-auto px-4 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {t.services.pages.webDevelopment.hero.subtitle}
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
              onClick={() => { window.location.href = '/contactme'; }}
            >
              <span className="relative z-10">{t.services.pages.webDevelopment.buttons.startProject}</span>
            </button>
            <button
              className="inline-block px-12 py-5 bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
              onClick={() => {
                const showcase = document.getElementById('showcase-section');
                if (showcase) showcase.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">{t.services.pages.webDevelopment.buttons.viewSamples}</span>
            </button>
          </div>
        </div>
      </section>
      {/* Γιατί να επιλέξετε εμένα, Χαρακτηριστικά, Δείγματα, Πορεία, Τεχνολογίες, Στατιστικά: όλα χωρίς motion/animation σε κινητό */}
      <section className="max-w-5xl mx-auto py-16 px-4 text-center flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-full md:w-1/2 flex-shrink-0 flex items-center justify-center">
          <img src={codeImg} alt={t.services.pages.webDevelopment.whyUs.title} className="rounded-3xl shadow-2xl object-cover w-full h-80 md:h-96" style={{objectPosition:'center'}} loading="lazy" />
        </div>
        <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-10 flex flex-col items-center w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.webDevelopment.whyUs.title}</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-2">{t.services.pages.webDevelopment.whyUs.description}</p>
          <p className="text-lg md:text-xl text-blue-700 max-w-2xl mx-auto font-semibold">{t.services.pages.webDevelopment.whyUs.fromTo} <span className='bg-gradient-to-r from-blue-200 to-purple-200 px-2 rounded'>{t.services.pages.webDevelopment.whyUs.support}</span>, <span className='bg-gradient-to-r from-blue-100 to-purple-100 px-2 rounded'>{t.services.pages.webDevelopment.whyUs.transparency}</span> και <span className='bg-gradient-to-r from-blue-300 to-purple-300 px-2 rounded'>{t.services.pages.webDevelopment.whyUs.quality}</span>.</p>
        </div>
      </section>
      {/* Χαρακτηριστικά & Οφέλη */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.webDevelopment.features.title}</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            {t.services.pages.webDevelopment.features.items.map((f: any, idx: number) => {
              const icons = [
                <FaPaintBrush className="text-blue-500 text-3xl" />,
                <FaMobileAlt className="text-purple-500 text-3xl" />,
                <FaSearch className="text-pink-500 text-3xl" />,
                <FaSyncAlt className="text-cyan-500 text-3xl" />
              ];
              return (
              <motion.div
                key={f.title}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
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
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner border-4 border-blue-200 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {icons[idx]}
                </div>
                <h4 className="relative z-10 text-xl font-bold text-blue-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">
                  {f.title}
                </h4>
                <p className="relative z-10 text-gray-600 mb-6 text-base leading-relaxed">{f.desc}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Δείγματα Έργων */}
      <section id="showcase-section" className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.webDevelopment.samples.title}</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                img: architectureImg,
                url: 'https://in-mavridis.gr/'
              },
              {
                img: hydrogenImg,
                url: 'https://hydrogenlife.eu/'
              },
              {
                img: cryptoImg,
                url: 'https://panitoscryptocoin.com/'
              },
              {
                img: hotelImg,
                url: 'https://684ad438cfcdad7a5e3a8db8--serenity-hotel-lux.netlify.app/'
              }
            ].map((s, idx) => {
              const sample = t.services.pages.webDevelopment.samples.items[idx];
              return (
              <motion.div
                key={sample.title}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 z-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={s.img}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                  <h4 className="text-xl md:text-2xl font-bold text-blue-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 tracking-tight">
                    {sample.title}
                  </h4>
                  <p className="text-gray-700 text-base mb-4 flex-1 leading-relaxed">{sample.desc}</p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-auto px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {t.services.pages.webDevelopment.samples.viewProject}
                  </a>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Πορεία Υλοποίησης */}
      <section className="relative max-w-4xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/15 via-purple-400/10 to-cyan-400/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
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
        <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-10 flex flex-col items-center gap-10 overflow-hidden hover:shadow-2xl transition-all duration-500">
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
          <div className="relative z-10 w-full">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center gradient-text-premium">{t.services.pages.webDevelopment.process.title}</h2>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl text-center mx-auto leading-relaxed">{t.services.pages.webDevelopment.process.description}</p>
            {/* Timeline */}
            <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
              {t.services.pages.webDevelopment.process.steps.map((step: any, idx: number, arr: any[]) => {
                const icons = [
                  <FaSearch className="text-blue-500 text-2xl" />,
                  <FaPaintBrush className="text-purple-500 text-2xl" />,
                  <FaCode className="text-pink-500 text-2xl" />,
                  <FaRocket className="text-cyan-500 text-2xl" />
                ];
                return (
                <div key={step.title} className="flex items-center w-full mb-8 last:mb-0">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                      {idx + 1}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="w-1 h-12 bg-gradient-to-b from-blue-300 to-purple-200 mx-auto"></div>
                    )}
                  </div>
                  <div className="flex-1 bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-white/50 px-6 py-5 flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner border-2 border-blue-200">
                      {icons[idx]}
                    </div>
                    <div>
                      <span className="text-base font-semibold text-blue-900 text-center md:text-left block">{step.title}</span>
                      <span className="text-sm text-gray-600 text-center md:text-left block mt-1">{step.desc}</span>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Τεχνολογίες */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.webDevelopment.technologies.title}</motion.h2>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            {techStack.map((t, idx) => (
              <motion.div
                key={t.name}
                className="group relative flex flex-col items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10">{t.icon}</div>
                <span className="relative z-10 text-base text-blue-900 font-semibold mt-2 text-center">{t.name}</span>
              </motion.div>
              ))}
          </div>
        </div>
      </section>
      {/* Στατιστικά */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.webDevelopment.stats.title}</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
            {t.services.pages.webDevelopment.stats.items.map((stat: any, idx: number) => {
              const statData = [
                { value: 3, suffix: '', icon: <FaRocket className="text-purple-500 text-3xl" /> },
                { value: 100, suffix: '%', icon: <FaCloud className="text-cyan-500 text-3xl" /> },
                { value: 24, suffix: '/7', icon: <FaCogs className="text-pink-500 text-3xl" /> }
              ];
              const s = statData[idx];
              return (
              <motion.div
                key={stat.label}
                className="group relative flex flex-col items-center bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 md:p-12 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner border-4 border-blue-200 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {s.icon}
                </div>
                <span className="relative z-10 text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 animate-pulse">
                  {s.value}{s.suffix}
                </span>
                <span className="relative z-10 text-blue-900 font-semibold text-base md:text-lg text-center tracking-tight">{stat.label}</span>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
} 