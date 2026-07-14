import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ExternalLink, Smartphone, Monitor, BarChart3, Heart, ChevronLeft, ChevronRight, ShoppingBag, Building2, ArrowUpRight, X } from 'lucide-react';
import { FaApple, FaAndroid, FaCloud, FaRocket, FaHeartbeat, FaMapMarkedAlt, FaGift, FaParking } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import architectureImg from '../assets/architecture.png';
import hydrogenImg from '../assets/hydrogen.png';
import wellbeingImg from '../assets/Wellbeing.png';
import cryptoImg from '../assets/crypto.png';
import hotelImg from '../assets/Hotel.png';
import clinicImg from '../assets/clinic.png';
import jewelsImg from '../assets/jewels.png';
import advancedDermaImg from '../assets/advanceddermaimage.png';
import leonidionHousesImg from '../assets/leonidionhouses.png';
import bagImg from '../assets/bag.png';
import tparkingSiteImg from '../assets/tparking.png';
import Reveal from './ui/Reveal';
import TiltCard from './ui/TiltCard';
import SectionHeading from './ui/SectionHeading';
import Marquee from './ui/Marquee';
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
// T-Parking App Images
import tparkingLogo from '../assets/tparkinglogo.png';
import tparkingMap from '../assets/tparkingmap.png';
import tparkingNavigation from '../assets/tparkingnavigation.png';
import tparkingAwards from '../assets/tparkingawards.png';
import tparkingHistory from '../assets/tparkingparkinghistory.png';

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
  { img: v12Img, alt: 'GetFit App Screen 12' },
];

