import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaMagic, FaPaintBrush, FaBullhorn, FaGraduationCap, FaShoppingCart, FaMobileAlt, FaSyncAlt, FaPhoneAlt, FaChevronLeft, FaChevronRight, FaCheckCircle, FaPlayCircle, FaQuoteRight } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
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

const offers = [
  {
    icon: <FaVideo className="text-blue-500 text-3xl" />,
    gr: 'Παραγωγή & Επεξεργασία Βίντεο',
    en: 'Video Production & Editing',
  },
  {
    icon: <FaMagic className="text-purple-500 text-3xl" />,
    gr: 'Δυναμικά 2D & 3D Animation',
    en: '2D & 3D Animation',
  },
  {
    icon: <FaPaintBrush className="text-pink-500 text-3xl" />,
    gr: 'Γραφικά Κίνησης',
    en: 'Motion Graphics',
  },
  {
    icon: <FaBullhorn className="text-cyan-500 text-3xl" />,
    gr: 'Βίντεο Προώθησης',
    en: 'Promotional Videos',
  },
  {
    icon: <FaGraduationCap className="text-green-500 text-3xl" />,
    gr: 'Εκπαιδευτικά Βίντεο',
    en: 'Educational Videos',
  },
  {
    icon: <FaShoppingCart className="text-yellow-500 text-3xl" />,
    gr: 'Εμπορικά & Προϊοντικά Βίντεο',
    en: 'Commercial & Product Videos',
  },
  {
    icon: <FaMobileAlt className="text-blue-400 text-3xl" />,
    gr: 'Βίντεο για Social Media',
    en: 'Social Media Clips',
  },
  {
    icon: <FaSyncAlt className="text-purple-400 text-3xl" />,
    gr: 'Στρατηγική Περιεχομένου Βίντεο',
    en: 'Video Content Strategy',
  },
];

const process = [
  {
    icon: <FaPhoneAlt className="text-blue-500 text-2xl" />,
    gr: 'Συζήτηση & Κατανόηση Απαιτήσεων',
    en: 'Consultation & Requirement Gathering',
  },
  {
    icon: <FaMagic className="text-purple-500 text-2xl" />,
    gr: 'Στρατηγική & Σενάριο',
    en: 'Strategy & Scriptwriting',
  },
  {
    icon: <FaVideo className="text-pink-500 text-2xl" />,
    gr: 'Παραγωγή Βίντεο & Animation',
    en: 'Video & Animation Production',
  },
  {
    icon: <FaPaintBrush className="text-cyan-500 text-2xl" />,
    gr: 'Επεξεργασία & Διόρθωση',
    en: 'Editing & Refinement',
  },
  {
    icon: <FaSyncAlt className="text-green-500 text-2xl" />,
    gr: 'Παράδοση & Υποστήριξη',
    en: 'Delivery & Support',
  },
];

const whyUs = [
  {
    gr: 'Επαγγελματική ποιότητα παραγωγής',
    en: 'Professional production quality',
  },
  {
    gr: 'Δημιουργική προσέγγιση & μοναδικότητα',
    en: 'Creative and unique approach',
  },
  {
    gr: 'Εμπειρία σε ποικίλα είδη βίντεο & animation',
    en: 'Experience across video and animation types',
  },
  {
    gr: 'Συνεργασία από την ιδέα μέχρι την υλοποίηση',
    en: 'Collaboration from concept to delivery',
  },
  {
    gr: 'Συμβατότητα για όλα τα μέσα',
    en: 'Compatible with all platforms and devices',
  },
  {
    gr: 'Υποστήριξη μετά την παράδοση',
    en: 'Post-delivery support',
  },
];

