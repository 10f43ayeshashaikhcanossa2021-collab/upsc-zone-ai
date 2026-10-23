import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';
import { LangProvider } from './i18n/LangContext.jsx';

createRoot(document.getElementById('root')).render(
  <LangProvider>
    <App />
  </LangProvider>
);
