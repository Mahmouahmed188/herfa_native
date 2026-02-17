import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme colors
export const lightTheme = {
  colors: {
    primary: '#53D22D',
    primaryDark: '#46B426',
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceSecondary: '#F9FAFB',
    text: '#333333',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    borderLight: '#E5E7EB',
    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    notification: '#EF4444',
    card: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
      xxxl: 30,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#0A0F08',
    backgroundSecondary: '#1A2318',
    surface: '#1A2318',
    surfaceSecondary: '#0A0F08',
    text: '#FFFFFF',
    textSecondary: '#88A381',
    border: '#1A2318',
    borderLight: '#1A2318',
    card: '#1A2318',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export type Theme = typeof lightTheme;

// Storage key
const THEME_STORAGE_KEY = '@herfa_theme';

// Theme options
export type ThemeMode = 'light' | 'dark' | 'system';

// Context interface
interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider Props
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Manages theme state and provides theme values
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [isReady, setIsReady] = useState(false);

  // Initialize theme from storage
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing theme:', error);
        setIsReady(true);
      }
    };

    initializeTheme();
  }, []);

  // Determine if dark mode is active
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Get current theme
  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  // Set theme mode
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Force re-render when system theme changes
      if (themeMode === 'system') {
        // Force update - React will re-render with new isDark value
      }
    });

    return () => subscription.remove();
  }, [themeMode]);

  // Don't render until initialized
  if (!isReady) {
    return null;
  }

  const contextValue: ThemeContextType = {
    theme,
    themeMode,
    isDark,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * @returns ThemeContextType
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
