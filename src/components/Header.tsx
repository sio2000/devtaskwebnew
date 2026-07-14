import { useState, useEffect, memo } from 'react';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = memo(() => {
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
    { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pendingSection && location.pathname === '/') {
      document.getElementById(pendingSection)?.scrollIntoView({ behavior: 'smooth' });
      setPendingSection(null);
    }
  }, [location.pathname, pendingSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('.language-dropdown')) setIsLangMenuOpen(false);
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLangMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      setPendingSection(sectionId);
      navigate('/');
      return;
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.location.hash = `#${sectionId}`;
      }
    }, 0);
  };

  const navEntries = Object.entries(t.nav).filter(
    ([key]) => key !== 'mobileAppSamples' && key !== 'tagline' && key !== 'home'
  );

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-[var(--line)] bg-[rgba(8,8,11,0.72)] backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-3">
          {/* Logo */}
          <motion.button
            onClick={() => {
              if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              else {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex min-w-0 items-center gap-3 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm sm:h-12 sm:w-12">
              <img src={logo} alt="DevTaskHub Logo" className="h-full w-full object-contain" />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-display whitespace-nowrap text-lg font-bold tracking-tight text-paper sm:text-xl">DevTaskHub</span>
              <span className="font-editorial mt-0.5 hidden truncate text-[13px] italic text-paper-dim sm:block">{t.nav.tagline}</span>
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navEntries.map(([key, label]) => {
              if (key === 'contact') return null;
              const links = [
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="link-underline px-3 py-2 text-sm font-medium text-paper-dim transition-colors hover:text-paper"
                >
                  {label}
                </button>,
              ];
              if (key === 'portfolio') {
                links.push(
                  <button
                    key="mobileAppSamples"
                    onClick={() => scrollToSection('getfit-app-showcase')}
                    className="link-underline px-3 py-2 text-sm font-medium text-paper-dim transition-colors hover:text-paper"
                  >
                    {t.nav.mobileAppSamples}
                  </button>
                );
              }
              return links;
            })}
          </div>

          {/* Right cluster */}
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            {/* Language */}
            <div className="language-dropdown relative hidden md:block">
              <motion.button
                onClick={() => setIsLangMenuOpen((v) => !v)}
                className="flex h-10 items-center gap-2 rounded-full border border-[var(--line)] bg-white/[0.03] px-3 text-paper-dim transition-colors hover:border-[var(--line-strong)] hover:text-paper"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Change language"
              >
                <span className="text-lg leading-none">{languages.find((l) => l.code === language)?.flag}</span>
                <span className="text-sm font-semibold">{language.toUpperCase()}</span>
                <Globe className="hidden h-3.5 w-3.5 opacity-60 lg:block" />
              </motion.button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[var(--line)] bg-ink-700 shadow-2xl"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
                          language === lang.code ? 'border-l-2 border-iris text-paper' : 'text-paper-dim'
                        }`}
                      >
                        <span className="text-xl leading-none">{lang.flag}</span>
                        <span className="flex-1 text-sm">{lang.label}</span>
                        {language === lang.code && <span className="h-1.5 w-1.5 rounded-full bg-iris" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-accent group hidden h-10 px-5 text-sm md:inline-flex"
            >
              <span>{t.nav.contact}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-paper md:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3 space-y-1 rounded-2xl border border-[var(--line)] bg-ink-800/95 p-3 backdrop-blur-xl">
                <button
                  onClick={() => (location.pathname === '/' ? scrollToSection('hero') : navigate('/'))}
                  className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-paper-dim transition-colors hover:bg-white/5 hover:text-paper"
                >
                  {t.nav.home}
                </button>
                {navEntries.map(([key, label]) => {
                  if (key === 'contact') return null;
                  const items = [
                    <button
                      key={key}
                      onClick={() => scrollToSection(key)}
                      className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-paper-dim transition-colors hover:bg-white/5 hover:text-paper"
                    >
                      {label}
                    </button>,
                  ];
                  if (key === 'portfolio') {
                    items.push(
                      <button
                        key="mobileAppSamples"
                        onClick={() => scrollToSection('getfit-app-showcase')}
                        className="block w-full rounded-xl px-4 py-3 text-left text-base font-medium text-paper-dim transition-colors hover:bg-white/5 hover:text-paper"
                      >
                        {t.nav.mobileAppSamples}
                      </button>
                    );
                  }
                  return items;
                })}

                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-accent mt-2 w-full justify-center px-5 py-3.5 text-base"
                >
                  {t.nav.contact}
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                {/* Language row */}
                <div className="mt-2 flex items-center gap-2 border-t border-[var(--line)] pt-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-sm transition-colors ${
                        language === lang.code
                          ? 'border-iris/60 bg-iris/10 text-paper'
                          : 'border-[var(--line)] text-paper-dim'
                      }`}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;
