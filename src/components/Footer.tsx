import { memo } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { useNavigate, Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Marquee from './ui/Marquee';

const Footer = memo(() => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goContact = () => {
    if (window.location.pathname === '/') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    else navigate('/');
  };

  const servicesList = [
    { label: t.footer.services.webDevelopment, slug: 'web-development' },
    { label: t.footer.services.mobileAppDevelopment, slug: 'mobile-app-development' },
    { label: t.footer.services.ecommerceDevelopment, slug: 'ecommerce-development' },
    { label: t.footer.services.chatbotsAIAgents, slug: 'chatbots-ai-agents' },
    { label: t.footer.services.aiIntegrationApplications, slug: 'ai-integration-applications' },
  ];

  const socials = [
    { Icon: FaFacebook, label: t.footer.social.facebook, href: 'https://www.facebook.com/profile.php?id=61578746165941' },
    { Icon: FaInstagram, label: t.footer.social.instagram, href: 'https://www.instagram.com/devtaskhub/' },
    { Icon: FaTiktok, label: t.footer.social.tiktok, href: 'https://www.tiktok.com/@devtaskhub' },
  ];

  const ctaWord = language === 'el' ? 'ΕΧΕΙΣ ΙΔΕΑ; ΑΣ ΤΗΝ ΥΛΟΠΟΙΗΣΟΥΜΕ' : language === 'fr' ? 'UNE IDÉE ? CONSTRUISONS-LA' : "GOT AN IDEA? LET'S BUILD IT";

  return (
    <footer className="surface-ink relative overflow-hidden border-t border-[var(--line)]">
      {/* Big CTA marquee */}
      <button onClick={goContact} className="group block w-full border-b border-[var(--line)] py-8" aria-label={ctaWord}>
        <Marquee duration={26} pauseOnHover={false}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="font-display px-8 text-4xl font-bold text-paper transition-colors group-hover:text-iris-bright sm:text-6xl">{ctaWord}</span>
              <ArrowUpRight className="h-8 w-8 text-iris-bright sm:h-12 sm:w-12" />
            </span>
          ))}
        </Marquee>
      </button>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5">
                <img src={logo} alt="DevTaskHub Logo" className="h-full w-full object-contain" loading="lazy" />
              </span>
              <span className="font-display text-2xl font-bold text-paper">DevTaskHub</span>
            </div>
            <p className="max-w-xs leading-relaxed text-paper-dim">{t.footer.description}</p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/[0.02] text-paper-dim transition-colors hover:border-iris/40 hover:bg-iris/10 hover:text-paper"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.nav.services}</h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="link-underline text-paper-dim transition-colors hover:text-paper">
                    {service.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <button onClick={() => navigate('/terms')} className="link-underline text-paper-muted transition-colors hover:text-paper">
                  {t.footer.terms}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-paper-muted">{t.nav.contact}</h4>
            <div className="space-y-3 text-paper-dim">
              <p>{t.footer.location}</p>
              <a href="tel:+306971982563" className="link-underline block transition-colors hover:text-paper">{t.contact.info.phone}</a>
              <a href="mailto:info@devtaskhub.com" className="link-underline block transition-colors hover:text-paper">{t.contact.info.email}</a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 sm:flex-row">
          <p className="text-sm text-paper-muted">© 2025 DevTaskHub. {t.footer.rights}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm text-paper-dim transition-colors hover:border-iris/40 hover:text-paper"
          >
            <ArrowUp className="h-4 w-4" /> Top
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
