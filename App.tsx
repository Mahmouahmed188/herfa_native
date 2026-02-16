import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useThemeStore } from './src/store/themeStore';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}
