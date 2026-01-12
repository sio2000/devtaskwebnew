import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './data/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import ChatbotSection from './components/ChatbotSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceDetails from './components/ServiceDetails';
import ScrollToTop from './components/ScrollToTop';
import Breadcrumbs from './components/Breadcrumbs';
import HomeShowcaseSection from './components/HomeShowcaseSection';
import TermsAndConditions from './components/TermsAndConditions';
import WebDevelopmentPage from './components/WebDevelopmentPage';
import MobileAppDevelopmentPage from './components/MobileAppDevelopmentPage';
import ChatbotsAIAgentsPage from './components/ChatbotsAIAgentsPage';
import SocialMediaManagementPage from './components/SocialMediaManagementPage';
import SEOWebsiteOptimizationPage from './components/SEOWebsiteOptimizationPage';
import UXUIDesignPage from './components/UXUIDesignPage';
import AIIntegrationApplicationsPage from './components/AIIntegrationApplicationsPage';
import EcommerceDevelopmentPage from './components/EcommerceDevelopmentPage';
import GameDevelopmentPage from './components/GameDevelopmentPage';
import VideoAnimationProductionPage from './components/VideoAnimationProductionPage';
import DatabaseCloudInfrastructurePage from './components/DatabaseCloudInfrastructurePage';
import { Helmet } from 'react-helmet';
import { OrganizationSchema, ServiceSchema } from './components/SchemaMarkup';
// Προσθήκη placeholders για όλες τις υπηρεσίες
const Placeholder = ({ name }: { name: string }) => <div style={{padding:40, textAlign:'center', color:'#555'}}>Η σελίδα "{name}" δεν έχει υλοποιηθεί ακόμα.</div>;

