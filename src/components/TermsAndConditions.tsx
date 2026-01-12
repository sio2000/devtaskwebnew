import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const TermsAndConditions: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section className="min-h-screen py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <motion.div
        className="max-w-3xl w-full bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-14 mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-6 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.termsAndConditions.title}
        </motion.h1>
        <motion.p className="text-lg text-gray-700 mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {t.termsAndConditions.intro}
        </motion.p>
        <div className="space-y-8 text-gray-800 text-base md:text-lg">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.intellectualProperty.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.termsAndConditions.sections.intellectualProperty.content }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.identity.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.termsAndConditions.sections.identity.content }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.liability.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.termsAndConditions.sections.liability.content }} />
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t.termsAndConditions.sections.liability.additional }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.dataCollection.title}</h2>
            <p>{t.termsAndConditions.sections.dataCollection.content}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.modifications.title}</h2>
            <p>{t.termsAndConditions.sections.modifications.content}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-blue-700 mb-2">{t.termsAndConditions.sections.contact.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.termsAndConditions.sections.contact.content }} />
          </motion.div>
        </div>
        <motion.div className="mt-10 text-center text-gray-700 text-base md:text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <b>{t.termsAndConditions.acceptance}</b>
          <div className="mt-2 text-sm text-gray-400">{t.termsAndConditions.lastUpdate}</div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions; 