const tParkingImages = [
  { img: tparkingMap, altKey: 'Real-time Parking Map' },
  { img: tparkingNavigation, altKey: 'Smart Navigation' },
  { img: tparkingAwards, altKey: 'Rewards & Coupons' },
  { img: tparkingHistory, altKey: 'Parking History' },
];

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const tp = (t as any).portfolio ?? {};
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenAlt, setFullscreenAlt] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isGetFitImage, setIsGetFitImage] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openFullscreen = (imageSrc: string, alt: string) => {
    const index = getFitImages.findIndex((img) => img.img === imageSrc);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setIsGetFitImage(true);
    } else {
      setIsGetFitImage(false);
    }
    setFullscreenImage(imageSrc);
    setFullscreenAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenAlt('');
    setCurrentImageIndex(0);
    setIsGetFitImage(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : getFitImages.length - 1;
      setFullscreenImage(getFitImages[newIndex].img);
      setFullscreenAlt(getFitImages[newIndex].alt);
      return newIndex;
    });
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev < getFitImages.length - 1 ? prev + 1 : 0;
      setFullscreenImage(getFitImages[newIndex].img);
      setFullscreenAlt(getFitImages[newIndex].alt);
      return newIndex;
    });
  }, []);

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
    if (distance > 50) goToNext();
    if (distance < -50) goToPrevious();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
      else if (isGetFitImage && e.key === 'ArrowLeft') goToPrevious();
      else if (isGetFitImage && e.key === 'ArrowRight') goToNext();
    };
    if (fullscreenImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [fullscreenImage, isGetFitImage, goToPrevious, goToNext]);

  const projects = useMemo(() => {
    const p = (t as any).portfolio?.projects ?? {};
    return [
      { key: 'clinic', icon: Heart, image: clinicImg, technologies: ['React', 'Telemedicine', 'Healthcare', 'Booking'], title: p.clinic?.title ?? 'Clinic', description: p.clinic?.description ?? '', url: 'https://onlineparentteenclinic.com/' },
      { key: 'advancedDerma', icon: Heart, image: advancedDermaImg, technologies: ['React', 'Booking', 'Gallery', 'Healthcare'], title: p.advancedDerma?.title ?? 'Advanced Derma', description: p.advancedDerma?.description ?? '', url: 'https://advanced-derma.com/' },
      { key: 'architecture', icon: Monitor, image: architectureImg, technologies: ['React', 'Tailwind', 'SEO'], title: p.architecture?.title ?? 'Architecture', description: p.architecture?.description ?? '', url: 'https://in-mavridis.gr/' },
      { key: 'wellness', icon: Smartphone, image: hydrogenImg, technologies: ['Next.js', 'Booking', 'CMS'], title: p.wellness?.title ?? 'Wellness', description: p.wellness?.description ?? '', url: 'https://hydrogenlife.eu/' },
      { key: 'hotel', icon: Monitor, image: hotelImg, technologies: ['React', 'Gallery', 'Booking'], title: p.hotel?.title ?? 'Hotel', description: p.hotel?.description ?? '', url: 'https://serenity-hotel-lux.netlify.app/' },
      { key: 'leonidionHouses', icon: Building2, image: leonidionHousesImg, technologies: ['Booking', 'Online Payments', 'Admin Panel', 'Multi-Property'], title: p.leonidionHouses?.title ?? 'Leonidion Houses', description: p.leonidionHouses?.description ?? '', url: 'https://www.leonidionhouses.com/' },
      { key: 'crypto', icon: BarChart3, image: cryptoImg, technologies: ['React', 'Landing', 'Animation'], title: p.crypto?.title ?? 'Crypto', description: p.crypto?.description ?? '', url: 'https://panitoscryptocoin.com/' },
      { key: 'blog', icon: Heart, image: wellbeingImg, technologies: ['Blog', 'Content', 'Wellness'], title: p.blog?.title ?? 'Blog', description: p.blog?.description ?? '', url: 'https://clever-peony-930036.netlify.app/' },
      { key: 'jewelry', icon: Monitor, image: jewelsImg, technologies: ['Luxury', 'E-commerce', 'Jewelry', 'Watches'], title: p.jewelry?.title ?? 'Jewelry Store', description: p.jewelry?.description ?? '', url: 'https://stsrr.netlify.app/' },
      { key: 'handmadeBags', icon: ShoppingBag, image: bagImg, technologies: ['E-commerce', 'Handmade', 'Leather', 'Branding'], title: p.handmadeBags?.title ?? 'HANDSTUFF Handmade Bags', description: p.handmadeBags?.description ?? '', url: 'https://idyllic-mermaid-415d9f.netlify.app/' },
      { key: 'tparkingSite', icon: Smartphone, image: tparkingSiteImg, technologies: ['Landing Page', 'Real-time', 'Maps', 'App Promotion'], title: p.tparkingSite?.title ?? 'T-Parking', description: p.tparkingSite?.description ?? '', url: 'https://t-parking.com/' },
    ];
  }, [t, language]);

  const platformPill = 'flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:border-iris/40 hover:bg-iris/10';

  return (
    <section id="portfolio" className="surface-ink relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          label="Portfolio"
          title={tp.title ?? 'Selected work'}
          kicker={language === 'el' ? 'ζωντανά έργα' : language === 'fr' ? 'projets en ligne' : 'live projects'}
          align="center"
          className="mb-16"
        />
        {tp.subtitle && (
          <Reveal className="-mt-10 mb-16 text-center">
            <p className="mx-auto max-w-2xl text-lg text-paper-dim">{tp.subtitle}</p>
          </Reveal>
        )}

        {/* Projects bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ key, icon: Icon, image, technologies, title, description, url }, i) => (
            <Reveal key={key} delay={(i % 3) * 0.07}>
              <TiltCard max={5} className="h-full">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-ink group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 text-paper backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-sm font-medium text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <ExternalLink className="h-4 w-4" /> {t.portfolio.viewProject}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-paper transition-colors group-hover:text-iris-bright">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-dim">{description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span key={tech} className="tag-ink">{tech}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ===================== Mobile app showcases ===================== */}
      <section id="getfit-app-showcase" className="mx-auto mt-28 max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          label={language === 'el' ? 'Εφαρμογές Κινητών' : language === 'fr' ? 'Applications Mobiles' : 'Mobile Apps'}
          title={t.portfolio.appShowcase.title}
          align="center"
          className="mb-14"
        />

        {/* GetFit */}
        <Reveal>
          <div className="card-ink overflow-hidden p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2">
                    <img src={logoGymImg} alt="GetFit Logo" className="h-full w-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-paper">GetFit</h3>
                </div>
                <p className="text-lg leading-relaxed text-paper-dim">{t.portfolio.appShowcase.getFit.description}</p>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.portfolio.appShowcase.getFit.featuresTitle}</h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {t.portfolio.appShowcase.getFit.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white/[0.02] px-4 py-3">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-iris" />
                        <span className="text-sm text-paper">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.portfolio.appShowcase.getFit.platformsTitle}</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: <FaApple />, name: t.portfolio.appShowcase.getFit.platforms.ios, url: 'https://apps.apple.com/us/app/getfit-skg/id6753928093' },
                      { icon: <FaAndroid />, name: t.portfolio.appShowcase.getFit.platforms.android, url: null },
                      { icon: <FaCloud />, name: t.portfolio.appShowcase.getFit.platforms.web, url: 'https://getfitskg.com/' },
                    ].map((platform) => {
                      const Comp: any = platform.url ? 'a' : 'div';
                      const props = platform.url ? { href: platform.url, target: '_blank', rel: 'noopener noreferrer' } : {};
                      return (
                        <Comp key={platform.name} className={platformPill} {...props}>
                          <span className="text-lg">{platform.icon}</span>
                          <span>{platform.name}</span>
                        </Comp>
                      );
                    })}
                  </div>
                </div>

                <a
                  href="https://www.getfitskg.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent group px-7 py-3.5 text-base"
                >
                  <FaRocket />
                  {t.portfolio.appShowcase.getFit.viewApp}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Rotating screenshot carousel */}
              <div className="relative">
                <div className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-iris text-paper shadow-lg">
                  <FaHeartbeat />
                </div>
                <div className="space-y-4 rounded-3xl border border-[var(--line)] bg-white/[0.02] p-5">
                  <Marquee duration={34}>
                    {getFitImages.slice(0, 6).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => openFullscreen(item.img, item.alt)}
                        className="mx-2 overflow-hidden rounded-2xl border border-[var(--line)] transition-transform duration-300 hover:scale-[1.04]"
                        aria-label={item.alt}
                      >
                        <img src={item.img} alt={item.alt} className="h-40 w-24 object-cover" loading="lazy" />
                      </button>
                    ))}
                  </Marquee>
                  <Marquee duration={34} reverse>
                    {getFitImages.slice(6, 12).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => openFullscreen(item.img, item.alt)}
                        className="mx-2 overflow-hidden rounded-2xl border border-[var(--line)] transition-transform duration-300 hover:scale-[1.04]"
                        aria-label={item.alt}
                      >
                        <img src={item.img} alt={item.alt} className="h-40 w-24 object-cover" loading="lazy" />
                      </button>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* T-Parking */}
        <Reveal>
          <div className="card-ink mt-8 overflow-hidden p-8 md:p-12">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <span className="tag-ink border-iris/30 text-paper"><FaParking className="text-iris-bright" /> {t.portfolio.appShowcase.tParking.stats.firstInGreece}</span>
              <span className="tag-ink border-iris/30 text-paper"><FaMapMarkedAlt className="text-signal" /> {t.portfolio.appShowcase.tParking.stats.realTime}</span>
              <span className="tag-ink border-iris/30 text-paper"><FaGift className="text-amber-soft" /> {t.portfolio.appShowcase.tParking.stats.free}</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2">
                    <img src={tparkingLogo} alt="T-Parking Logo" className="h-full w-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-paper">{t.portfolio.appShowcase.tParking.name}</h3>
                </div>
                <p className="font-editorial text-xl italic text-iris-gradient">{t.portfolio.appShowcase.tParking.tagline}</p>
                <p className="text-lg leading-relaxed text-paper-dim">{t.portfolio.appShowcase.tParking.description}</p>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.portfolio.appShowcase.tParking.featuresTitle}</h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {t.portfolio.appShowcase.tParking.features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white/[0.02] px-4 py-3">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                        <span className="text-sm text-paper">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.portfolio.appShowcase.tParking.platformsTitle}</h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: <FaApple />, name: t.portfolio.appShowcase.tParking.platforms.ios, url: 'https://apps.apple.com/gr/app/t-parking/id6756634872' },
                      { icon: <FaAndroid />, name: t.portfolio.appShowcase.tParking.platforms.android, url: 'https://play.google.com/store/apps/details?id=com.tparking.app' },
                      { icon: <FaCloud />, name: t.portfolio.appShowcase.tParking.platforms.web, url: 'https://t-parking.com/' },
                    ].map((platform) => (
                      <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className={platformPill}>
                        <span className="text-lg">{platform.icon}</span>
                        <span>{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <a href="https://t-parking.com/" target="_blank" rel="noopener noreferrer" className="btn-accent group px-7 py-3.5 text-base">
                  <FaParking />
                  {t.portfolio.appShowcase.tParking.viewApp}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {tParkingImages.map((item, idx) => (
                  <TiltCard key={idx} max={8}>
                    <button
                      onClick={() => openFullscreen(item.img, item.altKey)}
                      className="block w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.02]"
                      aria-label={item.altKey}
                    >
                      <img src={item.img} alt={item.altKey} className="h-52 w-full object-cover md:h-56" loading="lazy" />
                    </button>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Fullscreen image modal */}
      {fullscreenImage && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeFullscreen}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {isGetFitImage && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-colors hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {isGetFitImage && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-colors hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            <motion.img
              src={fullscreenImage}
              alt={fullscreenAlt}
              className="mx-auto max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              key={fullscreenImage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={closeFullscreen}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute inset-x-4 bottom-4 text-center">
              <p className="inline-block rounded-lg bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
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
