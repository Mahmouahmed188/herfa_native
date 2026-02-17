import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { I18nManager, Platform, Alert } from 'react-native';
import i18n, { getSavedLanguage, changeLanguage, isRTL as checkIsRTL, getCurrentLanguage } from '../i18n';

// Supported languages configuration
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', isRTL: false },
  { code: 'ar', name: 'العربية', isRTL: true },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

// Context interface
interface LanguageContextType {
  currentLanguage: LanguageCode;
  isRTL: boolean;
  changeLanguage: (language: LanguageCode) => Promise<void>;
  t: (key: string, options?: Record<string, any>) => string;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Props
interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * Language Provider Component
 * Manages language state and RTL layout
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isRTLState, setIsRTLState] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = await getSavedLanguage();
        const rtl = savedLanguage === 'ar';
        
        setCurrentLanguage(savedLanguage as LanguageCode);
        setIsRTLState(rtl);
        
        // Force RTL layout for Arabic
        if (I18nManager.isRTL !== rtl) {
          I18nManager.forceRTL(rtl);
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing language:', error);
        setIsReady(true);
      }
    };

    initializeLanguage();
  }, []);

  // Listen to i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng as LanguageCode);
      setIsRTLState(checkIsRTL());
      
      // Update RTL layout
      const shouldBeRTL = lng === 'ar';
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.forceRTL(shouldBeRTL);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  /**
   * Change application language
   * @param language - Target language code
   */
  const handleChangeLanguage = useCallback(async (language: LanguageCode) => {
    try {
      const newIsRTL = language === 'ar';
      const currentIsRTL = I18nManager.isRTL;
      
      await changeLanguage(language);
      
      // If RTL state changed, alert user to restart app for full effect
      if (newIsRTL !== currentIsRTL) {
        I18nManager.forceRTL(newIsRTL);
        
        // Show restart alert for RTL changes
        if (Platform.OS !== 'web') {
          Alert.alert(
            t('common.success'),
            newIsRTL 
              ? 'Language changed to Arabic. Please restart the app for full RTL support.'
              : 'Language changed to English.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error changing language:', error);
      Alert.alert(t('common.error'), 'Failed to change language');
    }
  }, [t]);

  // Don't render until initialized
  if (!isReady) {
    return null;
  }

  const contextValue: LanguageContextType = {
    currentLanguage,
    isRTL: isRTLState,
    changeLanguage: handleChangeLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};

/**
 * Custom hook to use language context
 * @returns LanguageContextType
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
