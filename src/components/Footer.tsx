import React, { memo } from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = memo(() => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ορισμός υπηρεσιών με slug για routing (μεταφρασμένα)
  const servicesList = [
    { label: t.footer.services.webDevelopment, slug: 'web-development' },
    { label: t.footer.services.mobileAppDevelopment, slug: 'mobile-app-development' },
    { label: t.footer.services.ecommerceDevelopment, slug: 'ecommerce-development' },
    { label: t.footer.services.seoWebsiteOptimization, slug: 'seo-website-optimization' },
    { label: t.footer.services.uxUIDesign, slug: 'ux-ui-design' },
    { label: t.footer.services.videoAnimationProduction, slug: 'video-animation-production' },
    { label: t.footer.services.socialMediaManagement, slug: 'social-media-management' },
    { label: t.footer.services.chatbotsAIAgents, slug: 'chatbots-ai-agents' },
    { label: t.footer.services.aiIntegrationApplications, slug: 'ai-integration-applications' },
    { label: t.footer.services.databaseCloudInfrastructure, slug: 'database-cloud-infrastructure' },
    { label: t.footer.services.gameDevelopment, slug: 'game-development' },
  ];

  // Υπολογισμός για balanced 2 columns
  const mid = Math.ceil(servicesList.length / 2);
  const col1 = servicesList.slice(0, mid);
  const col2 = servicesList.slice(mid);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-12 relative overflow-hidden">
      {/* Background Decorations: ΜΟΝΟ σε desktop */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"
          />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">DevTaskHub</h3>
            <p className="text-gray-300 leading-relaxed mb-4">{t.footer.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{t.footer.madeWith}</span>
              <span>❤️</span>
              <span>{t.footer.inThessaloniki}</span>
            </div>
          </div>
          {/* Services Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-300">{t.nav.services}</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-300">
              {col1.map((service, index) => (
                <li
                  key={service.slug + service.label}
                  className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigate(`/services/${service.slug}`)}
                  tabIndex={0}
                  aria-label={service.label}
                >
                  {service.label}
                </li>
              ))}
              {col2.map((service, index) => (
                <li
                  key={service.slug + service.label}
                  className="hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigate(`/services/${service.slug}`)}
                  tabIndex={0}
                  aria-label={service.label}
                >
                  {service.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/terms')}
                className="text-blue-300 hover:text-blue-100 underline font-medium transition-colors duration-300 text-base px-0 py-0 bg-transparent shadow-none rounded-none focus:outline-none"
              >
                {t.footer.terms}
              </button>
            </div>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300">{t.nav.contact}</h4>
            <div className="text-gray-300 space-y-2">
              <p className="hover:text-blue-300 transition-colors duration-300">{t.footer.location}</p>
              <a
                href="tel:+306971982563"
                className="block hover:text-green-300 transition-colors duration-300"
              >
                {t.contact.info.phone}
              </a>
              <a
                href="mailto:Devtaskhub@gmail.com"
                className="block hover:text-orange-300 transition-colors duration-300"
              >
                {t.contact.info.email}
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61578746165941"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 mt-2"
              >
                <FaFacebook className="h-5 w-5" />
                <span>{t.footer.social.facebook}</span>
              </a>
              <a
                href="https://www.instagram.com/devtaskhub/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors duration-300 mt-2"
              >
                <FaInstagram className="h-5 w-5" />
                <span>{t.footer.social.instagram}</span>
              </a>
              <a
                href="https://www.tiktok.com/@devtaskhub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300 mt-2"
              >
                <FaTiktok className="h-5 w-5" />
                <span>{t.footer.social.tiktok}</span>
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center relative">
          <p className="text-gray-400 flex items-center justify-center space-x-2 mb-4">
            <span>© 2025 DevTaskHub. {t.footer.rights}</span>
          </p>
          {/* Scroll to Top Button: ΜΟΝΟ σε desktop */}
          {!isMobile && (
            <button
              onClick={scrollToTop}
              className="absolute right-0 top-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>↑</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;