import React from 'react';
import { motion } from 'framer-motion';

type EyebrowColor = 'blue' | 'purple' | 'pink' | 'emerald';

interface SectionEyebrowProps {
  icon?: React.ElementType;
  children: React.ReactNode;
  color?: EyebrowColor;
  className?: string;
}

const colorMap: Record<EyebrowColor, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
  pink: 'bg-pink-50 text-pink-700 border-pink-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

/** Small, consistent "eyebrow" pill shown above section headings for visual rhythm. */
const SectionEyebrow: React.FC<SectionEyebrowProps> = ({ icon: Icon, children, color = 'blue', className = '' }) => (
  <motion.span
    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${colorMap[color]} ${className}`}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
    {children}
  </motion.span>
);

export default SectionEyebrow;
