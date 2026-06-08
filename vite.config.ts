import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'recharts'],
  },
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Prefer to colocate framer-motion with React to ensure React exports
          // are available before animation code runs (avoids createContext undefined).
          if (id.includes('node_modules/framer-motion')) {
            return 'react-vendor';
          }
          // Charts (recharts + its transitive deps) — only used by the lazy /admin panel
          if (
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/recharts-scale') ||
            id.includes('node_modules/react-smooth') ||
            id.includes('node_modules/victory-vendor') ||
            id.includes('node_modules/d3-') ||
            id.includes('node_modules/internmap') ||
            id.includes('node_modules/es-toolkit') ||
            id.includes('node_modules/decimal.js-light') ||
            id.includes('node_modules/eventemitter3') ||
            id.includes('node_modules/tiny-invariant')
          ) {
            return 'charts-vendor';
          }
          // Other animation libraries can remain separate
          if (id.includes('node_modules/gsap') || id.includes('node_modules/aos')) {
            return 'animation-vendor';
          }
          // UI libraries chunk
          if (id.includes('node_modules/react-icons') || id.includes('node_modules/lucide-react') || id.includes('node_modules/react-helmet')) {
            return 'ui-vendor';
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
});
