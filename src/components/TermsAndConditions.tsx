import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle, Briefcase, Building2, CheckCircle, Cookie, Database, FileText, Gavel, Globe2, Lock, Mail,
  MousePointerClick, RefreshCw, Scale, Share2, ShieldCheck, Timer, UserCheck, Users, type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { legal, type LegalSectionId } from '../data/legal';

const look: Record<LegalSectionId, { icon: LucideIcon; gradient: string }> = {
  company: { icon: Building2, gradient: 'from-blue-500 to-cyan-500' },
  identity: { icon: Users, gradient: 'from-purple-500 to-pink-500' },
  siteUse: { icon: MousePointerClick, gradient: 'from-sky-500 to-blue-500' },
  services: { icon: Briefcase, gradient: 'from-violet-500 to-purple-600' },
  intellectualProperty: { icon: FileText, gradient: 'from-blue-500 to-cyan-500' },
  liability: { icon: AlertCircle, gradient: 'from-orange-500 to-red-500' },
  controller: { icon: ShieldCheck, gradient: 'from-emerald-500 to-green-600' },
  dataCollection: { icon: Database, gradient: 'from-green-500 to-teal-500' },
  legalBasis: { icon: Scale, gradient: 'from-blue-600 to-indigo-600' },
  recipients: { icon: Share2, gradient: 'from-teal-500 to-cyan-600' },
  internationalTransfers: { icon: Globe2, gradient: 'from-teal-500 to-cyan-600' },
  dataRetention: { icon: Timer, gradient: 'from-indigo-500 to-blue-500' },
  yourRights: { icon: UserCheck, gradient: 'from-sky-500 to-blue-500' },
  cookies: { icon: Cookie, gradient: 'from-amber-500 to-orange-500' },
  dataSecurity: { icon: Lock, gradient: 'from-rose-500 to-pink-500' },
  disputes: { icon: Gavel, gradient: 'from-violet-500 to-purple-600' },
  modifications: { icon: RefreshCw, gradient: 'from-indigo-500 to-blue-500' },
  contact: { icon: Mail, gradient: 'from-cyan-500 to-blue-500' },
};

const TermsAndConditions: React.FC = () => {
  const { language } = useLanguage();
  const t = legal[language];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-ink via-ink-800 to-ink-800/40 px-4 py-24 md:py-32">
      {/* Background glow, desktop only */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 blur-3xl md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 blur-3xl md:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-2xl md:h-20 md:w-20">
            <FileText className="h-8 w-8 text-white md:h-10 md:w-10" />
          </div>
          <h1 className="gradient-text-premium mb-6 text-3xl font-extrabold [overflow-wrap:anywhere] sm:text-4xl md:text-5xl">
            {t.title}
          </h1>
          <div className="mx-auto mb-6 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-paper-dim md:text-lg">{t.intro}</p>
        </motion.div>

        <div className="space-y-5 md:space-y-8">
          {t.sections.map((section) => {
            const { icon: Icon, gradient } = look[section.id];
            return (
              <motion.article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-xl sm:p-8 md:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 flex items-center gap-4 md:mb-6 md:gap-6">
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg md:h-16 md:w-16`}>
                    <Icon className="h-5 w-5 text-white md:h-8 md:w-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className={`bg-gradient-to-r ${gradient} bg-clip-text text-xl font-bold leading-snug text-transparent [overflow-wrap:anywhere] md:text-3xl`}>
                      {section.title}
                    </h2>
                    <div className={`mt-2 h-1 w-16 rounded-full bg-gradient-to-r ${gradient} md:mt-3 md:w-24`} />
                  </div>
                </div>

                <div
                  className="text-[15px] leading-relaxed text-paper-dim [overflow-wrap:anywhere] md:text-lg [&_b]:font-semibold [&_b]:text-paper"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                {section.note && (
                  <p className="mt-4 rounded-xl border border-orange-400/25 bg-orange-400/10 p-4 text-[15px] leading-relaxed text-paper-dim md:text-lg">
                    {section.note}
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-iris/30 bg-ink-800 p-6 text-center shadow-xl sm:p-8 md:mt-16 md:p-12">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg md:h-16 md:w-16">
            <CheckCircle className="h-7 w-7 text-white md:h-8 md:w-8" />
          </div>
          <p className="mb-4 text-base font-bold text-paper md:text-xl">{t.acceptance}</p>
          <p className="text-sm text-paper-dim md:text-base">{t.lastUpdate}</p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
