import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const items = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-5 border border-blue-100">
            <MessageCircleQuestion className="w-4 h-4" aria-hidden="true" />
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text-blue mb-4"
          >
            {t.faq.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.faq.subtitle}</p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <motion.div
                key={index}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? 'border-blue-200 bg-white shadow-lg shadow-blue-500/5'
                    : 'border-gray-200 bg-white/70 hover:border-blue-200'
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isOpen ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Plus className="w-5 h-5" aria-hidden="true" />
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
                      <p className="px-5 sm:px-6 pb-5 -mt-1 text-gray-600 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
