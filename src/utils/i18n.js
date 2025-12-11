/**
 * i18n.js - Internationalization utility
 * Handles loading and managing translations
 */

import ptTranslations from '../i18n/pt.json';
import enTranslations from '../i18n/en.json';

// Available translations
const translations = {
  pt: ptTranslations,
  en: enTranslations
};

// Default language
const DEFAULT_LANGUAGE = 'pt';

/**
 * Get translation object for a specific language
 * @param {string} language - Language code (pt, en)
 * @returns {object} Translation object
 */
export const getTranslations = (language = DEFAULT_LANGUAGE) => {
  return translations[language] || translations[DEFAULT_LANGUAGE];
};

/**
 * Get current language from localStorage or browser
 * @returns {string} Language code
 */
export const getCurrentLanguage = () => {
  // Try to get from localStorage
  const stored = localStorage.getItem('bap-wallet-language');
  if (stored && translations[stored]) {
    return stored;
  }

  // Try to get from browser
  const browserLang = navigator.language.split('-')[0];
  if (translations[browserLang]) {
    return browserLang;
  }

  return DEFAULT_LANGUAGE;
};

/**
 * Set current language
 * @param {string} language - Language code to set
 */
export const setCurrentLanguage = (language) => {
  if (!translations[language]) {
    console.warn(`Language ${language} not available, using default`);
    return;
  }
  localStorage.setItem('bap-wallet-language', language);
};

/**
 * Get available languages
 * @returns {array} Array of language objects
 */
export const getAvailableLanguages = () => {
  return [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];
};

export default {
  getTranslations,
  getCurrentLanguage,
  setCurrentLanguage,
  getAvailableLanguages
};
