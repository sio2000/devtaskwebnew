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
        // Only split recharts (lazy /admin). Avoid splitting React/framer-motion into
        // separate chunks — that created a circular import (react-vendor ↔ vendor)
        // and crashed the app with "Cannot read properties of undefined (reading 'useState')".
        manualChunks(id) {
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