function AppContent() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <Router>
        <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        <Breadcrumbs />
      <main>
          <Routes>
            <Route path="/" element={
              <>
                <Helmet>
                  <title>{t.meta.home.title}</title>
                  <meta name="description" content={t.meta.home.description} />
                  <link rel="canonical" href="https://devtaskhub.com/" />
                </Helmet>
                <OrganizationSchema />
                <Hero />
                <HomeShowcaseSection />
                <Services />
                <About />
                <Portfolio />
                <ChatbotSection />
                <Contact />
              </>
            } />
            <Route path="/services" element={<Services />} />
            {/* Εδώ θα μπουν τα νέα premium service pages, π.χ.: */}
            <Route path="/services/web-development" element={
              <>
                <Helmet>
                  <title>{t.meta.webDevelopment.title}</title>
                  <meta name="description" content={t.meta.webDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/web-development" />
                </Helmet>
                <ServiceSchema name={t.meta.webDevelopment.title} description={t.meta.webDevelopment.description} serviceType="Web Development" />
                <WebDevelopmentPage />
              </>
            } />
            <Route path="/services/mobile-app-development" element={
              <>
                <Helmet>
                  <title>{t.meta.mobileAppDevelopment.title}</title>
                  <meta name="description" content={t.meta.mobileAppDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/mobile-app-development" />
                </Helmet>
                <ServiceSchema name={t.meta.mobileAppDevelopment.title} description={t.meta.mobileAppDevelopment.description} serviceType="Mobile App Development" />
                <MobileAppDevelopmentPage />
              </>
            } />
            <Route path="/services/chatbots-ai-agents" element={
              <>
                <Helmet>
                  <title>{t.meta.chatbotsAIAgents.title}</title>
                  <meta name="description" content={t.meta.chatbotsAIAgents.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/chatbots-ai-agents" />
                </Helmet>
                <ServiceSchema name={t.meta.chatbotsAIAgents.title} description={t.meta.chatbotsAIAgents.description} serviceType="AI Chatbots" />
                <ChatbotsAIAgentsPage />
              </>
            } />
            <Route path="/services/social-media-management" element={
              <>
                <Helmet>
                  <title>{t.meta.socialMediaManagement.title}</title>
                  <meta name="description" content={t.meta.socialMediaManagement.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/social-media-management" />
                </Helmet>
                <ServiceSchema name={t.meta.socialMediaManagement.title} description={t.meta.socialMediaManagement.description} serviceType="Social Media Management" />
                <SocialMediaManagementPage />
              </>
            } />
            <Route path="/services/video-animation-production" element={
              <>
                <Helmet>
                  <title>{t.meta.videoAnimationProduction.title}</title>
                  <meta name="description" content={t.meta.videoAnimationProduction.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/video-animation-production" />
                </Helmet>
                <ServiceSchema name={t.meta.videoAnimationProduction.title} description={t.meta.videoAnimationProduction.description} serviceType="Video Production" />
                <VideoAnimationProductionPage />
              </>
            } />
            <Route path="/services/seo-website-optimization" element={
              <>
                <Helmet>
                  <title>{t.meta.seoWebsiteOptimization.title}</title>
                  <meta name="description" content={t.meta.seoWebsiteOptimization.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/seo-website-optimization" />
                </Helmet>
                <ServiceSchema name={t.meta.seoWebsiteOptimization.title} description={t.meta.seoWebsiteOptimization.description} serviceType="SEO Services" />
                <SEOWebsiteOptimizationPage />
              </>
            } />
            <Route path="/services/multimedia-content-creation" element={<Placeholder name="Multimedia Content Creation" />} />
            <Route path="/services/ux-ui-design" element={
              <>
                <Helmet>
                  <title>{t.meta.uxUIDesign.title}</title>
                  <meta name="description" content={t.meta.uxUIDesign.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ux-ui-design" />
                </Helmet>
                <ServiceSchema name={t.meta.uxUIDesign.title} description={t.meta.uxUIDesign.description} serviceType="UX/UI Design" />
                <UXUIDesignPage />
              </>
            } />
            <Route path="/services/database-cloud-infrastructure" element={
              <>
                <Helmet>
                  <title>{t.meta.databaseCloudInfrastructure.title}</title>
                  <meta name="description" content={t.meta.databaseCloudInfrastructure.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/database-cloud-infrastructure" />
                </Helmet>
                <ServiceSchema name={t.meta.databaseCloudInfrastructure.title} description={t.meta.databaseCloudInfrastructure.description} serviceType="Cloud Infrastructure" />
                <DatabaseCloudInfrastructurePage />
              </>
            } />
            <Route path="/services/ai-integration-applications" element={
              <>
                <Helmet>
                  <title>{t.meta.aiIntegrationApplications.title}</title>
                  <meta name="description" content={t.meta.aiIntegrationApplications.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ai-integration-applications" />
                </Helmet>
                <ServiceSchema name={t.meta.aiIntegrationApplications.title} description={t.meta.aiIntegrationApplications.description} serviceType="AI Integration" />
                <AIIntegrationApplicationsPage />
              </>
            } />
            <Route path="/services/ecommerce-development" element={
              <>
                <Helmet>
                  <title>{t.meta.ecommerceDevelopment.title}</title>
                  <meta name="description" content={t.meta.ecommerceDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/ecommerce-development" />
                </Helmet>
                <ServiceSchema name={t.meta.ecommerceDevelopment.title} description={t.meta.ecommerceDevelopment.description} serviceType="E-commerce Development" />
                <EcommerceDevelopmentPage />
              </>
            } />
            <Route path="/services/game-development" element={
              <>
                <Helmet>
                  <title>{t.meta.gameDevelopment.title}</title>
                  <meta name="description" content={t.meta.gameDevelopment.description} />
                  <link rel="canonical" href="https://devtaskhub.com/services/game-development" />
                </Helmet>
                <ServiceSchema name={t.meta.gameDevelopment.title} description={t.meta.gameDevelopment.description} serviceType="Game Development" />
                <GameDevelopmentPage />
              </>
            } />
            {/* <Route path="/services/:slug" element={<ServiceDetails />} /> */}
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
            <Route path="/terms" element={
              <>
                <Helmet>
                  <title>{t.meta.terms.title}</title>
                  <meta name="description" content={t.meta.terms.description} />
                </Helmet>
                <TermsAndConditions />
              </>
            } />
          </Routes>
      </main>
      <Footer />
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