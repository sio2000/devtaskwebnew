import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  const languages = [
    { code: 'el' as const, label: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'fr' as const, label: 'Français', flag: '🇫🇷' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pendingSection && location.pathname === '/') {
      const el = document.getElementById(pendingSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setPendingSection(null);
    }
  }, [location.pathname, pendingSection]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('.language-dropdown')) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLangMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // Κλείνει πάντα το μενού
    if (location.pathname !== '/') {
      setPendingSection(sectionId);
      navigate('/');
      return;
    }
    // Αν είμαστε ήδη στην αρχική, κάνε scroll και force reflow αν χρειάζεται
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Ενημέρωσε το hash για να δουλεύει και σε mobile browsers
        window.location.hash = `#${sectionId}`;
      } else {
        // Αν δεν βρεθεί, δοκίμασε ξανά μετά από λίγο (για edge case)
        setTimeout(() => {
          const el2 = document.getElementById(sectionId);
          if (el2) {
            el2.scrollIntoView({ behavior: 'smooth' });
            window.location.hash = `#${sectionId}`;
          }
        }, 300);
      }
    }, 0);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Name */}
          <motion.div 
            className="flex-shrink-0 flex flex-col gap-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: 0, background: 'none', border: 'none' }}
            >
              <img src={logo} alt="DevTaskHub Logo" className="h-12 w-auto max-w-[120px] rounded-xl shadow-md transition-all duration-300 hover:shadow-xl" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300">DevTaskHub</span>
                <span className="text-[13px] sm:text-[14px] md:text-sm text-black font-bold italic leading-tight mt-[-2px]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>{t.nav.tagline}</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {Object.entries(t.nav)
                .filter(([key]) => key !== 'mobileAppSamples' && key !== 'tagline' && key !== 'home') // Αφαιρούμε το mobileAppSamples, tagline και home από το loop
                .map(([key, label], index) => {
                // Προσθήκη του "Δείγματα App" μετά το portfolio
                if (key === 'portfolio') {
                  return (
                    <React.Fragment key={key}>
                      <motion.button
                        onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {label}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                      {/* Mobile App Samples Button */}
                      <motion.button
                        onClick={() => scrollToSection('getfit-app-showcase')}
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + 0.5) * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {t.nav.mobileAppSamples}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </React.Fragment>
                  );
                }
                // Contact Button - Premium CTA Styling
                if (key === 'contact') {
                  return (
                    <motion.button
                      key={key}
                      onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative group overflow-hidden shadow-lg hover:shadow-xl h-10 flex items-center justify-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                      <span className="relative z-10">{label}</span>
                    </motion.button>
                  );
                }
                return (
                  <motion.button
                    key={key}
                    onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {label}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle Button */}
            <div className="relative language-dropdown">
              <motion.button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md h-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Change language"
              >
                <span className="text-xl leading-none">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <span className="hidden sm:inline text-sm font-semibold">
                  {languages.find(l => l.code === language)?.code.toUpperCase()}
                </span>
                <Globe className="h-4 w-4 hidden sm:block opacity-60" />
              </motion.button>
              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center gap-3 ${
                          language === lang.code 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold border-l-4 border-blue-600' 
                            : 'text-gray-700'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-2xl leading-none">{lang.flag}</span>
                        <span className="flex-1">{lang.label}</span>
                        {language === lang.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-blue-600 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-xl shadow-lg"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(t.nav)
                  .filter(([key]) => key !== 'mobileAppSamples' && key !== 'tagline' && key !== 'home') // Αφαιρούμε το mobileAppSamples, tagline και home από το loop
                  .map(([key, label], index) => {
                  // Προσθήκη του "Δείγματα App" μετά το portfolio στο mobile menu
                  if (key === 'portfolio') {
                    return (
                      <React.Fragment key={key}>
                        <motion.button
                          onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                          className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-3 text-base font-medium w-full text-left transition-all duration-300 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          {label}
                        </motion.button>
                        {/* Mobile App Samples Button - Mobile */}
                        <motion.button
                          onClick={() => scrollToSection('getfit-app-showcase')}
                          className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-3 text-base font-medium w-full text-left transition-all duration-300 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index + 0.5) * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          {t.nav.mobileAppSamples}
                        </motion.button>
                      </React.Fragment>
                    );
                  }
                  // Contact Button - Mobile - Premium CTA Styling
                  if (key === 'contact') {
                    return (
                      <motion.button
                        key={key}
                        onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl text-base font-semibold w-full text-center transition-all duration-300 shadow-lg hover:shadow-xl mt-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
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
                        <span className="relative z-10">{label}</span>
                      </motion.button>
                    );
                  }
                  return (
                    <motion.button
                      key={key}
                      onClick={() => scrollToSection(key === 'home' ? 'hero' : key)}
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-3 text-base font-medium w-full text-left transition-all duration-300 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;