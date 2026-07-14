import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaDesktop, FaFigma, FaUserFriends, FaRegObjectGroup, FaRegEdit, FaSyncAlt, FaCheckCircle, FaStar, FaChevronLeft, FaChevronRight, FaUserCircle, FaLayerGroup, FaRegEye } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
// import uiLottie from '../assets/lottie-ui.json';
const uiLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import uiImg from '../assets/UI.png';
import ui2Img from '../assets/ui2.jpg';
import ui3Img from '../assets/ui3.jpg';
import ui4Img from '../assets/ui4.jpg';
import ui5Img from '../assets/ui5.jpg';
import ui6Img from '../assets/ui6.png';
import { useIsMobile } from '../hooks/useIsMobile';
import financeImg from '../assets/ui2.jpg';
import foodImg from '../assets/ui3.jpg';
import travelImg from '../assets/ui4.jpg';
import cryptoImg from '../assets/ui5.jpg';
import smartHomeImg from '../assets/ui6.png';
import datingImg from '../assets/ui2.jpg';
import bookImg from '../assets/ui3.jpg';
import UIBookReadingApp from '../assets/UIBookReadingApp.png';
import UIcryptowallet from '../assets/UIcryptowallet.png';
import UIDatingApp from '../assets/UIDatingApp.png';
import UIrestaurant from '../assets/UIrestaurant.png';
import UIsamples from '../assets/UIsamples.png';
import UIsmarthome from '../assets/UIsmarthome.png';
import UItravellerapp from '../assets/UItravellerapp.png';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

// Icon arrays
const serviceIcons = [
  <FaDesktop className="text-blue-500 text-3xl" />,
  <FaFigma className="text-pink-500 text-3xl" />,
  <FaRegObjectGroup className="text-purple-500 text-3xl" />,
  <FaUserFriends className="text-green-500 text-3xl" />,
  <FaRegEdit className="text-yellow-500 text-3xl" />,
  <FaSyncAlt className="text-cyan-500 text-3xl" />,
  <FaRegEye className="text-blue-400 text-3xl" />,
];

const methodologyIcons = [
  <FaCheckCircle className="text-blue-500 text-2xl" />,
  <FaUserFriends className="text-green-500 text-2xl" />,
  <FaRegObjectGroup className="text-purple-500 text-2xl" />,
  <FaLayerGroup className="text-pink-500 text-2xl" />,
  <FaSyncAlt className="text-cyan-500 text-2xl" />,
];

const sampleAppImages = [
  UIsamples,
  UIrestaurant,
  UItravellerapp,
  UIcryptowallet,
  UIsmarthome,
  UIDatingApp,
  UIBookReadingApp,
];

