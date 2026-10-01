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
import Seo from './components/Seo';
import NotFound from './components/NotFound';
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

// Service routes: slug, key into translations.meta, schema.org serviceType, page component.
// Keep in sync with scripts/prerender-meta.mjs and public/sitemap.xml.
const serviceRoutes = [
  { slug: 'web-development', meta: 'webDevelopment', serviceType: 'Web Development', Page: WebDevelopmentPage },
  { slug: 'mobile-app-development', meta: 'mobileAppDevelopment', serviceType: 'Mobile App Development', Page: MobileAppDevelopmentPage },
  { slug: 'chatbots-ai-agents', meta: 'chatbotsAIAgents', serviceType: 'AI Chatbots', Page: ChatbotsAIAgentsPage },
  { slug: 'social-media-management', meta: 'socialMediaManagement', serviceType: 'Social Media Management', Page: SocialMediaManagementPage },
  { slug: 'video-animation-production', meta: 'videoAnimationProduction', serviceType: 'Video Production', Page: VideoAnimationProductionPage },
  { slug: 'seo-website-optimization', meta: 'seoWebsiteOptimization', serviceType: 'SEO Services', Page: SEOWebsiteOptimizationPage },
  { slug: 'ux-ui-design', meta: 'uxUIDesign', serviceType: 'UX/UI Design', Page: UXUIDesignPage },
  { slug: 'database-cloud-infrastructure', meta: 'databaseCloudInfrastructure', serviceType: 'Cloud Infrastructure', Page: DatabaseCloudInfrastructurePage },
  { slug: 'ai-integration-applications', meta: 'aiIntegrationApplications', serviceType: 'AI Integration', Page: AIIntegrationApplicationsPage },
  { slug: 'ecommerce-development', meta: 'ecommerceDevelopment', serviceType: 'E-commerce Development', Page: EcommerceDevelopmentPage },
  { slug: 'game-development', meta: 'gameDevelopment', serviceType: 'Game Development', Page: GameDevelopmentPage },
] as const;

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
      <div className="min-h-screen bg-ink">
        <ChromeOnly><Header /></ChromeOnly>
        <ChromeOnly><Breadcrumbs /></ChromeOnly>
      <main>
          <Routes>
            <Route path="/" element={
              <>
                <Seo title={t.meta.home.title} description={t.meta.home.description} path="/" />
                <Hero />
                <HomeShowcaseSection />
                <Services />
                <Portfolio />
                <About />
                <FAQ />
                <Contact />
              </>
            } />
            <Route path="/services" element={
              <>
                <Seo title={`${t.services.title} | DevTaskHub`} description={t.services.subtitle} path="/services" />
                <Services />
              </>
            } />
            <Route path="/portfolio" element={
              <>
                <Seo title={t.meta.portfolio.title} description={t.meta.portfolio.description} path="/portfolio" />
                <Portfolio standalone />
              </>
            } />
            {serviceRoutes.map(({ slug, meta, serviceType, Page }) => (
              <Route key={slug} path={`/services/${slug}`} element={
                <Suspense fallback={<PageLoader />}>
                  <Seo title={t.meta[meta].title} description={t.meta[meta].description} path={`/services/${slug}`} />
                  <ServiceSchema name={t.meta[meta].title} description={t.meta[meta].description} serviceType={serviceType} />
                  <Page />
                </Suspense>
              } />
            ))}
            {['/contact', '/contactme'].map((path) => (
              <Route key={path} path={path} element={
                <>
                  <Seo title={t.meta.contact.title} description={t.meta.contact.description} path="/contact" />
                  <Contact />
                </>
              } />
            ))}
            <Route path="/admin" element={
              <Suspense fallback={<PageLoader />}>
                <Seo title="Admin · DevTaskHub" noindex />
                <AdminPanel />
              </Suspense>
            } />
            <Route path="/terms" element={
              <Suspense fallback={<PageLoader />}>
                <Seo title={t.meta.terms.title} description={t.meta.terms.description} path="/terms" />
                <TermsAndConditions />
              </Suspense>
            } />
            <Route path="*" element={<NotFound />} />
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
