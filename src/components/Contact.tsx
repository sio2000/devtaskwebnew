import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Linkedin, Github, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { FaLinkedin, FaGithub, FaEnvelope, FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Δημιουργώ το mailto link
    const subject = encodeURIComponent(formData.subject || t.contact.mailtoSubject);
    const serviceText = formData.service ? `${t.contact.form.service}: ${formData.service}\n` : '';
    const body = encodeURIComponent(`${t.contact.form.name}: ${formData.name}\n${t.contact.form.email}: ${formData.email}\n${serviceText}\n${formData.message}`);
    window.location.href = `mailto:Devtaskhub@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.info(t.contact.emailCopied);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      value: t.contact.info.location,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      link: null
    },
    {
      icon: Phone,
      title: 'Phone',
      value: t.contact.info.phone,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      link: 'tel:+306949719825'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'xsiwzos@gmail.com',
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-50',
      link: 'mailto:xsiwzos@gmail.com'
    },
    {
      icon: Mail,
      title: 'Business Email',
      value: t.contact.info.email,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      link: 'mailto:info@devtaskhub.com'
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Hero Section (Contact-specific) */}
      <motion.div
      className="max-w-3xl mx-auto text-center mb-16 relative z-20"
      initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg mb-2 animate-bounce-slow">
          <FaEnvelope className="text-white text-4xl drop-shadow" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent mb-2">{t.contact.title}</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto whitespace-pre-line">
          {t.contact.description}
        </p>
      </div>
    </motion.div>
    {/* Icon background */}
    <motion.div
      className="absolute -top-20 -left-20 w-96 h-96 z-0"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.12, scale: 1 }}
      transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
    <FaEnvelope className="w-full h-full text-blue-300" />
    </motion.div>
  <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-14 flex flex-col md:flex-row gap-12 items-stretch">
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-8 justify-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        autoComplete="off"
      >
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
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
            placeholder={t.contact.form.namePlaceholder}
            autoComplete="off"
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 block">{t.contact.form.nameRequired}</span>}
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
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
            placeholder={t.contact.form.emailPlaceholder}
            autoComplete="off"
          />
          {errors.email && <span className="text-xs text-red-500 mt-1 block">{t.contact.form.emailRequired}</span>}
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
              className="w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white border-gray-300 appearance-none cursor-pointer text-gray-700"
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
        {/* Θέμα */}
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
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white border-gray-300"
            placeholder={t.contact.form.subjectPlaceholder}
            autoComplete="off"
          />
        </div>
        {/* Μήνυμα */}
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
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white resize-none ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
            placeholder={t.contact.form.messagePlaceholder}
          />
          {errors.message && <span className="text-xs text-red-500 mt-1 block">{t.contact.form.messageRequired}</span>}
        </div>
            <motion.button
              type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80, 80, 200, 0.18)' }}
              whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          ) : (
            <FaEnvelope className="h-5 w-5" />
          )}
          <span>{loading ? t.contact.form.sending : t.contact.form.send}</span>
            </motion.button>
        {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-center mt-2">{t.contact.success}</motion.div>}
      </motion.form>
      {/* Info */}
                  <motion.div 
        className="flex-1 flex flex-col gap-8 justify-center items-start md:pl-8 border-t md:border-t-0 md:border-l border-blue-100 mt-10 md:mt-0 pt-10 md:pt-0"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <a href="mailto:Devtaskhub@gmail.com" className="flex items-center gap-4 text-blue-700 text-lg font-semibold hover:text-blue-500 transition-colors group">
          <FaEnvelope className="h-5 w-5 text-blue-500 group-hover:text-blue-700 transition-colors" />
          <span>Devtaskhub@gmail.com</span>
        </a>
        <a href="tel:+306971982563" className="flex items-center gap-4 text-green-700 text-lg font-semibold hover:text-green-500 transition-colors group">
          <FaPhoneAlt className="h-5 w-5 text-green-500 group-hover:text-green-700 transition-colors" />
          <span>+30 6971982563</span>
        </a>
        <a href="https://www.instagram.com/devtaskhub/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-pink-600 text-lg font-semibold hover:text-pink-400 transition-colors group">
          <FaInstagram className="h-5 w-5 text-pink-500 group-hover:text-pink-600 transition-colors" />
          <span>{t.footer.social.instagram}</span>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61578746165941" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-blue-600 text-lg font-semibold hover:text-blue-800 transition-colors group">
          <FaFacebook className="h-5 w-5 text-blue-500 group-hover:text-blue-700 transition-colors" />
          <span>{t.footer.social.facebook}</span>
        </a>
        <a href="https://www.tiktok.com/@devtaskhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black text-lg font-semibold hover:text-gray-700 transition-colors group">
          <FaTiktok className="h-5 w-5 text-black group-hover:text-gray-700 transition-colors" />
          <span>{t.footer.social.tiktok}</span>
        </a>
        <div className="flex items-center gap-4 text-red-700 text-lg font-semibold">
          <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
          <span>{t.contact.info.location}</span>
        </div>
      </motion.div>
    </div>
  </div>
</section>
  );
};

export default Contact;