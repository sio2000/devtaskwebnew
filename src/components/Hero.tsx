import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import webImage from '../assets/web.jpg';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  const slides = t.hero.slides.map((slide, index) => ({
    ...slide,
    gradient: index === 0 ? 'from-blue-600 via-purple-600 to-teal-600' : index === 1 ? 'from-emerald-600 via-blue-600 to-purple-600' : 'from-blue-700 via-purple-700 to-teal-500',
    bgPattern: index === 0 ? 'opacity-20' : index === 1 ? 'opacity-30' : 'opacity-25'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="hero" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isMobile ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600' : ''}`}>
      {/* Animated Background, Static Elements, Geometric Patterns, Scroll Indicator: ΜΟΝΟ σε desktop */}
      {!isMobile && (
        <>
          <div className="absolute inset-0">
            {/* Background Image - Desktop Only (Behind everything) */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src={webImage}
                alt="Web Development Background"
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.6,
                }}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
                style={{ mixBlendMode: 'multiply' }}
              />
            </AnimatePresence>
            {/* Enhanced Multi-Layer Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-purple-400/5 to-blue-400/5" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/12 to-blue-500/12"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            {/* Radial Gradient Overlays for Depth */}
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-30"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
              }}
            />
            <div 
              className="absolute bottom-0 right-0 w-full h-full opacity-25"
              style={{
                background: 'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              }}
            />
            {/* Static Background Elements - Enhanced with More Layers */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Primary Glow Orbs */}
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/18 rounded-full blur-3xl shadow-premium-glow" />
              <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-white/18 rounded-full blur-3xl shadow-premium-glow" />
              <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl shadow-xl" />
              
              {/* Secondary Accent Orbs */}
              <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-cyan-400/12 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 left-1/5 w-44 h-44 bg-purple-400/12 rounded-full blur-3xl" />
              
              {/* Tertiary Depth Layers */}
              <div className="absolute top-1/3 right-1/5 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/2 left-2/3 w-52 h-52 bg-teal-400/12 rounded-full blur-3xl" />
              
              {/* Additional Subtle Layers */}
              <div className="absolute top-1/5 right-1/4 w-36 h-36 bg-indigo-400/8 rounded-full blur-2xl" />
              <div className="absolute bottom-1/5 left-1/3 w-32 h-32 bg-pink-400/8 rounded-full blur-2xl" />
              <div className="absolute top-2/3 left-1/6 w-40 h-40 bg-violet-400/8 rounded-full blur-2xl" />
            </div>
            {/* Enhanced Static Geometric Patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-5 h-5 bg-white/90 transform rotate-45 shadow-lg shadow-white/50" />
              <div className="absolute top-40 right-32 w-7 h-7 bg-white/90 rounded-full shadow-lg shadow-white/50" />
              <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white/90 transform rotate-45 shadow-lg shadow-white/50" />
              <div className="absolute bottom-20 right-20 w-6 h-6 bg-white/90 rounded-full shadow-lg shadow-white/50" />
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/70 rounded-full shadow-md" />
              <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-white/80 transform rotate-45 shadow-md" />
              <div className="absolute top-1/4 right-1/6 w-3 h-3 bg-white/75 rounded-full" />
              <div className="absolute bottom-1/4 left-2/5 w-4 h-4 bg-white/75 transform rotate-45" />
            </div>
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
        </>
      )}
      {/* Content - Enhanced with Premium Glassmorphism Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {!isMobile && (
          <>
            {/* Outer Glow Effect */}
            <motion.div
              className="absolute inset-0 mx-auto max-w-5xl rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                boxShadow: '0 0 80px rgba(139, 92, 246, 0.3), 0 0 120px rgba(59, 130, 246, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.05)',
              }}
            />
            {/* Main Glass Container */}
            <motion.div
              className="absolute inset-0 mx-auto max-w-5xl glass-luxury-strong rounded-3xl shadow-luxury-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Inner Glow Border */}
            <motion.div
              className="absolute inset-0 mx-auto max-w-5xl rounded-3xl border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </>
        )}
        <div className={`text-center text-white ${!isMobile ? 'relative z-10' : ''}`}>
          {/* Carousel Content */}
          {isMobile ? (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-shadow-luxury break-words overflow-wrap-anywhere"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-95 text-shadow-luxury"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              {/* CTA Buttons - Mobile View - Different buttons per slide */}
              <motion.div
                className="flex flex-col gap-4 justify-center items-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {currentSlide === 0 && (
                  <motion.button
                    key="cta-services-mobile"
                    onClick={() => scrollToSection('services')}
                    className="group relative w-full max-w-xs bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 active:scale-95 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                      }}
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    />
                    <span className="relative z-10">{t.hero.cta}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>
                )}
                {currentSlide === 1 && (
                  <motion.button
                    key="cta-portfolio-mobile"
                    onClick={() => scrollToSection('portfolio')}
                    className="group relative w-full max-w-xs bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 active:scale-95 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                      }}
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    />
                    <span className="relative z-10">{t.hero.websiteSamples}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>
                )}
                {currentSlide === 2 && (
                  <motion.button
                    key="cta-getfit-mobile"
                    onClick={() => scrollToSection('getfit-app-showcase')}
                    className="group relative w-full max-w-xs bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 active:scale-95 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'linear',
                      }}
                      style={{
                        backgroundSize: '200% 100%',
                      }}
                    />
                    <span className="relative z-10">iOS & Android</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>
                )}
                <motion.button
                  key="cta-contact-mobile"
                  onClick={() => scrollToSection('contact')}
                  className="group relative w-full max-w-xs glass-luxury-strong text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/15 transition-all duration-300 border-2 border-white/40 hover:border-white/60 flex items-center justify-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow transform hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t.hero.contact}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <motion.h1 
                  className={`text-4xl sm:text-5xl ${language === 'fr' ? (currentSlide === 2 ? 'lg:text-4xl xl:text-5xl' : 'lg:text-5xl xl:text-6xl') : (currentSlide === 2 ? 'lg:text-5xl xl:text-6xl' : (currentSlide === 1 && language === 'en' ? 'lg:text-5xl xl:text-6xl' : (currentSlide === 0 && language === 'en' ? 'lg:text-5xl xl:text-6xl' : 'lg:text-7xl')))} font-bold mb-6 leading-tight text-shadow-premium tracking-luxury break-words overflow-wrap-anywhere`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-95 text-shadow-luxury tracking-luxury"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                {/* CTA Buttons - Enhanced with Premium Styling - Different buttons per slide */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  {currentSlide === 0 && (
                    <motion.button
                      key="cta-services"
                      onClick={() => scrollToSection('services')}
                      className="group relative bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'linear',
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                      />
                      <span className="relative z-10">{t.hero.cta}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </motion.button>
                  )}
                  {currentSlide === 1 && (
                    <motion.button
                      key="cta-portfolio"
                      onClick={() => scrollToSection('portfolio')}
                      className="group relative bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'linear',
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                      />
                      <span className="relative z-10">{t.hero.websiteSamples}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </motion.button>
                  )}
                  {currentSlide === 2 && (
                    <motion.button
                      key="cta-getfit"
                      onClick={() => scrollToSection('getfit-app-showcase')}
                      className="group relative bg-white text-gray-900 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow-lg transform hover:scale-105 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'linear',
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                      />
                      <span className="relative z-10">iOS & Android</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </motion.button>
                  )}
                  <motion.button
                    key="cta-contact"
                    onClick={() => scrollToSection('contact')}
                    className="group relative glass-luxury-strong text-white px-10 py-5 rounded-2xl font-semibold hover:bg-white/15 transition-all duration-300 border-2 border-white/40 hover:border-white/60 flex items-center space-x-3 shadow-luxury-lg hover:shadow-premium-glow transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{t.hero.contact}</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          {/* Carousel Navigation - Desktop Only */}
          {!isMobile && (
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass-luxury-strong hover:bg-white/25 transition-all duration-300 backdrop-blur-md shadow-luxury border border-white/30 hover:border-white/50"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-10 h-3 bg-white shadow-lg shadow-white/50' 
                        : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass-luxury-strong hover:bg-white/25 transition-all duration-300 backdrop-blur-md shadow-luxury border border-white/30 hover:border-white/50"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
      {/* Carousel Navigation - Mobile Only (Bottom of Hero Section) */}
      {isMobile && (
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center space-x-6 px-4">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full glass-luxury-strong hover:bg-white/25 transition-all duration-300 backdrop-blur-md shadow-luxury border border-white/30 hover:border-white/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-white shadow-lg shadow-white/50' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full glass-luxury-strong hover:bg-white/25 transition-all duration-300 backdrop-blur-md shadow-luxury border border-white/30 hover:border-white/50"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}
      {/* Scroll Indicator - Enhanced Premium Design */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative w-7 h-14 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm glass-luxury shadow-luxury-lg">
            <motion.div
              className="w-1.5 h-4 bg-white rounded-full mt-2.5 shadow-lg"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          {/* Glow effect around scroll indicator */}
          <motion.div
            className="absolute inset-0 w-7 h-14 bg-white/20 rounded-full blur-xl -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
