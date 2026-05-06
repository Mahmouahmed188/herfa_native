import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuthStore } from '../store/authStore';

const { width, height } = Dimensions.get('window');

/**
 * Construction Icon Component
 * Displays the app icon/logo using an emoji (🏗️) which represents construction/building
 * Fully responsive - accepts size and color props
 */
const ConstructionIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = '#FFFFFF',
}) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Construction emoji scaled proportionally to the container size */}
      <Text style={[styles.iconText, { fontSize: size * 0.6, color }]}>
        🏗️
      </Text>
    </View>
  );
};

// Spinning Activity Indicator
/**
 * Custom Activity Spinner Component
 * Displays a rotating loading indicator with smooth animation
 * Uses React Native's Animated API for 360-degree continuous rotation
 */
const ActivitySpinner: React.FC<{ color?: string; size?: number }> = ({
  color = '#53D22D',
  size = 20,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a continuous spinning animation that loops forever
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    // Cleanup: Stop animation when component unmounts
    return () => spinAnimation.stop();
  }, [spinValue]);

  // Interpolate the spin value to convert from 0-1 to 0deg-360deg
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Text style={{ fontSize: size, color }}>⟳</Text>
    </Animated.View>
  );
};

/**
 * SplashScreen Component
 * 
 * This is the initial loading screen that appears when the app launches.
 * Features:
 * - Displays the app logo with animated entrance
 * - Shows a loading indicator and progress bar
 * - Automatically navigates to the Onboarding screen after 2.5 seconds
 * - Includes smooth fade-out transition before navigation
 * - Supports dark/light mode themes
 */
const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { checkAuth, isAuthenticated } = useAuthStore();
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initializeApp = async () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(progressAnim, {
        toValue: 0.65,
        duration: 2000,
        useNativeDriver: false,
      }).start();

      const isAuth = await checkAuth();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (isAuth) {
            navigation.replace('Main');
          } else {
            navigation.replace('Onboarding');
          }
        });
      }, 2500);
    };

    initializeApp();

    return () => {};
  }, [fadeAnim, scaleAnim, progressAnim, navigation, checkAuth]);

  const backgroundColor = isDark ? '#0A0F08' : '#f8f7f5';
  const textColor = isDark ? '#FFFFFF' : '#1a1a1a';
  const secondaryTextColor = isDark ? '#88A381' : '#6b7280';
  const progressBgColor = isDark ? '#1A2318' : '#e5e7eb';

  return (
    // Main container - takes full screen, applies theme background
    <View style={[styles.container, { backgroundColor }]}>
      {/* Status bar adapts to theme for consistent appearance */}
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Background Gradient Overlay - adds visual depth */}
      <LinearGradient
        colors={
          isDark
            ? ['transparent', 'transparent', 'rgba(10, 15, 8, 0.95)']
            : ['transparent', 'transparent', 'rgba(248, 247, 245, 0.8)']
        }
        style={styles.gradientOverlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Main Content Wrapper */}
      <View style={styles.content}>
        {/* Top Spacer - pushes content to center vertically */}
        <View style={styles.topSpacer} />

        {/* Logo Section with entrance animations */}
        <Animated.View
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
          accessibilityLabel="Herfa App Logo"
          accessibilityRole="header"
        >
          {/* Logo Container with gradient background */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#53D22D', '#46B426']}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Border overlay for subtle depth */}
              <View style={styles.logoBorder} />
              <ConstructionIcon size={48} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* App Name */}
          <Text style={[styles.appName, { color: textColor }]}>Herfa</Text>

          {/* Tagline */}
          <Text style={[styles.tagline, { color: secondaryTextColor }]}>
            Smart Construction Solutions
          </Text>
        </Animated.View>

        {/* Bottom Section - Loading and version info */}
        <View style={styles.bottomSection}>
          {/* Loading Section with progress indicator */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingHeader}>
              <Text style={[styles.loadingText, { color: secondaryTextColor }]}>
                LOADING
              </Text>
              <ActivitySpinner color="#53D22D" size={16} />
            </View>

            {/* Animated Progress Bar */}
            <View
              style={[
                styles.progressBarContainer,
                { backgroundColor: progressBgColor },
              ]}
              accessibilityLabel="Loading progress"
              accessibilityRole="progressbar"
            >
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Version Info */}
          <Text style={[styles.versionText, { color: secondaryTextColor }]}>
            v1.0.0 • Powered by Herfa Inc.
          </Text>
        </View>
      </View>
    </View>
  );
};

/**
 * Styles for SplashScreen
 * Uses responsive sizing based on screen dimensions
 * Works on all device sizes (phones, tablets)
 */
const styles = StyleSheet.create({
  // Main container fills the entire screen
  container: {
    flex: 1,
  },
  // Background gradient overlay covers entire screen
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  // Content wrapper for proper z-index layering
  content: {
    flex: 1,
    zIndex: 1,
  },
  // Top spacer takes 15% of screen height for vertical centering
  topSpacer: {
    height: height * 0.15,
  },
  // Logo section centered with padding
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  // Logo container with shadow effects
  logoContainer: {
    marginBottom: 32,
    // iOS shadow
    shadowColor: '#53D22D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // Android shadow
    elevation: 10,
  },
  // Gradient background for logo
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Subtle border overlay for depth
  logoBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  // Icon container
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Icon text styling
  iconText: {
    textAlign: 'center',
  },
  // App name text styling
  appName: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  // Tagline text styling
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  // Bottom section with loading and version
  bottomSection: {
    paddingHorizontal: 48,
    paddingBottom: 64,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Limits width on larger screens
    alignSelf: 'center',
  },
  // Loading container
  loadingContainer: {
    width: '100%',
    marginBottom: 40,
  },
  // Loading header with text and spinner
  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  // Loading text styling
  loadingText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  // Progress bar container
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  // Animated progress bar with glow effect
  progressBar: {
    height: '100%',
    backgroundColor: '#53D22D',
    borderRadius: 3,
    // Glow effect
    shadowColor: '#53D22D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  // Version text styling
  versionText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
});

export default SplashScreen;
