import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ViewToken,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

interface OnboardingPage {
  id: string;
  image: string;
  badgeText: string;
  badgeIcon: string;
  title: string;
  highlightText: string;
  description: string;
}

const ONBOARDING_DATA: OnboardingPage[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    badgeText: 'Verified Experts',
    badgeIcon: '✓',
    title: 'Build Your Dreams with',
    highlightText: 'Precision',
    description: 'Connect with the finest local technicians and manage your projects from your palm.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    badgeText: 'Quality Assured',
    badgeIcon: '★',
    title: 'Find Skilled',
    highlightText: 'Professionals',
    description: 'Access a network of verified construction experts ready to bring your vision to life.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    badgeText: 'Easy Tracking',
    badgeIcon: '◈',
    title: 'Track Progress',
    highlightText: 'Realtime',
    description: 'Monitor your projects, communicate with teams, and stay updated every step of the way.',
  },
];

const ConstructionIcon: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <Text style={[styles.iconText, { fontSize: size * 0.5 }]}>🏗️</Text>
    </View>
  );
};

const PageIndicator: React.FC<{ total: number; current: number }> = ({
  total,
  current,
}) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === current && styles.indicatorActive,
          ]}
          accessibilityLabel={`Page ${index + 1} of ${total}`}
          accessibilityState={{ selected: index === current }}
        />
      ))}
    </View>
  );
};

const OnboardingPageItem: React.FC<{
  item: OnboardingPage;
  isDark: boolean;
}> = ({ item, isDark }) => {
  const textColor = isDark ? '#FFFFFF' : '#1a1a1a';
  const secondaryTextColor = isDark ? '#88A381' : '#6b7280';
  const borderColor = isDark ? '#1A2318' : '#e5e7eb';

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageWrapper}>
        <View
          style={[
            styles.imageContainer,
            { borderColor, backgroundColor: isDark ? '#1A2318' : '#f3f4f6' },
          ]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={item.title}
          />
          <LinearGradient
            colors={['rgba(83, 210, 45, 0.1)', 'transparent']}
            style={styles.imageGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
          />
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isDark
                  ? 'rgba(0, 0, 0, 0.8)'
                  : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 255, 0.2)',
              },
            ]}
          >
            <Text style={styles.badgeIcon}>{item.badgeIcon}</Text>
            <Text style={[styles.badgeText, { color: textColor }]}>
              {item.badgeText}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]}>
          {item.title}{' '}
          <Text style={styles.highlightText}>{item.highlightText}</Text>
        </Text>
        <Text style={[styles.description, { color: secondaryTextColor }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const OnboardingWelcomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const backgroundColor = isDark ? '#0A0F08' : '#f8f7f5';
  const textColor = isDark ? '#FFFFFF' : '#1a1a1a';
  const secondaryTextColor = isDark ? '#88A381' : '#6b7280';
  const buttonSecondaryBg = isDark ? 'rgba(26, 35, 24, 0.5)' : '#f3f4f6';

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentPage(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleGetStarted = useCallback(() => {
    if (currentPage < ONBOARDING_DATA.length - 1) {
      const nextPage = currentPage + 1;
      flatListRef.current?.scrollToIndex({
        index: nextPage,
        animated: true,
      });
    } else {
      navigation.navigate('Registration');
    }
  }, [currentPage, navigation]);

  const handleSkip = useCallback(() => {
    navigation.navigate('Registration');
  }, [navigation]);

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: OnboardingPage }) => (
      <OnboardingPageItem item={item} isDark={isDark} />
    ),
    [isDark]
  );

  const getButtonText = () => {
    if (currentPage === 0) return 'Get Started';
    if (currentPage === ONBOARDING_DATA.length - 1) return 'Create Account';
    return 'Continue';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View
        style={[
          styles.decorCircle,
          styles.decorCircleTop,
          { backgroundColor: 'rgba(83, 210, 45, 0.05)' },
        ]}
      />
      <View
        style={[
          styles.decorCircle,
          styles.decorCircleBottom,
          { backgroundColor: 'rgba(83, 210, 45, 0.1)' },
        ]}
      />

      <View style={styles.header}>
        <View style={styles.logoSection}>
          <LinearGradient
            colors={['#53D22D', '#46B426']}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ConstructionIcon size={24} />
          </LinearGradient>
          <Text style={[styles.logoText, { color: textColor }]}>Herfa</Text>
        </View>
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          accessibilityLabel="Skip onboarding"
          accessibilityHint="Skip to registration screen"
          accessibilityRole="button"
        >
          <Text style={[styles.skipText, { color: secondaryTextColor }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pagesContainer}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEnabled={true}
          accessibilityLabel="Onboarding carousel"
        />
      </View>

      <View style={styles.bottomSection}>
        <PageIndicator total={ONBOARDING_DATA.length} current={currentPage} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleGetStarted}
            style={styles.primaryButton}
            accessibilityLabel={getButtonText()}
            accessibilityRole="button"
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#53D22D', '#46B426']}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.primaryButtonText}>{getButtonText()}</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.secondaryButton,
              { backgroundColor: buttonSecondaryBg },
            ]}
            accessibilityLabel="Already have an account? Log in"
            accessibilityRole="button"
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryButtonText, { color: textColor }]}>
              Already have an account?{' '}
              <Text style={styles.loginHighlight}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorCircle: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    opacity: 0.5,
  },
  decorCircleTop: {
    top: -96,
    left: -96,
  },
  decorCircleBottom: {
    bottom: -96,
    right: -96,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoGradient: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pagesContainer: {
    flex: 1,
  },
  pageContainer: {
    width,
    flex: 1,
    paddingHorizontal: 24,
  },
  imageWrapper: {
    marginBottom: 32,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 12,
    color: '#53D22D',
    fontWeight: '700',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: '#53D22D',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  indicatorActive: {
    width: 24,
    backgroundColor: '#53D22D',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#53D22D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginHighlight: {
    color: '#53D22D',
    fontWeight: '700',
  },
});

export default OnboardingWelcomeScreen;
