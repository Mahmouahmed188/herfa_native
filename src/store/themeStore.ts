import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, lightTheme, darkTheme } from '../utils/theme';

interface ThemeStore {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: lightTheme,
      isDarkMode: false,
      toggleTheme: () => {
        const newIsDarkMode = !get().isDarkMode;
        set({
          theme: newIsDarkMode ? darkTheme : lightTheme,
          isDarkMode: newIsDarkMode,
        });
      },
      setTheme: (isDark: boolean) => {
        set({
          theme: isDark ? darkTheme : lightTheme,
          isDarkMode: isDark,
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