const portfolio = [
  {
    thumb: '/src/assets/video.jpg',
    gr: 'Βίντεο Προώθησης για Startup',
    en: 'Promo Video for Startup',
    desc_gr: 'Δημιουργία δυναμικού βίντεο για παρουσίαση νέας εφαρμογής.',
    desc_en: 'Dynamic video for new app launch.',
    url: 'https://www.youtube.com/watch?v=1',
  },
  {
    thumb: '/src/assets/video2.jpg',
    gr: 'Εκπαιδευτικό Animation',
    en: 'Educational Animation',
    desc_gr: '2D animation για εκπαιδευτική πλατφόρμα.',
    desc_en: '2D animation for e-learning platform.',
    url: 'https://www.youtube.com/watch?v=2',
  },
  {
    thumb: '/src/assets/video3.jpg',
    gr: 'Motion Graphics για Social Media',
    en: 'Motion Graphics for Social Media',
    desc_gr: 'Γραφικά κίνησης για καμπάνια Instagram.',
    desc_en: 'Motion graphics for Instagram campaign.',
    url: 'https://www.youtube.com/watch?v=3',
  },
  {
    thumb: '/src/assets/video4.jpg',
    gr: 'Εμπορικό Βίντεο Προϊόντος',
    en: 'Commercial Product Video',
    desc_gr: 'Βίντεο παρουσίασης νέου προϊόντος.',
    desc_en: 'Product launch video.',
    url: 'https://www.youtube.com/watch?v=4',
  },
];

