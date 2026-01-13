import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import { FaApple, FaAndroid, FaReact, FaCloud, FaRocket, FaLock, FaPalette, FaBolt, FaStore, FaHeartbeat, FaGraduationCap, FaTruck, FaUsers, FaCode, FaSearch, FaPaintBrush, FaSyncAlt } from 'react-icons/fa';
import { SiFlutter, SiKotlin, SiSwift, SiFirebase, SiSupabase } from 'react-icons/si';
import Lottie from 'lottie-react';
// import mobileLottie from '../assets/lottie-mobiledev.json';
const mobileLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import smartphoneImg from '../assets/smartphone.jpg';
import codeImg from '../assets/code.jpg';
import ui2Img from '../assets/ui2.jpg';
import ui3Img from '../assets/ui3.jpg';
import video2Img from '../assets/video2.jpg';
import video3Img from '../assets/video3.jpg';
import video4Img from '../assets/video4.jpg';
import phoneImg from '../assets/phone.jpg';
import appsImg from '../assets/apps.jpg';
// GetFit App Images
import v1Img from '../assets/v1.png';
import v2Img from '../assets/v2.png';
import v3Img from '../assets/v3.png';
import v4Img from '../assets/v4.png';
import v5Img from '../assets/v5.png';
import v6Img from '../assets/v6.png';
import v7Img from '../assets/v7.png';
import v8Img from '../assets/v8.png';
import v9Img from '../assets/v9.png';
import v10Img from '../assets/v10.png';
import v11Img from '../assets/v11.png';
import v12Img from '../assets/v12.png';
import logoGymImg from '../assets/logoGym.png';
// UI/UX Samples Images
import UIBookReadingApp from '../assets/UIBookReadingApp.png';
import UIcryptowallet from '../assets/UIcryptowallet.png';
import UIDatingApp from '../assets/UIDatingApp.png';
import UIrestaurant from '../assets/UIrestaurant.png';
import UIsamples from '../assets/UIsamples.png';
import UIsmarthome from '../assets/UIsmarthome.png';
import UItravellerapp from '../assets/UItravellerapp.png';

const unsplashHero = smartphoneImg;
const unsplashTeam = codeImg;
const unsplashUX = ui2Img;
const unsplashCode = ui3Img;
const unsplashEcom = video2Img;
const unsplashHealth = video3Img;
const unsplashEdu = video4Img;
const unsplashOnDemand = video2Img;
const unsplashSocial = video3Img;

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

const appTypes = [
  { icon: <FaApple className="text-blue-500 text-4xl" />, title: 'iOS Native', desc: 'Native apps για iPhone & iPad με Swift.' },
  { icon: <FaAndroid className="text-green-500 text-4xl" />, title: 'Android Native', desc: 'Native apps για Android με Kotlin.' },
  { icon: <SiFlutter className="text-cyan-500 text-4xl" />, title: 'Flutter', desc: 'Cross-platform apps με Flutter.' },
  { icon: <FaReact className="text-blue-400 text-4xl" />, title: 'React Native', desc: 'Cross-platform apps με React Native.' },
  { icon: <FaCloud className="text-purple-500 text-4xl" />, title: 'PWAs', desc: 'Progressive Web Apps για κάθε συσκευή.' },
];

const tools = [
  { icon: <SiFlutter className="text-cyan-500 text-3xl" />, name: 'Flutter' },
  { icon: <SiKotlin className="text-purple-500 text-3xl" />, name: 'Kotlin' },
  { icon: <SiSwift className="text-orange-500 text-3xl" />, name: 'Swift' },
  { icon: <FaReact className="text-blue-400 text-3xl" />, name: 'React Native' },
  { icon: <SiFirebase className="text-yellow-500 text-3xl" />, name: 'Firebase' },
  { icon: <SiSupabase className="text-green-500 text-3xl" />, name: 'Supabase' },
  { icon: <FaApple className="text-gray-900 text-3xl" />, name: 'App Store' },
  { icon: <FaAndroid className="text-green-500 text-3xl" />, name: 'Play Store' },
];

const advantages = [
  { icon: <FaBolt className="text-blue-500 text-3xl" />, title: 'Ταχύτητα & Απόδοση', desc: 'Εφαρμογές που φορτώνουν άμεσα και λειτουργούν άψογα.' },
  { icon: <FaLock className="text-purple-500 text-3xl" />, title: 'Ασφάλεια σε Πρώτο Πλάνο', desc: 'Κρυπτογράφηση, ασφαλής διαχείριση δεδομένων, GDPR.' },
  { icon: <FaPalette className="text-pink-500 text-3xl" />, title: 'Καταπληκτικό UI/UX Design', desc: 'Εμπειρία χρήστη που ξεχωρίζει και εντυπωσιάζει.' },
  { icon: <FaRocket className="text-yellow-500 text-3xl" />, title: 'App Store Ready', desc: 'Δημοσίευση & υποστήριξη από την πρώτη μέρα.' },
];

