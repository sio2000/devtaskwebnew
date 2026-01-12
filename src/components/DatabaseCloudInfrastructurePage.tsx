import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaDatabase, FaLock, FaServer, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase, SiAmazon, SiGooglecloud } from 'react-icons/si';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
// import cloudLottie from '../assets/lottie-cloud.json';
const cloudLottie = {};
const hoverSfx = '';
const clickSfx = '';
// @ts-ignore: No types for aos
import AOS from 'aos';
import 'aos/dist/aos.css';
// Εισαγωγές εικόνων/εικονιδίων/animations
import cloudImg from '../assets/internet.jpg';
import dbImg from '../assets/code.jpg';
import securityImg from '../assets/crypto.png';
import architectureImg from '../assets/architecture.png';
import databaseImg from '../assets/database.jpg';

function playSound(src: string) {
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.15;
  audio.play();
}

// Icon arrays
const serviceIcons = [
  <FaCloud className="text-blue-500 text-3xl" />,
  <FaDatabase className="text-purple-500 text-3xl" />,
  <FaLock className="text-pink-500 text-3xl" />,
  <FaChartLine className="text-cyan-500 text-3xl" />,
  <FaServer className="text-green-500 text-3xl" />,
];

const workflowIcons = [
  <FaCloud className="text-purple-500 text-2xl" />,
  <FaDatabase className="text-blue-500 text-2xl" />,
  <FaLock className="text-pink-500 text-2xl" />,
  <FaServer className="text-green-500 text-2xl" />,
];

const clientIcons = [
  <SiAmazon className="text-blue-500 text-3xl" />,
  <FaCloud className="text-purple-500 text-3xl" />,
  <SiGooglecloud className="text-pink-500 text-3xl" />,
];

