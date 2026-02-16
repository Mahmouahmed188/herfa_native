import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useThemeStore } from '../store/themeStore';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingWelcomeScreen from '../screens/OnboardingWelcomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';

// Stack Param List
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Registration: undefined;
  Login: undefined;
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
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingWelcomeScreen}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
