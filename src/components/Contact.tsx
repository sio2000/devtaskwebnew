import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Linkedin, Github, CheckCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { FaLinkedin, FaGithub, FaEnvelope, FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebook, FaTiktok, FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useIsMobile } from '../hooks/useIsMobile';
import SectionEyebrow from './SectionEyebrow';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    subject: '',
    message: ''
  });
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

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || t.contact.mailtoSubject);
    const serviceText = formData.service ? `${t.contact.form.service}: ${formData.service}\n` : '';
    const body = encodeURIComponent(`${t.contact.form.name}: ${formData.name}\n${t.contact.form.email}: ${formData.email}\n${serviceText}\n${formData.message}`);
    window.location.href = `mailto:devtaskhub@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return; // honeypot tripped — silently drop
    if (!validate()) return;
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
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
      // Netlify endpoint unavailable (e.g. local dev) → fall back to email client
      openMailtoFallback();
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.info(t.contact.emailCopied);
  };

  const contactLinks = [
    {
      icon: FaEnvelope,
      value: 'Devtaskhub@gmail.com',
      href: 'mailto:Devtaskhub@gmail.com',
      color: 'text-blue-600',
    },
    {
      icon: FaPhoneAlt,
      value: '+30 6971982563',
      href: 'tel:+306971982563',
      color: 'text-green-600',
    },
    {
      icon: FaInstagram,
      value: 'Instagram',
      href: 'https://www.instagram.com/devtaskhub/',
      color: 'text-pink-600',
    },
    {
      icon: FaFacebook,
      value: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61578746165941',
      color: 'text-blue-600',
    },
    {
      icon: FaTiktok,
      value: 'TikTok',
      href: 'https://www.tiktok.com/@devtaskhub',
      color: 'text-black',
    },
    {
      icon: FaMapMarkerAlt,
      value: 'Θεσσαλονίκη, Ελλάδα',
      href: null,
      color: 'text-red-600',
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 overflow-hidden">
      {/* Premium Animated Background - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-3xl"
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
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/20 via-pink-400/15 to-purple-400/20 rounded-full blur-3xl"
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-5">
            <SectionEyebrow icon={MessageCircle} color="blue">
              {language === 'el' ? 'Ας μιλήσουμε' : language === 'fr' ? 'Parlons-en' : "Let's talk"}
            </SectionEyebrow>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
            {t.contact.description}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-6"
                autoComplete="off"
              >
                <input type="hidden" name="form-name" value="contact" />
                {/* Honeypot field — hidden from humans, catches bots */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out if you're human:
                    <input
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </label>
                </p>
                {/* Name */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.nameLabel} <span className="text-red-500">{t.contact.form.required}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
                    placeholder={t.contact.form.namePlaceholder}
                    autoComplete="name"
                  />
                  {errors.name && <span id="name-error" className="text-xs text-red-500 mt-1 block">{t.contact.form.nameRequired}</span>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.emailLabel} <span className="text-red-500">{t.contact.form.required}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
                    placeholder={t.contact.form.emailPlaceholder}
                    autoComplete="email"
                  />
                  {errors.email && <span id="email-error" className="text-xs text-red-500 mt-1 block">{t.contact.form.emailRequired}</span>}
                </div>

                {/* Service */}
                <div className="relative">
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white border-gray-300 appearance-none cursor-pointer text-gray-700"
                    >
                      <option value="">{t.contact.form.servicePlaceholder}</option>
                      <option value={t.contact.services.web}>{t.contact.services.web}</option>
                      <option value={t.contact.services.mobile}>{t.contact.services.mobile}</option>
                      <option value={t.contact.services.eshop}>{t.contact.services.eshop}</option>
                      <option value={t.contact.services.ai}>{t.contact.services.ai}</option>
                      <option value={t.contact.services.social}>{t.contact.services.social}</option>
                      <option value={t.contact.services.other}>{t.contact.services.other}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white border-gray-300"
                    placeholder={t.contact.form.subjectPlaceholder}
                    autoComplete="off"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.messageLabel} <span className="text-red-500">{t.contact.form.required}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    aria-invalid={errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white resize-none ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                  {errors.message && <span id="message-error" className="text-xs text-red-500 mt-1 block">{t.contact.form.messageRequired}</span>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear',
                    }}
                    style={{
                      backgroundSize: '200% 100%',
                    }}
                  />
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : (
                    <FaPaperPlane className="h-5 w-5 relative z-10" />
                  )}
                  <span className="relative z-10">{loading ? t.contact.form.sending : t.contact.form.send}</span>
                </motion.button>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center mt-2 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    {t.contact.success}
                  </motion.div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 flex flex-col justify-center">
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                const cardClass = "flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300";
                const inner = (
                  <>
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0">
                      <Icon className={`h-5 w-5 ${link.color}`} />
                    </span>
                    <span className="text-base font-medium text-gray-800 break-words">
                      {link.value}
                    </span>
                  </>
                );

                if (link.href) {
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <div key={index} className={cardClass}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
};

export default Contact;
