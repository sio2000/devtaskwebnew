import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../services/servicesData';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  FaGlobe, FaMobileAlt, FaRobot, FaUsers, FaVideo, FaSearch, FaPhotoVideo, FaPalette, FaDatabase, FaBrain, FaShoppingCart, FaGamepad
} from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const iconColorMap: Record<string, string> = {
  'web-development': 'text-sky-400',
  'mobile-app-development': 'text-violet-400',
  'chatbots-ai-agents': 'text-pink-400',
  'social-media-management': 'text-emerald-400',
  'video-animation-production': 'text-orange-300',
  'seo-website-optimization': 'text-yellow-300',
  'multimedia-content-creation': 'text-fuchsia-400',
  'ux-ui-design': 'text-cyan-400',
  'database-cloud-infrastructure': 'text-indigo-400',
  'ai-integration-applications': 'text-pink-300',
  'ecommerce-development': 'text-green-400',
  'game-development': 'text-violet-300',
};

const iconMap: Record<string, React.ElementType> = {
  'web-development': FaGlobe,
  'mobile-app-development': FaMobileAlt,
  'chatbots-ai-agents': FaRobot,
  'social-media-management': FaUsers,
  'video-animation-production': FaVideo,
  'seo-website-optimization': FaSearch,
  'multimedia-content-creation': FaPhotoVideo,
  'ux-ui-design': FaPalette,
  'database-cloud-infrastructure': FaDatabase,
  'ai-integration-applications': FaBrain,
  'ecommerce-development': FaShoppingCart,
  'game-development': FaGamepad,
};

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: { scale: 1.04, y: -8 },
};

const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  // Φιλτράρω το servicesData ώστε να μην εμφανίζεται το multimedia-content-creation
  // Στο mobile, αφαιρούμε επίσης: ai-integration-applications, seo-website-optimization, ux-ui-design
  const filteredServices = servicesData.filter(service => {
    if (service.slug === 'multimedia-content-creation') return false;
    if (isMobile) {
      if (service.slug === 'ai-integration-applications' || 
          service.slug === 'seo-website-optimization' || 
          service.slug === 'ux-ui-design') {
        return false;
      }
    }
    return true;
  });

  return (
    <section
      id="services"
      className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen overflow-hidden"
      aria-label={t.services.title}
    >
      {/* Premium Animated Background - Desktop Only */}
      {!isMobile && (
        <>
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 gradient-text-premium px-4 break-words"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {t.services.title}
          </motion.h2>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium px-4 break-words"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredServices.map((service, i) => {
            const Icon = iconMap[service.slug];
            const color = iconColorMap[service.slug] || 'text-sky-400';
            
            return (
              <motion.a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover="hover"
              >
                {/* Premium Card Container */}
                <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover">
                  {/* Animated Gradient Background on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
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
                  
                  {/* Premium Border Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
                  </div>

                  {/* Icon Container - Premium Design */}
                  <motion.div
                    className="relative mb-6 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 ${color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />
                      {/* Icon Background */}
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg flex items-center justify-center border border-gray-100/50 group-hover:border-blue-200/50 transition-all duration-500">
                        {Icon && <Icon className={`text-4xl ${color} drop-shadow-lg`} />}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                      {service.title[language]}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {service.shortDescription[language]}
                    </p>
                    
                    {/* Premium CTA Button */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg group-hover:shadow-xl transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{t.services.more}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Shine Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
