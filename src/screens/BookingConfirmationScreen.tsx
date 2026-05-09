import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type BookingConfirmationRouteProp = RouteProp<RootStackParamList, 'BookingConfirmation'>;

const BookingConfirmationScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BookingConfirmationRouteProp>();
  const { bookingId } = route.params || {};
  const bookingIdDisplay = bookingId || 'BK-' + Date.now();

  const handleGoToBookings = () => {
    navigation.navigate('Main');
  };

  const handleContinueBrowsing = () => {
    navigation.navigate('Main');
  };

  const handleProceedToPayment = () => {
    navigation.replace('Payment', {
      totalAmount: 120,
      bookingId: bookingIdDisplay,
    });
  };

  const iconMarginStyle = isRTL ? { marginLeft: 10 } : { marginRight: 10 };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.successCircle,
              { backgroundColor: `${theme.colors.success}20` },
            ]}
          >
            <MaterialIcons name="check-circle" size={64} color={theme.colors.success} />
          </View>
        </View>

        <Text
          style={[
            styles.title,
            { color: theme.colors.text, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('bookingConfirmation.title')}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('bookingConfirmation.message')}
        </Text>

        <View
          style={[
            styles.idCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.idLabel, { color: theme.colors.textSecondary }]}>
            {t('bookingConfirmation.bookingId')}
          </Text>
          <Text style={[styles.idValue, { color: theme.colors.text }]}>
            {bookingIdDisplay}
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: `${theme.colors.warning}15`,
              borderColor: theme.colors.warning,
            },
          ]}
        >
          <MaterialIcons name="schedule" size={24} color={theme.colors.warning} />
          <View style={styles.statusContent}>
            <Text style={[styles.statusTitle, { color: theme.colors.text }]}>
              {t('bookingConfirmation.pendingApproval')}
            </Text>
            <Text style={[styles.statusSubtitle, { color: theme.colors.textSecondary }]}>
              {t('bookingConfirmation.pendingMessage')}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.infoRow, isRTL && styles.infoRowRTL]}>
            <MaterialIcons name="info-outline" size={20} color={theme.colors.primary} style={iconMarginStyle} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              {t('bookingConfirmation.infoText')}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.primaryButton,
            {
              backgroundColor: theme.colors.primary,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.9}
          onPress={handleProceedToPayment}
        >
          <MaterialIcons name="payment" size={20} color="#fff" style={iconMarginStyle} />
          <Text style={styles.primaryButtonText}>{t('payment.payNow') || 'Pay Now'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              borderColor: theme.colors.borderLight,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.9}
          onPress={handleGoToBookings}
        >
          <MaterialIcons name="calendar-month" size={20} color={theme.colors.text} style={iconMarginStyle} />
          <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
            {t('bookingConfirmation.goToBookings')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tertiaryButton,
            {
              borderColor: theme.colors.borderLight,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.9}
          onPress={handleContinueBrowsing}
        >
          <MaterialIcons name="search" size={18} color={theme.colors.textSecondary} style={iconMarginStyle} />
          <Text style={[styles.tertiaryButtonText, { color: theme.colors.textSecondary }]}>
            {t('bookingConfirmation.continueBrowsing')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  idCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  idLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  idValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statusCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusContent: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 13,
  },
  infoCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowRTL: {
    flexDirection: 'row-reverse',
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryButton: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  tertiaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BookingConfirmationScreen;