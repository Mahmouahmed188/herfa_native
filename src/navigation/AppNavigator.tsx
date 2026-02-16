import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeStore } from '../store/themeStore';

// Screens
import SplashScreen from '../screens/SplashScreen';

// Stack Param List
export type RootStackParamList = {
  Splash: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main Stack Navigator
const AppNavigator: React.FC = () => {
  const { theme, isDarkMode } = useThemeStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
