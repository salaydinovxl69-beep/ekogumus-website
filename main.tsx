import React from 'react';
declare module '*.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
// «Земля и Зерно» earthy redesign — loaded after globals so its (unlayered)
// rules win over the legacy liquid-glass base styles.
import './styles/earthy.css';
import './styles/earthy-pages.css';
import './styles/earthy-dark.css';

// Self-hosted «Земля и Зерно» fonts (Spectral / Manrope / JetBrains Mono) —
// без render-blocking CSS с fonts.googleapis.com и двух внешних соединений.
// Начертания соответствуют прежнему Google Fonts URL; font-display: swap по умолчанию.
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';
import '@fontsource/spectral/700.css';
import '@fontsource/spectral/500-italic.css';
import '@fontsource/spectral/600-italic.css';
import '@fontsource-variable/manrope'; // 400–800
import '@fontsource-variable/jetbrains-mono'; // 400–500
// Open Sans 400 — используется тостами (класс font-opensans на Toaster).
import '@fontsource/open-sans/400.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
