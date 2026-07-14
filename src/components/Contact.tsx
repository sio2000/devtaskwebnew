import React, { useState } from 'react';
import { ChevronDown, CheckCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebook, FaTiktok, FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({ name: '', email: '', service: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [botField, setBotField] = useState('');

  const validate = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email),
      message: !formData.message.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || t.contact.mailtoSubject);
    const serviceText = formData.service ? `${t.contact.form.service}: ${formData.service}\n` : '';
    const body = encodeURIComponent(`${t.contact.form.name}: ${formData.name}\n${t.contact.form.email}: ${formData.email}\n${serviceText}\n${formData.message}`);
    window.location.href = `mailto:info@devtaskhub.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return; // honeypot tripped — silently drop
    if (!validate()) return;
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'bot-field': botField,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSuccess(true);
      toast.success(t.contact.success);
      setFormData({ name: '', email: '', service: '', subject: '', message: '' });
    } catch {
      openMailtoFallback();
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    { icon: FaEnvelope, value: 'info@devtaskhub.com', href: 'mailto:info@devtaskhub.com' },
    { icon: FaPhoneAlt, value: '+30 6971982563', href: 'tel:+306971982563' },
    { icon: FaInstagram, value: 'Instagram', href: 'https://www.instagram.com/devtaskhub/' },
    { icon: FaFacebook, value: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61578746165941' },
    { icon: FaTiktok, value: 'TikTok', href: 'https://www.tiktok.com/@devtaskhub' },
    { icon: FaMapMarkerAlt, value: 'Θεσσαλονίκη, Ελλάδα', href: null },
  ];

  const field = 'w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-paper placeholder:text-paper-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-iris/60';
  const fieldOk = 'border-[var(--line)] focus:border-iris/60';
  const fieldErr = 'border-red-400/70 focus:ring-red-400/60';

  return (
    <section id="contact" className="surface-ink relative overflow-hidden py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          label={language === 'el' ? 'Ας μιλήσουμε' : language === 'fr' ? 'Parlons-en' : "Let's talk"}
          title={t.contact.title}
          kicker={language === 'el' ? 'σήμερα' : language === 'fr' ? "aujourd'hui" : 'today'}
          align="center"
          className="mb-6"
        />
        <Reveal className="mb-14 text-center">
          <p className="mx-auto max-w-2xl whitespace-pre-line text-lg text-paper-dim">{t.contact.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal className="card-ink p-7 md:p-9">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              autoComplete="off"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden" aria-hidden="true">
                <label>
                  Don't fill this out if you're human:
                  <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
                </label>
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-paper-dim">
                    {t.contact.form.nameLabel} <span className="text-iris-bright">{t.contact.form.required}</span>
                  </label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    aria-invalid={errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`${field} ${errors.name ? fieldErr : fieldOk}`} placeholder={t.contact.form.namePlaceholder} autoComplete="name"
                  />
                  {errors.name && <span id="name-error" className="mt-1 block text-xs text-red-400">{t.contact.form.nameRequired}</span>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-paper-dim">
                    {t.contact.form.emailLabel} <span className="text-iris-bright">{t.contact.form.required}</span>
                  </label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    aria-invalid={errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`${field} ${errors.email ? fieldErr : fieldOk}`} placeholder={t.contact.form.emailPlaceholder} autoComplete="email"
                  />
                  {errors.email && <span id="email-error" className="mt-1 block text-xs text-red-400">{t.contact.form.emailRequired}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-paper-dim">{t.contact.form.serviceLabel}</label>
                <div className="relative">
                  <select
                    id="service" name="service" value={formData.service} onChange={handleChange}
                    className={`${field} ${fieldOk} cursor-pointer appearance-none pr-10 [&>option]:bg-ink-700 [&>option]:text-paper`}
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    <option value={t.contact.services.web}>{t.contact.services.web}</option>
                    <option value={t.contact.services.mobile}>{t.contact.services.mobile}</option>
                    <option value={t.contact.services.eshop}>{t.contact.services.eshop}</option>
                    <option value={t.contact.services.ai}>{t.contact.services.ai}</option>
                    <option value={t.contact.services.social}>{t.contact.services.social}</option>
                    <option value={t.contact.services.other}>{t.contact.services.other}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-paper-muted" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-paper-dim">{t.contact.form.subjectLabel}</label>
                <input
                  type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                  className={`${field} ${fieldOk}`} placeholder={t.contact.form.subjectPlaceholder} autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-paper-dim">
                  {t.contact.form.messageLabel} <span className="text-iris-bright">{t.contact.form.required}</span>
                </label>
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                  aria-invalid={errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${field} resize-none ${errors.message ? fieldErr : fieldOk}`} placeholder={t.contact.form.messagePlaceholder}
                />
                {errors.message && <span id="message-error" className="mt-1 block text-xs text-red-400">{t.contact.form.messageRequired}</span>}
              </div>

              <motion.button
                type="submit"
                className="btn-accent group mt-1 w-full justify-center px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
              >
                {loading ? (
                  <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <FaPaperPlane className="h-4 w-4" />
                )}
                <span>{loading ? t.contact.form.sending : t.contact.form.send}</span>
              </motion.button>
              {success && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-1 flex items-center justify-center gap-2 text-signal">
                  <CheckCircle className="h-5 w-5" />
                  {t.contact.success}
                </motion.div>
              )}
            </form>
          </Reveal>

          {/* Contact links */}
          <Reveal delay={0.1} className="flex flex-col gap-3">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              const cls = 'group flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white/[0.015] p-4 transition-colors hover:border-iris/30 hover:bg-white/[0.03]';
              const inner = (
                <>
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-white/[0.03] text-iris-bright">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="break-words text-base font-medium text-paper">{link.value}</span>
                  {link.href && <ArrowUpRight className="ml-auto h-4 w-4 text-paper-muted opacity-0 transition-opacity group-hover:opacity-100" />}
                </>
              );
              return link.href ? (
                <a key={index} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={cls}>
                  {inner}
                </a>
              ) : (
                <div key={index} className={cls}>{inner}</div>
              );
            })}
          </Reveal>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  );
};

export default Contact;