export default function UXUIDesignPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [typed, setTyped] = useState('');
  const [currentGallery, setCurrentGallery] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // ΝΕΟ: State για modal εικόνας
  const [modalImg, setModalImg] = useState<string | null>(null);

  const services = useMemo(() =>
    t.services.pages.uxUIDesign.services.items.map((item, idx) => ({
      icon: serviceIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const methodology = useMemo(() =>
    t.services.pages.uxUIDesign.methodology.items.map((item, idx) => ({
      icon: methodologyIcons[idx],
      title: item.title,
      desc: item.desc
    })), [t]);

  const sampleApps = useMemo(() =>
    t.services.pages.uxUIDesign.samples.apps.map((app, idx) => ({
      img: sampleAppImages[idx],
      title: app.title,
      desc: app.desc
    })), [t]);

  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  // Typing effect για το hero
  useEffect(() => {
    const full = t.services.pages.uxUIDesign.hero.title;
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [language, t]);

  // Κλείσιμο modal με Escape ή tap εκτός εικόνας
  useEffect(() => {
    if (!modalImg) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalImg(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalImg]);
  return (
    <div className="bg-gradient-to-br from-ink via-ink-800 to-ink-800 min-h-screen text-paper font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none">
        {/* Πολύχρωμο gradient background και blurred shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-60 rounded-full blur-3xl" style={{filter:'blur(80px)'}}></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-400 via-teal-300 to-pink-400 opacity-50 rounded-full blur-2xl" style={{filter:'blur(60px)'}}></div>
          <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 opacity-40 rounded-full blur-2xl" style={{filter:'blur(40px)'}}></div>
        </div>
        {/* Floating Wireframes / Layers: ΜΟΝΟ σε desktop */}
        {!isMobile && (
          <motion.div className="absolute inset-0 z-0 pointer-events-none">
            {[
              "UI", "Figma", "Wireframe", "Button", "Card", "Modal", "Sketch", "Mobile", "Web", "Flow"
            ].map((kw, i) => (
              <motion.div
                key={kw}
                className="absolute z-10 opacity-20 text-lg md:text-2xl font-bold text-purple-400"
                style={{
                  top: `${10 + 60 * Math.sin((i / 10) * 2 * Math.PI)}%`,
                  left: `${10 + 80 * Math.cos((i / 10) * 2 * Math.PI)}%`,
                  filter: 'drop-shadow(0 4px 24px rgba(160,80,200,0.10))',
                }}
                animate={{ y: [0, i % 2 === 0 ? 20 : -20, 0] }}
                transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                {kw}
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* Hero Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
            {typed}
          </h1>
          <p className="text-xl md:text-2xl text-paper-dim mb-10 font-medium max-w-2xl mx-auto">
            {t.services.pages.uxUIDesign.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.uxUIDesign.hero.cta}</span></button>
            <button className="inline-block px-12 py-5 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" onClick={() => { document.getElementById('uiux-samples')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="relative z-10">{t.services.pages.uxUIDesign.hero.viewSamples}</span></button>
          </div>
        </div>
      </section>

      {/* Υπηρεσίες UX/UI */}
      <section className="max-w-4xl mx-auto py-24 px-4">
        <div className="relative bg-gradient-to-br from-iris/15 via-ink-800 to-iris/10/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10/40 p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
          {/* Εικόνα/Γραφικό UI */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3 mb-8 md:mb-0">
            <img src={uiImg} alt="UI Design" className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-2xl shadow-xl bg-white/[0.045]" />
          </div>
          {/* Περιεχόμενο */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">Υπηρεσίες UX/UI</h2>
            <p className="text-lg text-paper-dim mb-6 max-w-xl">Σχεδιάζουμε premium interfaces για web & mobile, με έμφαση στη χρηστικότητα, την αισθητική και το αποτέλεσμα.</p>
            {/* Badges/Icons row */}
            <div className={`grid grid-cols-2 gap-4 w-full py-2 justify-center md:justify-start md:flex md:flex-row md:flex-wrap md:gap-3`}>
              {services.map((s, idx) => (
                <div key={s.title} className="flex flex-col items-center bg-white/[0.045] rounded-2xl shadow-md border border-white/10/40 px-5 py-4 min-w-[120px] max-w-[180px] flex-shrink-0 hover:shadow-xl transition-all duration-300">
                  <div className="mb-2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-iris/15 to-iris/10 shadow-inner border-2 border-iris/30">
                    {s.icon}
                  </div>
                  <span className="text-sm font-semibold text-purple-900 mb-1 text-center leading-tight">{s.title}</span>
                  <span className="text-xs text-paper-muted text-center leading-tight">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Μεθοδολογία / Ροή Εργασίας */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 rounded-full blur-3xl"
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.uxUIDesign.methodology.title}</motion.h2>
          <motion.div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {methodology.map((step, idx) => (
              <motion.div key={step.title} className="group relative flex flex-col items-center bg-white/[0.045] backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8 md:p-10 hover:shadow-2xl transition-all duration-300 overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04, y: -8 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-iris/15 to-iris/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-iris/30 group-hover:border-purple-300">
                  {step.icon}
                </div>
                <h4 className="relative z-10 text-base font-bold text-purple-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 tracking-tight">{step.title}</h4>
                <p className="relative z-10 text-paper-dim mb-4 text-sm leading-relaxed">{step.desc}</p>
                {idx < methodology.length - 1 && <div className="relative z-10 w-1 h-10 bg-gradient-to-b from-iris/25 to-iris/15 mx-auto my-2 rounded-full" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trends & Inspiration */}
      <section id="uiux-samples" className="relative max-w-7xl mx-auto py-24 md:py-32 px-2 sm:px-4 overflow-hidden">
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
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center gradient-text-premium" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{t.services.pages.uxUIDesign.samples.title}</motion.h2>
          <p className="text-lg text-paper-dim text-center max-w-3xl mx-auto mb-10">{t.services.pages.uxUIDesign.samples.description}</p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
            {sampleApps.map((app, idx) => {
              const borderColors = [
                'border-white/10',
                'border-orange-100/40',
                'border-white/10',
                'border-iris/30/40',
                'border-white/10/40',
                'border-pink-100/40',
                'border-yellow-100/40'
              ];
              const textColors = [
                'text-paper',
                'text-orange-700',
                'text-paper',
                'text-paper',
                'text-purple-800',
                'text-pink-700',
                'text-yellow-800'
              ];
              return (
                <motion.div key={idx} className={`group relative bg-white/[0.045] backdrop-blur-xl rounded-3xl shadow-xl border ${borderColors[idx]} flex flex-col items-center text-center overflow-hidden hover:shadow-2xl transition-all duration-300`} initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.02, y: -4 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-ink/30 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <img src={app.img} alt={app.title} className="relative z-10 w-full h-56 object-cover object-top cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => setModalImg(app.img)} />
                  <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                    <h4 className={`text-xl font-bold ${textColors[idx]} mb-2`}>{app.title}</h4>
                    <p className="text-paper-dim mb-4 text-base leading-relaxed">{app.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        {/* Modal για full size εικόνα */}
        {modalImg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalImg(null)}>
            <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 bg-white/[0.045] hover:bg-ink-800 text-paper rounded-full p-2 shadow-lg text-2xl z-10 focus:outline-none"
                aria-label={t.services.pages.uxUIDesign.samples.closeModal}
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

      {/* Τελικό CTA */}
      <section className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Premium Background - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 rounded-full blur-3xl"
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
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight gradient-text-premium">{t.services.pages.uxUIDesign.finalCta.title}</h2>
              <motion.button className="inline-block px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-400 text-white rounded-full font-bold text-xl shadow-3xl border-2 border-transparent hover:border-purple-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2 relative overflow-hidden mt-6" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.uxUIDesign.finalCta.button}</span></motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 