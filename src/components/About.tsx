import React from 'react';
import { CheckCircle, Award, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import SectionEyebrow from './SectionEyebrow';
import logo from '../assets/logo.png';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();

  const stats = [
    { icon: Award, value: '50+', label: t.about.stats.projects, color: 'from-blue-500 to-cyan-500' },
    { icon: Target, value: '3+', label: t.about.stats.experience, color: 'from-purple-500 to-pink-500' },
    { icon: Zap, value: '24/7', label: t.about.stats.support, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
      {/* Premium Background Elements - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 0.9, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:64px_64px]" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Premium Image/Avatar Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Avatar Container */}
              <div className="relative aspect-square bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl flex items-center justify-center text-white shadow-2xl overflow-hidden">
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
                {/* Content — branded identity */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  <img
                    src={logo}
                    alt="DevTaskHub"
                    className="h-24 sm:h-28 w-auto rounded-2xl shadow-2xl mb-5"
                    loading="lazy"
                  />
                  <span className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                    DevTaskHub
                  </span>
                  <span className="text-white/85 font-medium mt-1">Full-Stack Developers</span>
                </div>
              </div>

              {/* Floating Premium Badges - Desktop Only */}
              {!isMobile && (
                <>
                  <motion.div
                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center z-20"
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Award className="h-10 w-10 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl flex items-center justify-center z-20"
                    animate={{
                      y: [0, 12, 0],
                      rotate: [0, -8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <Zap className="h-12 w-12 text-white drop-shadow-lg" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </motion.div>
                </>
              )}

              {/* Decorative Background Layers */}
              {!isMobile && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-3xl transform rotate-6 -z-10 blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-cyan-200/30 rounded-3xl transform -rotate-3 -z-20 blur-xl" />
                </>
              )}
            </div>
          </motion.div>

          {/* Premium Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-5">
              <SectionEyebrow icon={Award} color="emerald">
                {language === 'el' ? 'Ποιοι είμαστε' : language === 'fr' ? 'Qui sommes-nous' : 'Who we are'}
              </SectionEyebrow>
            </div>
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 gradient-text-blue"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t.about.title}
            </motion.h2>
            <motion.h3
              className="text-2xl text-blue-600 font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t.about.subtitle}
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.about.description}
            </motion.p>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {stats.map(({ icon: Icon, value, label, color }, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100/50 hover:border-blue-200/50 transition-all duration-500 text-center overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    {/* Icon */}
                    <div className="relative mb-4 flex justify-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    {/* Value */}
                    <div className="relative text-3xl font-bold text-gray-900 mb-2">{value}</div>
                    {/* Label */}
                    <div className="relative text-sm text-gray-600 font-medium">{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Experience/Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-6">{t.about.experience}</h4>
              <div className="space-y-4">
                {t.about.experienceItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100/50 hover:bg-white/80 hover:border-blue-200/50 hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