export default function VideoAnimationProductionPage() {
  const { language } = useLanguage();
  // const { toggleLanguage } = useLanguage(); // Αφαιρώ το toggleLanguage
  const [typed, setTyped] = useState('');
  const [currentPortfolio, setCurrentPortfolio] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);
  // Typing effect για το hero subtitle
  useEffect(() => {
    const full = language === 'el'
      ? 'Δημιουργία και επεξεργασία βίντεο και animations για προωθητική, εκπαιδευτική ή εμπορική χρήση.'
      : 'Creative video and animation production for promotional, educational, or commercial purposes.';
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i === full.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [language]);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen text-gray-900 font-sans">
      {/* Hero Section */}
      <section className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden ${isMobile ? 'bg-purple-100' : ''}`}>
        {/* Σε mobile: χωρίς motion/animation, διαφορετικό background */}
        {isMobile ? (
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide text-purple-900">Παραγωγή Video & Animation που Εντυπωσιάζουν</h1>
            <p className="text-lg md:text-2xl text-purple-700 mb-10 font-medium">Δημιουργούμε επαγγελματικά βίντεο, animations και motion graphics που απογειώνουν το brand σας και μαγνητίζουν το κοινό σας.</p>
            <a href="/contact" className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-400 text-white rounded-full font-bold text-lg shadow-3xl hover:from-purple-700 hover:to-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 animate-fade-in flex items-center gap-2">Επικοινωνήστε</a>
          </div>
        ) : (
          // ... existing desktop hero ...
          <>
            {/* (κρατάω το motion/animation μόνο για desktop) */}
            {/* Animated Background Gradients/Particles */}
            <motion.div className="absolute inset-0 z-0 pointer-events-none">
              <motion.div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute bottom-[-10%] right-[-10%] w-[32vw] h-[32vw] bg-gradient-to-br from-purple-400/40 via-blue-400/30 to-white/0 rounded-full blur-3xl animate-spin-slow" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, -20, 0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/20 rounded-full blur-3xl" animate={{ y: [0, 30, 0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
              {/* Decorative images */}
              <motion.img src={video2Img} alt="Video 2" className="absolute top-10 right-32 w-40 h-28 object-cover rounded-2xl shadow-xl opacity-70" animate={{ y: [0, 12, 0, -12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.img src={video3Img} alt="Video 3" className="absolute bottom-10 left-32 w-40 h-28 object-cover rounded-2xl shadow-xl opacity-70" animate={{ y: [0, -12, 0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
            </motion.div>
            {/* HERO CONTENT SPLIT LAYOUT */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 w-full flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Left: Text */}
              <motion.div className="flex-1 flex flex-col items-start md:items-start text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'IBM Plex Sans', 'Inter', sans-serif" }}>
                  Παραγωγή Video & Animation που Εντυπωσιάζουν
                </motion.h1>
                <motion.p className="text-lg md:text-2xl text-gray-700 mb-10 font-medium max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                  Δημιουργούμε επαγγελματικά βίντεο, animations και motion graphics που απογειώνουν το brand σας και μαγνητίζουν το κοινό σας. Από προωθητικά clips μέχρι εκπαιδευτικά animations, η εικόνα σας γίνεται εμπειρία.
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-400 text-white rounded-full font-bold text-lg shadow-2xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { window.location.href = '/contactme'; }}
                  >
                    <span className="relative z-10">Ζητήστε Προσφορά</span>
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
                    <span className="relative z-10">Παραδείγματα Έργων</span>
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
                  className="w-[320px] h-[220px] md:w-[400px] md:h-[320px] object-cover rounded-3xl shadow-2xl border-4 border-blue-100/60 bg-white/80"
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
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{language === 'el' ? 'Τι Προσφέρουμε' : 'What We Offer'}</motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {offers.map((o, idx) => (
            <motion.div key={o.gr} className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-100/40 p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 relative overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}><div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-gray-300">{o.icon}</div><h4 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 tracking-tight">{language === 'el' ? o.gr : o.en}</h4></motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Production Process */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{language === 'el' ? 'Η Διαδικασία Μας' : 'Our Production Process'}</motion.h2>
        <motion.div className="flex flex-col md:flex-row justify-center items-center gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {process.map((step, idx) => (
            <motion.div key={step.gr} className="flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/40 p-10 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden min-w-[180px]" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}><div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-gray-300">{step.icon}</div><h4 className="text-base font-bold text-blue-900 mb-2 group-hover:text-blue-500 transition-colors duration-300 tracking-tight">{language === 'el' ? step.gr : step.en}</h4>{idx < process.length - 1 && <div className="w-1 h-10 bg-gradient-to-b from-blue-300 to-gray-200 mx-auto my-2 rounded-full" />}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{language === 'el' ? 'Γιατί να μας Επιλέξετε;' : 'Why Choose DevTaskHub?'}</motion.h2>
        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }}>
          {whyUs.map((w, idx) => (
            <motion.li key={w.gr} className="flex items-center gap-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/40 p-6 text-lg font-medium text-gray-800 hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.04 }} viewport={{ once: true }}><FaCheckCircle className="text-green-500 text-2xl flex-shrink-0" /><span>{language === 'el' ? w.gr : w.en}</span></motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Portfolio Highlights */}
      <section id="project-examples-section" className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{language === 'el' ? 'Παραδείγματα Έργων' : 'Portfolio Highlights'}</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <img src={videoImg} alt="Hotel Promotion Video" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Προώθηση Ξενοδοχείου</h4>
            <p className="text-gray-600 text-base text-center">Εντυπωσιακό promo video για ξενοδοχειακή επιχείρηση με λήψεις, μοντάζ και motion graphics.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={video2Img} alt="Hotel Promotion Video" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Προώθηση Ξενοδοχείου</h4>
            <p className="text-gray-600 text-base text-center">Εντυπωσιακό promo video για ξενοδοχειακή επιχείρηση με λήψεις, μοντάζ και motion graphics.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={video3Img} alt="Animation Design" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Animation Design</h4>
            <p className="text-gray-600 text-base text-center">Δημιουργία custom animation για προώθηση υπηρεσιών και προϊόντων με σύγχρονη αισθητική.</p>
          </div>
          {/* Νέα videos */}
          <div className="flex flex-col items-center">
            <img src={video4Img} alt="Animation Design" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Animation Design</h4>
            <p className="text-gray-600 text-base text-center">Ψυχεδελικό animation με έντονα χρώματα και εφέ.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={videoImg} alt="Animation Design" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Animation Design</h4>
            <p className="text-gray-600 text-base text-center">Καλλιτεχνικό animation με λουλούδια και ανθρώπινες μορφές.</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={video2Img} alt="Animation Design" className="rounded-2xl shadow-xl w-full h-64 object-cover mb-4" />
            <h4 className="text-lg font-bold text-blue-900 mb-2">Animation Design</h4>
            <p className="text-gray-600 text-base text-center">Δυναμικό animation με καρχαρίες σε κίνηση.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto py-24 px-4 flex flex-col items-center text-center">
        <motion.div className="relative bg-gradient-to-br from-blue-100 via-white to-gray-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-12 flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">{language === 'el' ? 'Έχετε ένα project ή μια ιδέα για video & animation; Ας το συζητήσουμε!' : 'Have a project or idea for video & animation? Let’s talk!'}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-gray-400 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{language === 'el' ? 'Ζητήστε Προσφορά' : 'Request a Quote'}</span></motion.button>
            <motion.a href="tel:+306971982563" className="inline-block px-10 py-4 bg-gradient-to-r from-gray-400 to-blue-600 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-gray-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)}><FaPhoneAlt className="mr-2" />{language === 'el' ? 'Καλέστε μας' : 'Call Us'}</motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 