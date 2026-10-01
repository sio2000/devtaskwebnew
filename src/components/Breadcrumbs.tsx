import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { BreadcrumbSchema } from './SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  // Generate breadcrumbs based on current path
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: language === 'el' ? 'Αρχική' : language === 'fr' ? 'Accueil' : 'Home', url: '/' }
    ];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      
      // Map paths to display names
      let displayName = path;
      
      if (path === 'services') {
        displayName = t.nav.services;
      } else if (path === 'web-development') {
        displayName = t.footer.services.webDevelopment;
      } else if (path === 'mobile-app-development') {
        displayName = t.footer.services.mobileAppDevelopment;
      } else if (path === 'ecommerce-development') {
        displayName = t.footer.services.ecommerceDevelopment;
      } else if (path === 'seo-website-optimization') {
        displayName = t.footer.services.seoWebsiteOptimization;
      } else if (path === 'ux-ui-design') {
        displayName = t.footer.services.uxUIDesign;
      } else if (path === 'video-animation-production') {
        displayName = t.footer.services.videoAnimationProduction;
      } else if (path === 'social-media-management') {
        displayName = t.footer.services.socialMediaManagement;
      } else if (path === 'chatbots-ai-agents') {
        displayName = t.footer.services.chatbotsAIAgents;
      } else if (path === 'ai-integration-applications') {
        displayName = t.footer.services.aiIntegrationApplications;
      } else if (path === 'database-cloud-infrastructure') {
        displayName = t.footer.services.databaseCloudInfrastructure;
      } else if (path === 'game-development') {
        displayName = t.footer.services.gameDevelopment;
      } else if (path === 'contact' || path === 'contactme') {
        displayName = t.nav.contact;
      } else if (path === 'portfolio') {
        displayName = 'Portfolio';
      } else if (path === 'terms') {
        displayName = t.footer.terms;
      }

      breadcrumbs.push({
        name: displayName,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbItems = breadcrumbs.map(item => ({
    name: item.name,
    url: `https://devtaskhub.com${item.url}`
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav aria-label="Breadcrumb" className="surface-ink border-b border-[var(--line)] py-1.5 pt-[4.75rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-y-1 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li key={crumb.url} className="flex min-w-0 items-center">
                  {index > 0 && (
                    <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0 text-paper-muted" aria-hidden="true" />
                  )}
                  {isLast ? (
                    <span className="py-1.5 font-medium text-paper-dim [overflow-wrap:anywhere]" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.url}
                      className="flex items-center py-1.5 text-iris-bright transition-colors duration-200 hover:text-paper"
                    >
                      {index === 0 && <Home className="h-4 w-4 mr-1" />}
                      <span>{crumb.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;