export default function DatabaseCloudInfrastructurePage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  useEffect(() => { AOS.init({ duration: 900, once: true }); }, []);

  const services = useMemo(() =>
    t.services.pages.databaseCloudInfrastructure.services.items.map((item, idx) => ({
      icon: serviceIcons[idx],
      title: item.title
    })), [t]);

  const workflow = useMemo(() =>
    t.services.pages.databaseCloudInfrastructure.workflow.items.map((item, idx) => ({
      icon: workflowIcons[idx],
      title: item.title
    })), [t]);

  const clients = useMemo(() =>
    t.services.pages.databaseCloudInfrastructure.whoWeServe.items.map((item, idx) => ({
      icon: clientIcons[idx],
      title: item.title
    })), [t]);

  const whyUs = useMemo(() =>
    t.services.pages.databaseCloudInfrastructure.whyUs.items, [t]);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-gray-50 min-h-screen text-gray-900 font-sans">
      {/* Sticky Language Toggle */}
      <div className="fixed top-6 right-6 z-50">
        {/* Αφαιρώ το κουμπί αλλαγής γλώσσας */}
      </div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-10 select-none">
        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0">
          <img src={databaseImg} alt="Database Background" className="w-full h-full object-cover object-center opacity-60" style={{mixBlendMode:'multiply'}} />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/70 via-purple-400/60 to-teal-400/60" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-400 via-purple-400 to-teal-400 opacity-40 rounded-full blur-3xl" style={{filter:'blur(80px)'}}></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-400 via-blue-300 to-purple-400 opacity-30 rounded-full blur-2xl" style={{filter:'blur(60px)'}}></div>
          <div className="absolute top-1/2 left-1/3 w-1/4 h-1/4 bg-gradient-to-br from-yellow-300 via-blue-200 to-teal-400 opacity-20 rounded-full blur-2xl" style={{filter:'blur(40px)'}}></div>
        </div>
        {/* Animated Background */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          {[
            "Cloud", "DB", "SQL", "NoSQL", "AWS", "Azure", "GCP", "Scale", "Secure", "Infra"
          ].map((kw, i) => (
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
        {/* Hero Content */}
        <motion.div className="relative z-20 max-w-3xl mx-auto px-4 py-32 text-center flex flex-col items-center">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-tight bg-gradient-to-r from-blue-700 to-gray-600 bg-clip-text text-transparent" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ fontFamily: "'Poppins', 'Roboto', 'Inter', sans-serif" }}>
            {t.services.pages.databaseCloudInfrastructure.hero.title}
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-700 mb-10 font-medium max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {t.services.pages.databaseCloudInfrastructure.hero.subtitle}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-gray-400 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.databaseCloudInfrastructure.hero.cta}</span></motion.button>
            <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-gray-400 to-blue-600 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-gray-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }); }}><span className="relative z-10">{t.services.pages.databaseCloudInfrastructure.hero.learnMore}</span></motion.button>
          </div>
        </motion.div>
      </section>

      {/* Our Services */}
      <section id="services-section" className="max-w-4xl mx-auto py-24 px-4">
        <div className="relative bg-gradient-to-br from-blue-100 via-white to-purple-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden">
          {/* Εικόνα/Γραφικό Cloud */}
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3 mb-8 md:mb-0">
            <img src={cloudImg} alt="Cloud Design" className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-2xl shadow-xl bg-white/80" />
          </div>
          {/* Περιεχόμενο */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.databaseCloudInfrastructure.services.title}</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-xl">{t.services.pages.databaseCloudInfrastructure.services.description}</p>
            {/* Badges/Icons row */}
            <div className="grid grid-cols-2 gap-4 w-full py-2 justify-center md:justify-start md:flex md:flex-row md:flex-wrap md:gap-3">
              {services.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center bg-white/80 rounded-2xl shadow-md border border-blue-100/40 px-5 py-4 min-w-[120px] max-w-[180px] flex-shrink-0 hover:shadow-xl transition-all duration-300">
                  <div className="mb-2 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner border-2 border-blue-200">
                    {s.icon}
                  </div>
                  <span className="text-sm font-semibold text-blue-900 mb-1 text-center leading-tight">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="max-w-4xl mx-auto py-24 px-4">
        <div className="relative bg-gradient-to-br from-blue-100 via-white to-purple-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-10 flex flex-col items-center gap-10 overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.databaseCloudInfrastructure.workflow.title}</h2>
          <p className="text-lg text-gray-700 mb-10 max-w-xl text-center">{t.services.pages.databaseCloudInfrastructure.workflow.description}</p>
          {/* Timeline */}
          <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
            {workflow.map((step, idx) => (
              <div key={idx} className="flex items-center w-full mb-8 last:mb-0">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                    {idx + 1}
                  </div>
                  {idx < workflow.length - 1 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-300 to-purple-200 mx-auto"></div>
                  )}
                </div>
                <div className="flex-1 bg-white/80 rounded-2xl shadow-md border border-blue-100/40 px-6 py-5 flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-inner border-2 border-blue-200">
                    {step.icon}
                  </div>
                  <span className="text-base font-semibold text-blue-900 text-center md:text-left">{step.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.databaseCloudInfrastructure.whoWeServe.title}</motion.h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
          {clients.map((c, idx) => (
            <motion.div key={idx} className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-100/40 p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 relative overflow-hidden" initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => playSound(clickSfx)}><div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-gray-100 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-4 border-blue-200 group-hover:border-gray-300">{c.icon}</div><h4 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 tracking-tight">{c.title}</h4></motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-gray-500 bg-clip-text text-transparent drop-shadow-lg">{t.services.pages.databaseCloudInfrastructure.whyUs.title}</motion.h2>
        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.10 } } }}>
          {whyUs.map((w, idx) => (
            <motion.li key={idx} className="flex items-center gap-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/40 p-6 text-lg font-medium text-gray-800 hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.04 }} viewport={{ once: true }}><FaCheckCircle className="text-green-500 text-2xl flex-shrink-0" /><span>{w}</span></motion.li>
          ))}
        </motion.ul>
      </section>

      {/* Contact Us */}
      <section className="max-w-7xl mx-auto py-24 px-4 flex flex-col items-center text-center">
        <motion.div className="relative bg-gradient-to-br from-blue-100 via-white to-gray-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100/40 p-12 flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">{t.services.pages.databaseCloudInfrastructure.finalCta.title}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-gray-400 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-blue-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/contactme'; }}><span className="relative z-10">{t.services.pages.databaseCloudInfrastructure.finalCta.button}</span></motion.button>
            <motion.button className="inline-block px-10 py-4 bg-gradient-to-r from-gray-400 to-blue-600 text-white rounded-full font-bold text-lg shadow-3xl border-2 border-transparent hover:border-gray-400 hover:shadow-[0_0_32px_0_#a78bfa] focus:outline-none focus:ring-2 focus:ring-blue-400 animate-fade-in flex items-center gap-2 relative overflow-hidden" whileHover={{ scale: 1.08, boxShadow: '0 0 32px 0 #a78bfa', filter: 'brightness(1.1)', borderColor: '#a78bfa' }} whileTap={{ scale: 0.97 }} onMouseEnter={() => playSound(hoverSfx)} onClick={() => { window.location.href = '/'; }}><FaCloud className="mr-2" />{t.services.pages.databaseCloudInfrastructure.finalCta.backHome}</motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 