const process = [
  { icon: <FaPalette className="text-blue-400 text-2xl" />, title: 'Ανακάλυψη Ιδέας', desc: 'Συζήτηση, ανάλυση, στόχοι.' },
  { icon: <FaPalette className="text-pink-400 text-2xl" />, title: 'UI/UX Design', desc: 'Wireframes, πρωτότυπα, design.' },
  { icon: <FaCode className="text-purple-400 text-2xl" />, title: 'Υλοποίηση', desc: 'Development, testing, βελτιστοποίηση.' },
  { icon: <FaRocket className="text-yellow-400 text-2xl" />, title: 'Λανσάρισμα', desc: 'App Store, Google Play, υποστήριξη.' },
  { icon: <FaCloud className="text-blue-400 text-2xl" />, title: 'Υποστήριξη', desc: 'Συνεχής βελτίωση & updates.' },
];

const useCases = [
  { img: unsplashEcom, title: 'E-commerce', desc: 'Mobile apps για ηλεκτρονικά καταστήματα.' },
  { img: unsplashHealth, title: 'Health & Wellness', desc: 'Εφαρμογές για υγεία, fitness, wellness.' },
  { img: unsplashEdu, title: 'Education', desc: 'Εκπαιδευτικές εφαρμογές, e-learning, quizzes.' },
  { img: unsplashOnDemand, title: 'On-Demand', desc: 'Delivery, booking, υπηρεσίες κατ’ απαίτηση.' },
  { img: unsplashSocial, title: 'Social', desc: 'Social networking, chat, communities.' },
];

