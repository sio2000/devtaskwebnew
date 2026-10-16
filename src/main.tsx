import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Runs after React's first commit, when the app's own LoadingScreen is already on screen:
// only then drop the static boot splash from index.html
const DropBootSplash = () => {
  useEffect(() => document.getElementById('boot-splash')?.remove(), []);
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <DropBootSplash />
    </HelmetProvider>
  </StrictMode>
);
