import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ExternalLink, Smartphone, Monitor, BarChart3, Gamepad2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaApple, FaAndroid, FaCloud, FaRocket, FaHeartbeat } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import architectureImg from '../assets/architecture.png';
import hydrogenImg from '../assets/hydrogen.png';
import videoImg from '../assets/video.jpg';
import cryptoImg from '../assets/crypto.png';
import hotelImg from '../assets/Hotel.png';
import clinicImg from '../assets/clinic.png';
import { useIsMobile } from '../hooks/useIsMobile';
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

// GetFit images array
const getFitImages = [
  { img: v1Img, alt: 'GetFit App Screen 1' },
  { img: v2Img, alt: 'GetFit App Screen 2' },
  { img: v3Img, alt: 'GetFit App Screen 3' },
  { img: v4Img, alt: 'GetFit App Screen 4' },
  { img: v5Img, alt: 'GetFit App Screen 5' },
  { img: v6Img, alt: 'GetFit App Screen 6' },
  { img: v7Img, alt: 'GetFit App Screen 7' },
  { img: v8Img, alt: 'GetFit App Screen 8' },
  { img: v9Img, alt: 'GetFit App Screen 9' },
  { img: v10Img, alt: 'GetFit App Screen 10' },
  { img: v11Img, alt: 'GetFit App Screen 11' },
  { img: v12Img, alt: 'GetFit App Screen 12' }
];

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenAlt, setFullscreenAlt] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isGetFitImage, setIsGetFitImage] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const openFullscreen = (imageSrc: string, alt: string) => {
    const index = getFitImages.findIndex(img => img.img === imageSrc);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setIsGetFitImage(true);
      setFullscreenImage(imageSrc);
      setFullscreenAlt(alt);
      document.body.style.overflow = 'hidden';
    } else {
      setIsGetFitImage(false);
      setFullscreenImage(imageSrc);
      setFullscreenAlt(alt);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenAlt('');
    setCurrentImageIndex(0);
    setIsGetFitImage(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : getFitImages.length - 1;
      setFullscreenImage(getFitImages[newIndex].img);
      setFullscreenAlt(getFitImages[newIndex].alt);
      return newIndex;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => {
      const newIndex = prev < getFitImages.length - 1 ? prev + 1 : 0;
      setFullscreenImage(getFitImages[newIndex].img);
      setFullscreenAlt(getFitImages[newIndex].alt);
      return newIndex;
    });
  }, []);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isGetFitImage) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isGetFitImage) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isGetFitImage || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation and close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (isGetFitImage && e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (isGetFitImage && e.key === 'ArrowRight') {
        goToNext();
      }
    };

    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [fullscreenImage, isGetFitImage, goToPrevious, goToNext]);

  const projects = useMemo(() => [
    {
      key: 'clinic',
      icon: Heart,
      image: clinicImg,
      technologies: ['React', 'Telemedicine', 'Healthcare', 'Booking'],
      gradient: 'from-red-500 to-pink-600',
      title: t.portfolio.projects.clinic.title,
      description: t.portfolio.projects.clinic.description,
      url: 'https://onlineparentteenclinic.com/'
    },
    {
      key: 'architecture',
      icon: Monitor,
      image: architectureImg,
      technologies: ['React', 'Tailwind', 'SEO'],
      gradient: 'from-blue-500 to-purple-600',
      title: t.portfolio.projects.architecture.title,
      description: t.portfolio.projects.architecture.description,
      url: 'https://in-mavridis.gr/'
    },
    {
      key: 'wellness',
      icon: Smartphone,
      image: hydrogenImg,
      technologies: ['Next.js', 'Booking', 'CMS'],
      gradient: 'from-green-500 to-teal-600',
      title: t.portfolio.projects.wellness.title,
      description: t.portfolio.projects.wellness.description,
      url: 'https://hydrogenlife.eu/'
    },
    {
      key: 'hotel',
      icon: Monitor,
      image: hotelImg,
      technologies: ['React', 'Gallery', 'Booking'],
      gradient: 'from-blue-400 to-indigo-500',
      title: t.portfolio.projects.hotel.title,
      description: t.portfolio.projects.hotel.description,
      url: 'https://684ad438cfcdad7a5e3a8db8--serenity-hotel-lux.netlify.app/'
    },
    {
      key: 'crypto',
      icon: BarChart3,
      image: cryptoImg,
      technologies: ['React', 'Landing', 'Animation'],
      gradient: 'from-yellow-500 to-pink-500',
      title: t.portfolio.projects.crypto.title,
      description: t.portfolio.projects.crypto.description,
      url: 'https://panitoscryptocoin.com/'
    }
  ], [t, language]);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background Decorations: ΜΟΝΟ σε desktop */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-green-200/20 to-teal-200/20 rounded-full blur-xl"
          />
        </div>
      )}
      {/* Section Divider: ΜΟΝΟ σε desktop */}
      {!isMobile && (
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t.portfolio.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.portfolio.subtitle}</p>
        </div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(({ key, icon: Icon, image, technologies, gradient, title, description, url }) => (
            <div
              key={key}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  {/* Project Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  {/* View Project Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 shadow-xl"
                    >
                      <span>{t.portfolio.viewProject}</span>
                    </a>
                  </div>
                </div>
                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {description}
                  </p>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover Glow Effect: ΜΟΝΟ σε desktop */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section Divider: ΜΟΝΟ σε desktop */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white transform rotate-180">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      )}

      {/* Portfolio Showcase - GetFit App */}
      <section id="getfit-app-showcase" className="max-w-7xl mx-auto py-24 px-4">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">{t.portfolio.appShowcase.title}</motion.h2>
        
        {/* GetFit App Showcase */}
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
                    { icon: <FaApple className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.ios, color: 'from-gray-800 to-gray-600', url: 'https://apps.apple.com/us/app/getfit-skg/id6753928093' },
                    { icon: <FaAndroid className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.android, color: 'from-green-500 to-green-600', url: null },
                    { icon: <FaCloud className="text-2xl" />, name: t.portfolio.appShowcase.getFit.platforms.web, color: 'from-blue-500 to-blue-600', url: 'https://getfitskg.com/' }
                  ].map((platform, idx) => {
                    const Component = platform.url ? motion.a : motion.div;
                    const props = platform.url ? {
                      href: platform.url,
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    } : {};
                    
                    return (
                      <Component 
                        key={platform.name}
                        className={`flex items-center gap-3 bg-gradient-to-r ${platform.color} text-white rounded-xl px-4 py-3 shadow-lg cursor-pointer`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        {...props}
                      >
                        {platform.icon}
                        <span className="font-semibold">{platform.name}</span>
                      </Component>
                    );
                  })}
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
                Δείτε την Εφαρμογή
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
                  {getFitImages.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="bg-white rounded-2xl p-2 shadow-lg overflow-hidden cursor-pointer"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 0,
                        zIndex: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openFullscreen(item.img, item.alt)}
                    >
                      <img 
                        src={item.img} 
                        alt={item.alt}
                        className="w-full h-24 object-cover rounded-xl"
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
      </section>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullscreen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div 
            className="relative max-w-4xl max-h-full w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrow - Previous */}
            {isGetFitImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-colors duration-200 shadow-lg z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Navigation Arrow - Next */}
            {isGetFitImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-colors duration-200 shadow-lg z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.img 
              src={fullscreenImage} 
              alt={fullscreenAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto"
              key={fullscreenImage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={closeFullscreen}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors duration-200 shadow-lg z-10"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                {fullscreenAlt} {isGetFitImage && `(${currentImageIndex + 1}/${getFitImages.length})`}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;