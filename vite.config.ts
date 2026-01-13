import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
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
          // Animation libraries chunk
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap') || id.includes('node_modules/aos')) {
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
