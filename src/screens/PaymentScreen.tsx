import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import PaymentMethodSelector, { PaymentMethod } from '../components/PaymentMethodSelector';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { totalAmount, bookingId } = route.params || {};
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const amount = totalAmount || 120;
  const displayBookingId = bookingId || 'BK-' + Date.now();

  const iconMarginStyle = isRTL ? { marginLeft: 12 } : { marginRight: 12 };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      navigation.replace('PaymentSuccess', {
        amount,
        paymentMethod: selectedMethod,
        bookingId: displayBookingId,
      });
    } catch (error: any) {
      Alert.alert(
        t('payment.errorTitle'),
        error.message || t('payment.errorMessage'),
        [{ text: t('common.ok') }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getMethodLabel = (method: PaymentMethod): string => {
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
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.borderLight,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={isRTL ? 'arrow_forward_ios' : 'arrow_back_ios_new'}
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text
            style={[
              styles.headerTitle,
              { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('payment.title')}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('payment.subtitle')}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.summaryRow, isRTL && styles.summaryRowRTL]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              {t('payment.bookingId')}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {displayBookingId}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
          <View style={[styles.summaryRow, isRTL && styles.summaryRowRTL]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              {t('payment.service')}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {t('payment.plumbingService')}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
          <View style={[styles.summaryRow, isRTL && styles.summaryRowRTL]}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              {t('payment.date')}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('payment.selectMethod')}
          </Text>
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
            theme={theme}
            isRTL={isRTL}
            supportedMethods={['card', 'cash', 'wallet']}
          />
        </View>

        {selectedMethod === 'card' && (
          <View
            style={[
              styles.cardForm,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text
              style={[
                styles.formTitle,
                { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
              ]}
            >
              {t('payment.cardDetails')}
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                {t('payment.cardNumber')}
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: theme.colors.borderLight,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                  },
                ]}
              >
                <MaterialIcons name="credit-card" size={20} color={theme.colors.textSecondary} style={iconMarginStyle} />
                <Text style={[styles.inputPlaceholder, { color: theme.colors.textSecondary }]}>
                  1234 5678 9012 3456
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: isRTL ? 0 : 8 }]}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  {t('payment.expiry')}
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: theme.colors.borderLight },
                  ]}
                >
                  <Text style={[styles.inputPlaceholder, { color: theme.colors.textSecondary }]}>
                    MM/YY
                  </Text>
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: isRTL ? 0 : 8 }]}>
                <Text style={[styles.inputLabel, { color: theme.colors.textSecondary }]}>
                  {t('payment.cvv')}
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    { borderColor: theme.colors.borderLight },
                  ]}
                >
                  <Text style={[styles.inputPlaceholder, { color: theme.colors.textSecondary }]}>
                    ***
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: `${theme.colors.primary}10`,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <MaterialIcons name="lock" size={20} color={theme.colors.primary} />
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            {t('payment.securePayment')}
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.borderLight,
          },
        ]}
      >
        <View
          style={[
            styles.totalRow,
            { flexDirection: isRTL ? 'row-reverse' : 'row' },
          ]}
        >
          <Text style={[styles.totalLabel, { color: theme.colors.textSecondary }]}>
            {t('payment.total')}
          </Text>
          <Text style={[styles.totalValue, { color: theme.colors.text }]}>
            {amount} SAR
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.payButton,
            {
              backgroundColor: theme.colors.primary,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.9}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialIcons name="lock" size={18} color="#fff" style={iconMarginStyle} />
              <Text style={styles.payButtonText}>
                {t('payment.pay')} {amount} SAR
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitles: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 200,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryRowRTL: {
    flexDirection: 'row-reverse',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  cardForm: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputPlaceholder: {
    fontSize: 15,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 10,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 13,
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  payButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PaymentScreen;