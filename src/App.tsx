import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './data/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';
import HomeShowcaseSection from './components/HomeShowcaseSection';
import FAQ from './components/FAQ';
import FloatingChat from './components/FloatingChat';
import LoadingScreen from './components/LoadingScreen';
import Analytics from './components/Analytics';
import ScrollProgress from './components/ScrollProgress';
import Grain from './components/ui/Grain';
import { Helmet } from 'react-helmet-async';
import { ServiceSchema } from './components/SchemaMarkup';

// Lazy load service pages for better performance
const WebDevelopmentPage = lazy(() => import('./components/WebDevelopmentPage'));
const MobileAppDevelopmentPage = lazy(() => import('./components/MobileAppDevelopmentPage'));
const ChatbotsAIAgentsPage = lazy(() => import('./components/ChatbotsAIAgentsPage'));
const SocialMediaManagementPage = lazy(() => import('./components/SocialMediaManagementPage'));
const SEOWebsiteOptimizationPage = lazy(() => import('./components/SEOWebsiteOptimizationPage'));
const UXUIDesignPage = lazy(() => import('./components/UXUIDesignPage'));
const AIIntegrationApplicationsPage = lazy(() => import('./components/AIIntegrationApplicationsPage'));
const EcommerceDevelopmentPage = lazy(() => import('./components/EcommerceDevelopmentPage'));
const GameDevelopmentPage = lazy(() => import('./components/GameDevelopmentPage'));
const VideoAnimationProductionPage = lazy(() => import('./components/VideoAnimationProductionPage'));
const DatabaseCloudInfrastructurePage = lazy(() => import('./components/DatabaseCloudInfrastructurePage'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));

// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ink">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iris"></div>
  </div>
);

// Hides marketing chrome (header/footer/chat/splash) on the standalone /admin area
const ChromeOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  return pathname.startsWith('/admin') ? null : <>{children}</>;
};

