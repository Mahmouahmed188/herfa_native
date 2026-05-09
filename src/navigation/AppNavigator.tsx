import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingWelcomeScreen from '../screens/OnboardingWelcomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import BookingRequestScreen from '../screens/BookingRequestScreen';
import BookingSummaryScreen from '../screens/BookingSummaryScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import BookingStatusScreen from '../screens/BookingStatusScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import LocationSelectionScreen from '../screens/LocationSelectionScreen';
import type { Job } from '../services';

// Root Stack Param List
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Registration: undefined;
  Login: undefined;
  Main: undefined;
  BookingRequest: undefined;
  BookingSummary: {
    bookingId?: string;
    bookingData?: any;
  };
  BookingConfirmation: {
    bookingId?: string;
  };
  BookingStatus: {
    job?: Job;
  };
  Payment: {
    totalAmount?: number;
    bookingId?: string;
  };
  PaymentSuccess: {
    amount?: number;
    paymentMethod?: string;
    bookingId?: string;
  };
  LocationSelection: {
    currentPlace?: string;
    currentCoords?: {
      lat: number;
      lng: number;
    };
    onLocationSelected?: (
      address: string,
      coords: { lat: number; lng: number },
    ) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Auth Navigator - Screens for non-authenticated users
const AuthNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// Main Navigator - App screens for authenticated users
const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="BookingRequest" component={BookingRequestScreen} />
      <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen
        name="LocationSelection"
        component={LocationSelectionScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

// Root Navigator - Handles auth state and navigation flow
const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  // Initialize app state
  useEffect(() => {
    // Small delay to ensure stores are hydrated from storage
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show nothing while loading to prevent navigation flash
  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
