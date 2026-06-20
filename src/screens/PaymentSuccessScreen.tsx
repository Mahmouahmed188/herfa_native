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

type PaymentSuccessRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;

const PaymentSuccessScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PaymentSuccessRouteProp>();
  const { amount, paymentMethod, bookingId } = route.params || {};
  
  const displayAmount = amount || 120;
  const displayMethod = paymentMethod || 'card';
  const displayBookingId = bookingId || 'BK-' + Date.now();

  const iconMarginStyle = isRTL ? { marginLeft: 10 } : { marginRight: 10 };

  const handleGoHome = () => {
    navigation.navigate('Main');
  };

  const handleViewBookings = () => {
    navigation.navigate('Main');
  };

  const getMethodLabel = (method: string): string => {
    switch (method) {
      case 'card':
        return t('payment.card');
      case 'cash':
        return t('payment.cash');
      case 'wallet':
        return t('payment.wallet');
      default:
        return method;
    }
  };

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
              { backgroundColor: `${theme.colors.primary}20` },
            ]}
          >
            <MaterialIcons name="check-circle" size={72} color={theme.colors.primary} />
          </View>
        </View>

        <Text
          style={[
            styles.title,
            { color: theme.colors.text, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('paymentSuccess.title')}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('paymentSuccess.message')}
        </Text>

        <View
          style={[
            styles.amountCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <View style={[styles.amountRow, isRTL && styles.amountRowRTL]}>
            <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.amountPaid')}
            </Text>
            <Text style={[styles.amountValue, { color: theme.colors.primary }]}>
              {displayAmount} EGP
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
          <View style={[styles.amountRow, isRTL && styles.amountRowRTL]}>
            <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.paymentMethod')}
            </Text>
            <View style={[styles.methodRow, isRTL && styles.methodRowRTL]}>
              <MaterialIcons
                name={displayMethod === 'card' ? 'credit-card' : displayMethod === 'cash' ? 'payments' : 'account-balance-wallet'}
                size={18}
                color={theme.colors.text}
              />
              <Text style={[styles.methodValue, { color: theme.colors.text }]}>
                {getMethodLabel(displayMethod)}
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
          <View style={[styles.amountRow, isRTL && styles.amountRowRTL]}>
            <Text style={[styles.amountLabel, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.bookingId')}
            </Text>
            <Text style={[styles.bookingIdValue, { color: theme.colors.text }]}>
              {displayBookingId}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.nextStepsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text
            style={[
              styles.nextStepsTitle,
              { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('paymentSuccess.whatsNext')}
          </Text>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: `${theme.colors.primary}15` }]}>
              <MaterialIcons name="notifications" size={16} color={theme.colors.primary} />
            </View>
            <Text style={[styles.stepText, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.step1')}
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: `${theme.colors.primary}15` }]}>
              <MaterialIcons name="schedule" size={16} color={theme.colors.primary} />
            </View>
            <Text style={[styles.stepText, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.step2')}
            </Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: `${theme.colors.primary}15` }]}>
              <MaterialIcons name="support-agent" size={16} color={theme.colors.primary} />
            </View>
            <Text style={[styles.stepText, { color: theme.colors.textSecondary }]}>
              {t('paymentSuccess.step3')}
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
          onPress={handleViewBookings}
        >
          <MaterialIcons name="calendar-month" size={20} color="#fff" style={iconMarginStyle} />
          <Text style={styles.primaryButtonText}>{t('paymentSuccess.viewBookings')}</Text>
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
          onPress={handleGoHome}
        >
          <MaterialIcons name="home" size={20} color={theme.colors.text} style={iconMarginStyle} />
          <Text style={[styles.secondaryButtonText, { color: theme.colors.text }]}>
            {t('paymentSuccess.goHome')}
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
    paddingTop: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  amountCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  amountRowRTL: {
    flexDirection: 'row-reverse',
  },
  amountLabel: {
    fontSize: 14,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  methodRowRTL: {
    flexDirection: 'row-reverse',
  },
  methodValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  bookingIdValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  nextStepsCard: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepText: {
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
});

export default PaymentSuccessScreen;