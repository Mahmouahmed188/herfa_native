import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  primary: '#53D22D',
  backgroundWhite: '#FFFFFF',
  surfaceLight: '#F9FAFB',
  charcoal: '#333333',
  textSecondary: '#6B7280',
  borderLight: '#E5E7EB',
};

const BookingsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.content}>
        <MaterialIcons 
          name="calendar-month" 
          size={64} 
          color={COLORS.primary} 
        />
        <Text style={[styles.title, isDark && styles.textDark]}>
          Your Bookings
        </Text>
        <Text style={styles.subtitle}>
          Manage all your service appointments here
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  containerDark: {
    backgroundColor: '#0A0F08',
  },
  textDark: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.charcoal,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default BookingsScreen;
