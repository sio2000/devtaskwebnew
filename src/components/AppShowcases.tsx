import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FaAppStoreIos, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { appProjects, type AppProject } from '../data/work';
import Reveal from './ui/Reveal';

const SCREEN_INTERVAL = 3200;

/** App Store icon in its own colours: blue gradient tile, white glyph. */
const AppStoreIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`relative inline-flex h-[1.15em] w-[1.15em] ${className}`} aria-hidden="true">
    <span className="absolute inset-[12%] rounded-[18%] bg-white" />
    <FaAppStoreIos className="relative h-full w-full" fill="url(#appstore-gradient)" />
  </span>
);

/** Google Play icon in its own four colours. */
const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 512 512" className={`h-[1.1em] w-[1.1em] ${className}`} aria-hidden="true">
    <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
    <path fill="#EA4335" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
    <path fill="#FBBC04" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
    <path fill="#34A853" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

type Lightbox = { app: AppProject; index: number } | null;

/** Phone frame that cross-fades through an app's screens while it is on screen. */
const PhoneCarousel: React.FC<{ app: AppProject; onOpen: (index: number) => void }> = ({ app, onOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-80px' });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = app.screens.length;

  useEffect(() => {
    if (!inView || reduced || count < 2) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % count), SCREEN_INTERVAL);
    return () => clearInterval(id);
  }, [inView, reduced, count]);

  const side = (offset: number) => app.screens[(index + offset + count) % count];

  return (
    <div ref={ref} className="relative mx-auto flex w-full max-w-md items-center justify-center py-4">
      {/* Flanking screens: the previous and next ones, dimmed */}
      {count > 2 &&
        [-1, 1].map((offset) => (
          <div
            key={offset}
            aria-hidden="true"
            className={`absolute top-1/2 hidden w-[34%] -translate-y-1/2 overflow-hidden rounded-[1.4rem] border border-[var(--line)] opacity-40 sm:block ${
              offset < 0 ? 'left-0 -rotate-6' : 'right-0 rotate-6'
            }`}
          >
            <img src={side(offset).src} alt="" className="aspect-[9/19] w-full object-cover object-top" loading="lazy" />
          </div>
        ))}

      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={app.screens[index].alt}
        className="relative z-10 w-[52%] min-w-[190px] overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-ink p-1.5 shadow-[0_40px_80px_-40px_rgba(110,86,248,0.6)] transition-transform duration-500 hover:scale-[1.02]"
      >
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-ink">
          {app.screens.map((screen, i) => (
            <motion.img
              key={screen.src}
              src={screen.src}
              alt={i === index ? screen.alt : ''}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      </button>

      {/* Progress dots */}
      {count > 1 && count <= 6 && (
        <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
          {app.screens.map((s, i) => (
            <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-5 bg-paper' : 'w-1.5 bg-white/20'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const AppShowcases: React.FC = () => {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback((dir: number) => {
    setLightbox((lb) => (lb ? { app: lb.app, index: (lb.index + dir + lb.app.screens.length) % lb.app.screens.length } : lb));
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  const pill =
    'flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:border-iris/40 hover:bg-iris/10';

  return (
    <>
      {/* Gradient used by AppStoreIcon */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="appstore-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#18BFFB" />
            <stop offset="1" stopColor="#2072F3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="space-y-8">
        {appProjects.map((app, i) => {
          const stores = [
            { url: app.ios, label: 'App Store', Icon: AppStoreIcon },
            { url: app.android, label: 'Google Play', Icon: GooglePlayIcon },
            { url: app.web, label: 'Website', Icon: FaGlobe },
          ].filter((s) => s.url);
          const flip = i % 2 === 1;
          return (
            <Reveal key={app.key}>
              <article className="card-ink overflow-hidden p-7 md:p-12">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <div className={`space-y-6 ${flip ? 'lg:order-2' : ''}`}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5">
                        <img src={app.logo} alt={`${app.name} logo`} className="h-full w-full rounded-xl object-contain" loading="lazy" />
                      </span>
                      <h3 className="font-display text-3xl font-bold text-paper">{app.name}</h3>
                    </div>

                    <p className="font-editorial text-2xl italic leading-snug text-iris-gradient">{app.tagline[language]}</p>
                    <p className="max-w-xl text-lg leading-relaxed text-paper-dim">{app.description[language]}</p>

                    {app.badges && (
                      <div className="flex flex-wrap gap-2">
                        {app.badges[language].map((b) => (
                          <span key={b} className="tag-ink border-iris/30 text-paper">{b}</span>
                        ))}
                      </div>
                    )}

                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {app.features[language].map((feature) => (
                        <li key={feature} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white/[0.02] px-4 py-3">
                          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${app.dot}`} />
                          <span className="text-sm text-paper">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3 pt-1">
                      {stores.map(({ url, label, Icon }) => (
                        <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={pill} aria-label={`${app.name}: ${label}`}>
                          <Icon className="text-base" />
                          <span>{label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-paper-muted" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className={flip ? 'lg:order-1' : ''}>
                    <PhoneCarousel app={app} onOpen={(index) => setLightbox({ app, index })} />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={close}
          onTouchStart={(e) => { touchStart.current = e.targetTouches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const distance = touchStart.current - e.changedTouches[0].clientX;
            if (distance > 50) step(1);
            if (distance < -50) step(-1);
            touchStart.current = null;
          }}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.app.name}
        >
          <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={lightbox.app.screens[lightbox.index].src}
              src={lightbox.app.screens[lightbox.index].src}
              alt={lightbox.app.screens[lightbox.index].alt}
              className="mx-auto max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <button
              onClick={() => step(-1)}
              className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-colors hover:bg-white sm:-left-16"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => step(1)}
              className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-colors hover:bg-white sm:-right-16"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={close}
              className="absolute -top-3 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-100 sm:-right-3"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="mt-3 text-center text-sm text-paper-dim">
              {lightbox.app.name} · {lightbox.index + 1}/{lightbox.app.screens.length}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AppShowcases;
