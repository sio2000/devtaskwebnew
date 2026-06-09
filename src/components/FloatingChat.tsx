import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const CHAT_SRC = 'https://app.fastbots.ai/embed/cmi3aucsu01jhqn1oj37op5mz';

/**
 * Self-controlled floating chat launcher + panel.
 * Replaces the third-party FastBots launcher (whose close button was broken on mobile).
 * The iframe is mounted on first open and kept alive (visibility toggled) to preserve the conversation.
 * Opens on click or on a global `open-chat` event (used by the on-page chat CTA section).
 */
const FloatingChat: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const openChat = useCallback(() => {
    setHasOpened(true);
    setOpen(true);
  }, []);
  const closeChat = useCallback(() => setOpen(false), []);

  // Allow other components (e.g. the chat CTA section) to open the panel
  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, [openChat]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeChat]);

  return (
    <>
      {/* Launcher button */}
      <motion.button
        type="button"
        onClick={() => (open ? closeChat() : openChat())}
        aria-label={open ? (t.chatbot.close || 'Κλείσιμο chat') : (t.chatbot.open || 'Άνοιγμα chat')}
        aria-expanded={open}
        // Hide on mobile while open — the X overlapped FastBots' send button (iOS/Android)
        className={`fixed bottom-5 right-5 z-[60] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white shadow-2xl items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 ${open ? 'hidden sm:flex' : 'flex'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop (mobile) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.chatbot.title}
            className="fixed z-[58] bg-white shadow-2xl overflow-hidden flex flex-col
                       inset-x-3 bottom-3 top-[15vh] rounded-3xl
                       sm:inset-auto sm:bottom-24 sm:right-5 sm:top-auto sm:w-[400px] sm:h-[600px] sm:max-h-[80vh]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Slim close bar — the embedded bot provides its own title/branding */}
            <div className="flex items-center justify-end px-2.5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white">
              <button
                type="button"
                onClick={closeChat}
                aria-label={t.chatbot.close || 'Κλείσιμο chat'}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 h-8 rounded-full hover:bg-white/20 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{t.chatbot.close || 'Κλείσιμο'}</span>
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Iframe (kept mounted after first open to preserve the conversation) */}
            <div className="flex-1 bg-white">
              {hasOpened && (
                <iframe
                  src={CHAT_SRC}
                  title={t.chatbot.title}
                  className="w-full h-full border-0"
                  allow="microphone"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
