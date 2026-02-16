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

const { width, height } = Dimensions.get('window');

// Construction Icon Component (using simple shapes)
const ConstructionIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = '#FFFFFF',
}) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Simple construction icon using text */}
      <Text style={[styles.iconText, { fontSize: size * 0.6, color }]}>
        🏗️
      </Text>
    </View>
  );
};

// Spinning Activity Indicator
const ActivitySpinner: React.FC<{ color?: string; size?: number }> = ({
  color = '#53D22D',
  size = 20,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue]);

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

const SplashScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial fade in and scale animation
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

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 0.65,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, scaleAnim, progressAnim]);

  const backgroundColor = isDark ? '#0A0F08' : '#f8f7f5';
  const textColor = isDark ? '#FFFFFF' : '#1a1a1a';
  const secondaryTextColor = isDark ? '#88A381' : '#6b7280';
  const progressBgColor = isDark ? '#1A2318' : '#e5e7eb';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Background Gradient Overlay */}
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

      {/* Main Content */}
      <View style={styles.content}>
        {/* Top Spacer */}
        <View style={styles.topSpacer} />

        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#53D22D', '#46B426']}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Border overlay */}
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

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Loading Section */}
          <View style={styles.loadingContainer}>
            <View style={styles.loadingHeader}>
              <Text style={[styles.loadingText, { color: secondaryTextColor }]}>
                LOADING
              </Text>
              <ActivitySpinner color="#53D22D" size={16} />
            </View>

            {/* Progress Bar */}
            <View
              style={[
                styles.progressBarContainer,
                { backgroundColor: progressBgColor },
              ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  topSpacer: {
    height: height * 0.15,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
    shadowColor: '#53D22D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
  },
  appName: {
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  bottomSection: {
    paddingHorizontal: 48,
    paddingBottom: 64,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  loadingContainer: {
    width: '100%',
    marginBottom: 40,
  },
  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  loadingText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#53D22D',
    borderRadius: 3,
    shadowColor: '#53D22D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
});

export default SplashScreen;
