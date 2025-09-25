import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, defaultLanguage } from '../utils/i18n';

// Import translations directly to avoid module resolution issues
import { ru } from '../utils/translations/ru';
import { uz } from '../utils/translations/uz';
import { en } from '../utils/translations/en';
import type { TranslationKeys } from '../utils/translations';

// Create translations object directly in this file
const translations: Record<Language, TranslationKeys> = {
  ru,
  uz,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Safely try to get language from localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('ekogumus-language');
        if (stored && (stored === 'ru' || stored === 'uz' || stored === 'en')) {
          return stored as Language;
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
    return defaultLanguage;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Safely try to save to localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('ekogumus-language', lang);
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
    
    // Update document lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    // Set initial document language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Get translation object with fallback
  const t = translations[language] || translations[defaultLanguage] || translations.ru;

  // Don't render if translations are not available
  if (!t) {
    return <div>Loading translations...</div>;
  }
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}