import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import { FileText, Shield, AlertCircle, Database, Edit, Mail, CheckCircle, ShieldCheck, Scale, UserCheck, Cookie, Lock, Globe2, RefreshCw } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();

  const sections = [
    {
      icon: FileText,
      title: t.termsAndConditions.sections.intellectualProperty.title,
      content: t.termsAndConditions.sections.intellectualProperty.content,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: Shield,
      title: t.termsAndConditions.sections.identity.title,
      content: t.termsAndConditions.sections.identity.content,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: AlertCircle,
      title: t.termsAndConditions.sections.liability.title,
      content: t.termsAndConditions.sections.liability.content,
      additional: t.termsAndConditions.sections.liability.additional,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
    },
    {
      icon: Database,
      title: t.termsAndConditions.sections.dataCollection.title,
      content: t.termsAndConditions.sections.dataCollection.content,
      gradient: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/10 to-teal-500/10',
    },
    {
      icon: ShieldCheck,
      title: t.termsAndConditions.sections.privacyPolicy.title,
      content: t.termsAndConditions.sections.privacyPolicy.content,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-500/10 to-green-600/10',
    },
    {
      icon: Scale,
      title: t.termsAndConditions.sections.gdprCompliance.title,
      content: t.termsAndConditions.sections.gdprCompliance.content,
      gradient: 'from-blue-600 to-indigo-600',
      bgGradient: 'from-blue-600/10 to-indigo-600/10',
    },
    {
      icon: Shield,
      title: t.termsAndConditions.sections.legalBasis.title,
      content: t.termsAndConditions.sections.legalBasis.content,
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-500/10 to-purple-600/10',
    },
    {
      icon: UserCheck,
      title: t.termsAndConditions.sections.yourRights.title,
      content: t.termsAndConditions.sections.yourRights.content,
      gradient: 'from-sky-500 to-blue-500',
      bgGradient: 'from-sky-500/10 to-blue-500/10',
    },
    {
      icon: Cookie,
      title: t.termsAndConditions.sections.cookiesAnalytics.title,
      content: t.termsAndConditions.sections.cookiesAnalytics.content,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
    },
    {
      icon: Lock,
      title: t.termsAndConditions.sections.dataSecurity.title,
      content: t.termsAndConditions.sections.dataSecurity.content,
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-500/10 to-pink-500/10',
    },
    {
      icon: Globe2,
      title: t.termsAndConditions.sections.internationalTransfers.title,
      content: t.termsAndConditions.sections.internationalTransfers.content,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-500/10 to-cyan-600/10',
    },
    {
      icon: Edit,
      title: t.termsAndConditions.sections.dataRetention.title,
      content: t.termsAndConditions.sections.dataRetention.content,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
    },
    {
      icon: Mail,
      title: t.termsAndConditions.sections.dataProtectionContact.title,
      content: t.termsAndConditions.sections.dataProtectionContact.content,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
    },
    {
      icon: RefreshCw,
      title: t.termsAndConditions.sections.modifications.title,
      content: t.termsAndConditions.sections.modifications.content,
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10',
    },
    {
      icon: Mail,
      title: t.termsAndConditions.sections.contact.title,
      content: t.termsAndConditions.sections.contact.content,
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
    },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-32 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 overflow-hidden">
      {/* Premium Animated Background - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 0.9, 1.1],
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:48px_48px]" />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Premium Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-2xl mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          >
            <FileText className="h-10 w-10 text-white drop-shadow-lg" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 gradient-text-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t.termsAndConditions.title}
          </motion.h1>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.termsAndConditions.intro}
          </motion.p>
        </motion.div>

        {/* Premium Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Premium Card Container */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Animated Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Section Header */}
                    <div className="flex items-start gap-4 md:gap-6 mb-6">
                      <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                          {section.title}
                        </h2>
                        <div className={`h-1 w-24 bg-gradient-to-r ${section.gradient} rounded-full`} />
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="prose prose-lg max-w-none">
                      <div
                        className="text-gray-700 leading-relaxed text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                      {section.additional && (
                        <motion.div
                          className="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <p
                            className="text-gray-700 leading-relaxed text-base md:text-lg"
                            dangerouslySetInnerHTML={{ __html: section.additional }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Shine Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Acceptance Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200/50 shadow-xl overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <motion.p
                className="text-lg md:text-xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {t.termsAndConditions.acceptance}
              </motion.p>
              <motion.p
                className="text-sm md:text-base text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t.termsAndConditions.lastUpdate}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