export default function MobileAppDevelopmentPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenAlt, setFullscreenAlt] = useState<string>('');
  const [modalImg, setModalImg] = useState<string | null>(null);
  
  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);

  const openFullscreen = (imageSrc: string, alt: string) => {
    setFullscreenImage(imageSrc);
    setFullscreenAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenAlt('');
    document.body.style.overflow = 'unset';
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen();
        setModalImg(null);
      }
    };

    if (fullscreenImage || modalImg) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [fullscreenImage, modalImg]);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pb-10 select-none bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Animated Background Gradients/Particles */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        </motion.div>
        {/* HERO CONTENT SPLIT LAYOUT */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-32 w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left: Text */}
          <motion.div className="flex-1 flex flex-col items-start md:items-start text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent px-4 break-words" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif", wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {t.services.pages.mobileAppDevelopment.hero.title}
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 font-medium max-w-2xl px-4 break-words" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {t.services.pages.mobileAppDevelopment.hero.subtitle}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => playSound(hoverSfx)}
                onClick={() => { window.location.href = '/contactme'; }}
              >
                <span className="relative z-10">{t.services.pages.mobileAppDevelopment.hero.cta}</span>
              </motion.button>
            </div>
          </motion.div>
          {/* Right: Animated Phone Images */}
          <motion.div
            className="flex-1 flex items-center justify-center w-full md:w-auto mt-12 md:mt-0 gap-6"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.img
              src={phoneImg}
              alt="Mobile Phone"
              className="w-[160px] h-[260px] md:w-[220px] md:h-[360px] object-cover rounded-3xl shadow-2xl border-4 border-blue-100/60 bg-white/80"
              animate={{ y: [0, -18, 0, 18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 8px 48px 0 rgba(80,80,200,0.13)' }}
            />
            <motion.img
              src={smartphoneImg}
              alt="Smartphone"
              className="w-[160px] h-[260px] md:w-[220px] md:h-[360px] object-cover rounded-3xl shadow-2xl border-4 border-blue-100/60 bg-white/80"
              animate={{ y: [0, 18, 0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{ boxShadow: '0 8px 48px 0 rgba(80,80,200,0.13)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Types of Mobile App Development */}
      <section className="relative max-w-xl mx-auto py-20 px-4">
        {/* Floating gradient shapes */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-gradient-to-br from-blue-200 via-purple-200 to-white opacity-40 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-purple-200 via-blue-100 to-white opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="relative z-10 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-100/60 p-8 flex flex-col items-center gap-8 overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-2 drop-shadow-lg text-center">{t.services.pages.mobileAppDevelopment.appTypes.title}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6 mx-auto animate-pulse"></div>
          <p className="text-base text-gray-700 mb-6 text-center max-w-lg">{t.services.pages.mobileAppDevelopment.appTypes.description}</p>
          <div className="flex flex-col gap-8 w-full">
            {/* iPhone & iPad Apps */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-200/60 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-4 focus:ring-blue-100 relative overflow-hidden w-full">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 opacity-20 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-blue-200 shadow-inner border-2 border-blue-300">
                <FaApple className="text-blue-700 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.ios.title}</h3>
              <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold mb-2 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.ios.badge}</span>
              <p className="text-gray-700 text-base mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.ios.description}</p>
              <p className="text-gray-500 text-sm relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.ios.detail}</p>
            </div>
            {/* Android Apps */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-200/60 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:rotate-1 focus:outline-none focus:ring-4 focus:ring-green-100 relative overflow-hidden w-full">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 opacity-20 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-green-200 shadow-inner border-2 border-green-300">
                <FaAndroid className="text-green-700 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.android.title}</h3>
              <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold mb-2 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.android.badge}</span>
              <p className="text-gray-700 text-base mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.android.description}</p>
              <p className="text-gray-500 text-sm relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.android.detail}</p>
            </div>
            {/* Progressive Web Apps */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200/60 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-4 focus:ring-purple-100 relative overflow-hidden w-full">
              <div className="absolute -bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 opacity-20 rounded-full blur-2xl z-0"></div>
              <div className="relative z-10 mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-purple-200 shadow-inner border-2 border-purple-300">
                <FaCloud className="text-purple-700 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-purple-900 mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.pwa.title}</h3>
              <span className="inline-block px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold mb-2 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.pwa.badge}</span>
              <p className="text-gray-700 text-base mb-1 relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.pwa.description}</p>
              <p className="text-gray-500 text-sm relative z-10">{t.services.pages.mobileAppDevelopment.appTypes.cards.pwa.detail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.mobileAppDevelopment.tools.title}</motion.h2>
          <motion.div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            {tools.map((t, idx) => (
              <motion.div key={t.name} className="group relative flex flex-col items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden" initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.05, y: -4, boxShadow: '0 0 24px 0 #a5b4fc' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}>
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
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img src={appsImg} alt="Ομάδα Mobile Development" className="rounded-3xl shadow-2xl object-cover object-center w-full h-64 md:h-80" loading="lazy" />
            <img src={unsplashUX} alt="Mobile UI/UX" className="rounded-3xl shadow-2xl object-cover object-center w-full h-64 md:h-80" loading="lazy" />
          </div>
        </div>
      </section>

      {/* UI/UX Samples Section */}
      <section id="uiux-samples" className="relative max-w-7xl mx-auto py-24 md:py-32 px-2 sm:px-4 overflow-hidden">
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.mobileAppDevelopment.uiSamples.title}</motion.h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10">{t.services.pages.mobileAppDevelopment.uiSamples.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Finance App (UIsamples) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIsamples} alt="Finance App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIsamples)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-blue-900 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.finance.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.finance.description}</p>
            </div>
          </div>
          {/* Food Delivery App (UIrestaurant) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-orange-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIrestaurant} alt="Food Delivery App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIrestaurant)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-orange-700 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.food.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.food.description}</p>
            </div>
          </div>
          {/* Travel Planner App (UItravellerapp) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UItravellerapp} alt="Travel Planner App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UItravellerapp)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-blue-900 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.travel.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.travel.description}</p>
            </div>
          </div>
          {/* Crypto Wallet App (UIcryptowallet) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-blue-200/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIcryptowallet} alt="Crypto Wallet App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIcryptowallet)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-blue-800 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.crypto.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.crypto.description}</p>
            </div>
          </div>
          {/* Smart Home Control App (UIsmarthome) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-purple-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIsmarthome} alt="Smart Home App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIsmarthome)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-purple-800 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.smartHome.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.smartHome.description}</p>
            </div>
          </div>
          {/* Dating App (UIDatingApp) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-pink-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIDatingApp} alt="Dating App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIDatingApp)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-pink-700 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.dating.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.dating.description}</p>
            </div>
          </div>
          {/* Book Reading App (UIBookReadingApp) */}
          <div className="bg-white/90 rounded-3xl shadow-xl border border-yellow-100/40 flex flex-col items-center text-center overflow-hidden">
            <img src={UIBookReadingApp} alt="Book Reading App" className="w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(UIBookReadingApp)} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-yellow-800 mb-2">{t.services.pages.mobileAppDevelopment.uiSamples.apps.book.title}</h4>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">{t.services.pages.mobileAppDevelopment.uiSamples.apps.book.description}</p>
            </div>
          </div>
        </div>
        </div>
        {/* Modal για full size εικόνα */}
        {modalImg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalImg(null)}>
            <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg text-2xl z-10 focus:outline-none"
                aria-label={t.services.pages.mobileAppDevelopment.uiSamples.modalClose}
                onClick={() => setModalImg(null)}
              >✕</button>
              <img
                src={modalImg}
                alt="UI Sample Full Size"
                className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white object-contain"
                style={{ background: 'white' }}
              />
            </div>
          </div>
        )}
      </section>

      {/* App Development Process */}
      <section className="max-w-4xl mx-auto py-24 px-4">
        <div className="relative bg-gradient-to-br from-blue-100 via-white to-purple-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-10 flex flex-col items-center gap-10 overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.mobileAppDevelopment.process.title}</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-xl text-center">{t.services.pages.mobileAppDevelopment.process.description}</p>
            {/* Timeline */}
            <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
              {t.services.pages.mobileAppDevelopment.process.steps.map((stepItem, idx) => {
                const icons = [<FaPalette className="text-blue-400 text-2xl" />, <FaPalette className="text-pink-400 text-2xl" />, <FaCode className="text-purple-400 text-2xl" />, <FaRocket className="text-yellow-400 text-2xl" />, <FaCloud className="text-blue-400 text-2xl" />];
                const step = { icon: icons[idx], title: stepItem.title, desc: stepItem.desc };
                const arr = t.services.pages.mobileAppDevelopment.process.steps;
                return (
                  <div key={stepItem.title} className="flex items-center w-full mb-8 last:mb-0">
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
                        {step.icon}
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
      </section>

      {/* Portfolio Showcase */}
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.mobileAppDevelopment.portfolio.title}</motion.h2>
        
        {/* GetFitSKG App Showcase */}
        <motion.div 
          className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-blue-100/40 p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-100">
                    <img src={logoGymImg} alt="GetFit Logo" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-900">GetFit</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.portfolio.appShowcase.getFit.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">{t.portfolio.appShowcase.getFit.featuresTitle}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.portfolio.appShowcase.getFit.features.map((feature, idx) => (
                    <motion.div 
                      key={feature}
                      className="flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-blue-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">{t.portfolio.appShowcase.getFit.platformsTitle}</h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: <FaApple className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.ios, color: 'from-gray-800 to-gray-600' },
                    { icon: <FaAndroid className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.android, color: 'from-green-500 to-green-600' },
                    { icon: <FaCloud className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.web, color: 'from-blue-500 to-blue-600' }
                  ].map((platform, idx) => (
                    <motion.div 
                      key={platform.name}
                      className={`flex items-center gap-3 bg-gradient-to-r ${platform.color} text-white rounded-xl px-4 py-3 shadow-lg`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {platform.icon}
                      <span className="font-semibold">{platform.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://www.getfitskg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="text-xl" />
                {t.services.pages.mobileAppDevelopment.portfolio.viewApp}
              </motion.a>
            </motion.div>

            {/* Right: App Screenshots/Visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { img: v1Img, delay: 0 },
                    { img: v2Img, delay: 0.5 },
                    { img: v3Img, delay: 1 },
                    { img: v4Img, delay: 1.5 },
                    { img: v5Img, delay: 2 },
                    { img: v6Img, delay: 2.5 },
                    { img: v7Img, delay: 3 },
                    { img: v8Img, delay: 3.5 },
                    { img: v9Img, delay: 4 },
                    { img: v10Img, delay: 4.5 },
                    { img: v11Img, delay: 5 },
                    { img: v12Img, delay: 5.5 }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="bg-white rounded-2xl p-2 shadow-lg overflow-hidden cursor-pointer"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 0,
                        zIndex: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openFullscreen(item.img, `GetFit App Screen ${idx + 1}`)}
                    >
                      <img 
                        src={item.img} 
                        alt={`GetFit App Screen ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-xl"
                        loading="lazy"
                      />
            </motion.div>
          ))}
                </div>
                
                {/* Static decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  <FaHeartbeat />
                </div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  <FaRocket />
                </div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
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
          <motion.div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 flex flex-col items-center hover:shadow-2xl transition-all duration-500 overflow-hidden" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
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
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight gradient-text-premium">{t.services.pages.mobileAppDevelopment.finalCta.title}</h2>
              <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.mobileAppDevelopment.finalCta.button}</span></motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullscreen}
        >
          <motion.div 
            className="relative max-w-4xl max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={fullscreenImage} 
              alt={fullscreenAlt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={closeFullscreen}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                {fullscreenAlt}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 