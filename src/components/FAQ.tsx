import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const items = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="surface-ink-2 relative overflow-hidden py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading index="06" label="FAQ" title={t.faq.title} align="center" className="mb-6" titleClassName="!text-[clamp(1.9rem,4.5vw,3.2rem)]" />
        <Reveal className="mb-12 text-center">
          <p className="mx-auto max-w-xl text-lg text-paper-dim">{t.faq.subtitle}</p>
        </Reveal>

        <div className="space-y-3">
          {items.map((item: { q: string; a: string }, index: number) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <Reveal key={index} delay={index * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? 'border-iris/40 bg-white/[0.03]' : 'border-[var(--line)] bg-white/[0.012] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-iris sm:px-6"
                    >
                      <span className="text-base font-semibold text-paper sm:text-lg">{item.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                          isOpen ? 'bg-iris text-paper' : 'bg-white/5 text-paper-dim'
                        }`}
                      >
                        <Plus className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="-mt-1 px-5 pb-5 leading-relaxed text-paper-dim sm:px-6">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
