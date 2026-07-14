/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Color Palette
        premium: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        luxury: {
          purple: '#6366f1',
          indigo: '#4f46e5',
          blue: '#2563eb',
          cyan: '#06b6d4',
          pink: '#ec4899',
          gold: '#f59e0b',
        },
        dark: {
          bg: '#0a0a0f',
          surface: '#141420',
          card: '#1a1a2e',
        },
        // — Midnight Atelier system (new radical redesign) —
        ink: {
          DEFAULT: '#08080B',
          900: '#08080B',
          800: '#0D0D12',
          700: '#14141B',
          600: '#1C1C25',
          500: '#262630',
        },
        paper: {
          DEFAULT: '#F5F4EF',
          dim: '#C9C8C2',
          muted: '#8B8B95',
        },
        iris: {
          DEFAULT: '#6E56F8',
          bright: '#8B78FF',
          deep: '#4B37C4',
        },
        signal: '#34E4EA',
        amber: {
          soft: '#E8B15A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        // — Midnight Atelier motion —
        'marquee': 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--marquee-duration, 40s) linear infinite',
        'spin-slower': 'spin 22s linear infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(-10deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)' },
        },
        // — Midnight Atelier keyframes —
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.5' },
          '33%': { transform: 'translate3d(6%,-4%,0) scale(1.12)', opacity: '0.75' },
          '66%': { transform: 'translate3d(-5%,5%,0) scale(0.95)', opacity: '0.55' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(1.7)', opacity: '0' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
        'luxury': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'luxury-lg': '0 15px 60px 0 rgba(31, 38, 135, 0.4)',
        'luxury-xl': '0 20px 80px 0 rgba(31, 38, 135, 0.45)',
        'premium-glow': '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)',
        'premium-glow-lg': '0 0 50px rgba(139, 92, 246, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)',
        'premium-glow-xl': '0 0 80px rgba(139, 92, 246, 0.6), 0 0 150px rgba(59, 130, 246, 0.4), 0 0 200px rgba(168, 85, 247, 0.2)',
        'inner-luxury': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1), inset 0 0 8px 0 rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 15px 60px 0 rgba(31, 38, 135, 0.4)',
        'neon-blue': '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)',
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      perspective: {
        '1000': '1000px',
      },
      letterSpacing: {
        'luxury': '0.05em',
        'luxury-wide': '0.1em',
        'tight': '-0.025em',
        'tighter': '-0.05em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(20, 184, 166, 0.1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
    },
  },
  plugins: [],
};