function AppContent() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <Router>
        <ChromeOnly><LoadingScreen /></ChromeOnly>
        <ChromeOnly><ScrollProgress /></ChromeOnly>
        <ChromeOnly><Grain /></ChromeOnly>
        <ScrollToTop />
        <Analytics />
      <div className="min-h-screen bg-white">
        <ChromeOnly><Header /></ChromeOnly>
        <ChromeOnly><Breadcrumbs /></ChromeOnly>
      <main>
          <Routes>
            <Route path="/" element={
              <>
                <Helmet>
                  <title>{t.meta.home.title}</title>
                  <meta name="description" content={t.meta.home.description} />
                  <link rel="canonical" href="https://devtaskhub.com/" />
                  <meta property="og:title" content={t.meta.home.title} />
                  <meta property="og:description" content={t.meta.home.description} />
                </Helmet>
                <Hero />
                <HomeShowcaseSection />
                <Services />
                <About />
                <Portfolio />
                <FAQ />
                <Contact />
              </>
            } />
            <Route path="/services" element={
              <>
                <Helmet>
                  <title>{`${t.services.title} | DevTaskHub`}</title>
                  <meta name="description" content={t.services.subtitle} />
                  <link rel="canonical" href="https://devtaskhub.com/services" />
                  <meta property="og:title" content={`${t.services.title} | DevTaskHub`} />
                  <meta property="og:description" content={t.services.subtitle} />
                </Helmet>
                <Services />
              </>
            } />
            {/* Εδώ θα μπουν τα νέα premium service pages, π.χ.: */}
            <Route path="/services/web-development" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.webDevelopment.title}</title>
                  <meta name="description" content={t.meta.webDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/web-development" />
                </Helmet>
                <ServiceSchema name={t.meta.webDevelopment.title} description={t.meta.webDevelopment.description} serviceType="Web Development" />
                <WebDevelopmentPage />
              </Suspense>
            } />
            <Route path="/services/mobile-app-development" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.mobileAppDevelopment.title}</title>
                  <meta name="description" content={t.meta.mobileAppDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/mobile-app-development" />
                </Helmet>
                <ServiceSchema name={t.meta.mobileAppDevelopment.title} description={t.meta.mobileAppDevelopment.description} serviceType="Mobile App Development" />
                <MobileAppDevelopmentPage />
              </Suspense>
            } />
            <Route path="/services/chatbots-ai-agents" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.chatbotsAIAgents.title}</title>
                  <meta name="description" content={t.meta.chatbotsAIAgents.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/chatbots-ai-agents" />
                </Helmet>
                <ServiceSchema name={t.meta.chatbotsAIAgents.title} description={t.meta.chatbotsAIAgents.description} serviceType="AI Chatbots" />
                <ChatbotsAIAgentsPage />
              </Suspense>
            } />
            <Route path="/services/social-media-management" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.socialMediaManagement.title}</title>
                  <meta name="description" content={t.meta.socialMediaManagement.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/social-media-management" />
                </Helmet>
                <ServiceSchema name={t.meta.socialMediaManagement.title} description={t.meta.socialMediaManagement.description} serviceType="Social Media Management" />
                <SocialMediaManagementPage />
              </Suspense>
            } />
            <Route path="/services/video-animation-production" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.videoAnimationProduction.title}</title>
                  <meta name="description" content={t.meta.videoAnimationProduction.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/video-animation-production" />
                </Helmet>
                <ServiceSchema name={t.meta.videoAnimationProduction.title} description={t.meta.videoAnimationProduction.description} serviceType="Video Production" />
                <VideoAnimationProductionPage />
              </Suspense>
            } />
            <Route path="/services/seo-website-optimization" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.seoWebsiteOptimization.title}</title>
                  <meta name="description" content={t.meta.seoWebsiteOptimization.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/seo-website-optimization" />
                </Helmet>
                <ServiceSchema name={t.meta.seoWebsiteOptimization.title} description={t.meta.seoWebsiteOptimization.description} serviceType="SEO Services" />
                <SEOWebsiteOptimizationPage />
              </Suspense>
            } />
            <Route path="/services/ux-ui-design" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.uxUIDesign.title}</title>
                  <meta name="description" content={t.meta.uxUIDesign.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ux-ui-design" />
                </Helmet>
                <ServiceSchema name={t.meta.uxUIDesign.title} description={t.meta.uxUIDesign.description} serviceType="UX/UI Design" />
                <UXUIDesignPage />
              </Suspense>
            } />
            <Route path="/services/database-cloud-infrastructure" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.databaseCloudInfrastructure.title}</title>
                  <meta name="description" content={t.meta.databaseCloudInfrastructure.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/database-cloud-infrastructure" />
                </Helmet>
                <ServiceSchema name={t.meta.databaseCloudInfrastructure.title} description={t.meta.databaseCloudInfrastructure.description} serviceType="Cloud Infrastructure" />
                <DatabaseCloudInfrastructurePage />
              </Suspense>
            } />
            <Route path="/services/ai-integration-applications" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.aiIntegrationApplications.title}</title>
                  <meta name="description" content={t.meta.aiIntegrationApplications.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ai-integration-applications" />
                </Helmet>
                <ServiceSchema name={t.meta.aiIntegrationApplications.title} description={t.meta.aiIntegrationApplications.description} serviceType="AI Integration" />
                <AIIntegrationApplicationsPage />
              </Suspense>
            } />
            <Route path="/services/ecommerce-development" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.ecommerceDevelopment.title}</title>
                  <meta name="description" content={t.meta.ecommerceDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ecommerce-development" />
                </Helmet>
                <ServiceSchema name={t.meta.ecommerceDevelopment.title} description={t.meta.ecommerceDevelopment.description} serviceType="E-commerce Development" />
                <EcommerceDevelopmentPage />
              </Suspense>
            } />
            <Route path="/services/game-development" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.gameDevelopment.title}</title>
                  <meta name="description" content={t.meta.gameDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/game-development" />
                </Helmet>
                <ServiceSchema name={t.meta.gameDevelopment.title} description={t.meta.gameDevelopment.description} serviceType="Game Development" />
                <GameDevelopmentPage />
              </Suspense>
            } />
            <Route path="/contact" element={
              <>
                <Helmet>
                  <title>{t.meta.contact.title}</title>
                  <meta name="description" content={t.meta.contact.description} />
                  <link rel="canonical" href="https://devtaskhub.com/contact" />
                </Helmet>
                <Contact />
              </>
            } />
            <Route path="/contactme" element={
              <>
                <Helmet>
                  <title>{t.meta.contact.title}</title>
                  <meta name="description" content={t.meta.contact.description} />
                  <link rel="canonical" href="https://devtaskhub.com/contact" />
                </Helmet>
                <Contact />
              </>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>Admin · DevTaskHub</title>
                  <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <AdminPanel />
              </Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<PageLoader />}>
                <Helmet>
                  <title>{t.meta.terms.title}</title>
                  <meta name="description" content={t.meta.terms.description} />
                </Helmet>
                <TermsAndConditions />
              </Suspense>
            } />
          </Routes>
      </main>
      <ChromeOnly><Footer /></ChromeOnly>
      <ChromeOnly><FloatingChat /></ChromeOnly>
    </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;