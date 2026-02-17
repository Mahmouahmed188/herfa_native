import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Import translation files
import en from './translations/en.json';
import ar from './translations/ar.json';

// Get saved language or default to English
const getSavedLanguage = async (): Promise<string> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    const language = await AsyncStorage.getItem('@herfa_language');
    return language || 'en';
  } catch {
    return 'en';
  }
};

// Save language preference
const saveLanguage = async (language: string): Promise<void> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    await AsyncStorage.setItem('@herfa_language', language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Check if current language is RTL
const isRTL = (): boolean => {
  const currentLang = i18n.language || 'en';
  return currentLang === 'ar';
};

// Get current language
const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

// Change language
const changeLanguage = async (language: string): Promise<void> => {
  await i18n.changeLanguage(language);
  await saveLanguage(language);
};

// Initialize i18next
i18n
  // Load translations via HTTP (for production)
  .use(HttpApi)
  // Language detector
  .use(LanguageDetector)
  // React i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    // Language detector options
    detection: {
      order: ['localStorage', 'asyncStorage'],
      caches: ['localStorage', 'asyncStorage'],
      lookupLocalStorage: 'herfa_language',
    },
    // Backend options
    backend: {
      loadPath: '/translations/{{lng}}.json',
    },
    react: {
      useSuspense: false,
    },
  });

// Export i18n instance
export default i18n;

// Export helper functions
export { changeLanguage, getSavedLanguage, saveLanguage, isRTL, getCurrentLanguage };
