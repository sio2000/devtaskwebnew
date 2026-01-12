import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Zap, Bot } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

const ChatbotSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();

  return (
    <section id="chatbot" className="relative py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Animated Background Decorations */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1], 
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2], 
              rotate: [360, 180, 0],
              x: [0, -40, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-2xl"
          />
        </div>
      )}

      {/* Floating Icons */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${15 + (i * 15)}%`,
                left: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <MessageCircle 
                className={`w-8 h-8 ${
                  i % 3 === 0 ? 'text-purple-400/40' : 
                  i % 3 === 1 ? 'text-pink-400/40' : 
                  'text-blue-400/40'
                }`} 
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <Bot className="w-10 h-10 text-white" />
              </div>
            </div>
            <Sparkles className="w-8 h-8 text-purple-500" />
            <Zap className="w-8 h-8 text-pink-500" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {t.chatbot.title}
            </span>
          </h2>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.chatbot.subtitle}
            <br className="hidden sm:block" />
            <span className="font-semibold text-purple-600">{t.chatbot.cta}</span>
          </motion.p>
        </motion.div>

        {/* Chatbot Container */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative z-20">
            {/* Glow Effect - Μόνο στο background, όχι πάνω στο iframe */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ pointerEvents: 'none' }}
              />
            )}
            
            {/* Chatbot Frame Container */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl border-4 border-transparent bg-clip-padding"
              style={{
                backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #a855f7, #ec4899, #3b82f6)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              {/* Decorative Corner Elements */}
              {!isMobile && (
                <>
                  <motion.div
                    className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}

              {/* Iframe Container */}
              <div className="p-4 sm:p-6 bg-white rounded-2xl">
                <iframe
                  style={{ 
                    width: isMobile ? '100%' : '400px', 
                    height: '600px',
                    border: 'none',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white'
                  }}
                  src="https://app.fastbots.ai/embed/cmi3aucsu01jhqn1oj37op5mz"
                  title="DevTaskHub Chatbot"
                  allow="microphone"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Fun Decorative Elements */}
        {!isMobile && (
          <motion.div
            className="mt-16 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {['💬', '🤖', '✨', '🚀', '💡'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-4xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom Wave Divider */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white transform rotate-180">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      )}
    </section>
  );
};

export default ChatbotSection;

