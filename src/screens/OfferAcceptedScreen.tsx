import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ProviderOffer } from '../types/offers';
import ProviderBadge from '../components/ProviderBadge';
import PriceCard from '../components/PriceCard';

type OfferAcceptedRouteProp = RouteProp<RootStackParamList, 'OfferAccepted'>;

const OfferAcceptedScreen: React.FC = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OfferAcceptedRouteProp>();
  const { offer } = route.params;

  const iconMarginStyle = isRTL ? { marginLeft: 10 } : { marginRight: 10 };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString(currentLanguage, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleContinueToTracking = () => {
    navigation.navigate('BookingStatus', {});
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
              { backgroundColor: `${theme.colors.success}20` },
            ]}
          >
            <MaterialIcons name="check-circle" size={72} color={theme.colors.success} />
          </View>
        </View>

        <View style={styles.successBadge}>
          <View style={[styles.badgeLine, { backgroundColor: `${theme.colors.success}30` }]} />
          <View
            style={[
              styles.badgeDot,
              { backgroundColor: theme.colors.success },
            ]}
          >
            <MaterialIcons name="handshake" size={16} color="#FFFFFF" />
          </View>
          <View style={[styles.badgeLine, { backgroundColor: `${theme.colors.success}30` }]} />
        </View>

        <Text
          style={[
            styles.title,
            { color: theme.colors.text, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('offers.offerAccepted')}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'center' },
          ]}
        >
          {t('offers.offerAcceptedMessage', { name: offer.providerName })}
        </Text>

        <View
          style={[
            styles.providerCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.providerRow, isRTL && styles.providerRowRTL]}>
            <Image source={{ uri: offer.providerAvatar }} style={styles.providerAvatar} />
            <View style={[styles.providerInfo, isRTL && styles.providerInfoRTL]}>
              <View style={[styles.providerNameRow, isRTL && styles.providerNameRowRTL]}>
                <Text style={[styles.providerName, { color: theme.colors.text }]}>
                  {offer.providerName}
                </Text>
                {offer.isVerified && <ProviderBadge type="verified" size="small" />}
              </View>
              <View style={[styles.ratingRow, isRTL && styles.ratingRowRTL]}>
                <MaterialIcons name="star" size={14} color="#EAB308" style={iconMarginStyle} />
                <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                  {offer.rating.toFixed(1)}
                </Text>
                <Text style={[styles.ratingCount, { color: theme.colors.textSecondary }]}>
                  ({offer.reviewsCount} {t('offers.reviews')})
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />
          <View style={[styles.priceRow, isRTL && styles.priceRowRTL]}>
            <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
              {t('offers.agreedPrice')}
            </Text>
            <PriceCard price={offer.price} size="small" />
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
            {t('offers.nextSteps')}
          </Text>

          <View style={[styles.stepItem, isRTL && styles.stepItemRTL]}>
            <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary }]}>
              <MaterialIcons name="notifications-active" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.stepContent, isRTL && styles.stepContentRTL]}>
              <Text style={[styles.stepTitle, { color: theme.colors.text }]}>
                {t('offers.step1Title')}
              </Text>
              <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>
                {t('offers.step1Desc')}
              </Text>
            </View>
          </View>

          <View style={[styles.stepItem, isRTL && styles.stepItemRTL]}>
            <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary }]}>
              <MaterialIcons name="schedule" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.stepContent, isRTL && styles.stepContentRTL]}>
              <Text style={[styles.stepTitle, { color: theme.colors.text }]}>
                {t('offers.step2Title')}
              </Text>
              <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>
                {t('offers.step2Desc')}
              </Text>
            </View>
          </View>

          <View style={[styles.stepItem, isRTL && styles.stepItemRTL]}>
            <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary }]}>
              <MaterialIcons name="support-agent" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.stepContent, isRTL && styles.stepContentRTL]}>
              <Text style={[styles.stepTitle, { color: theme.colors.text }]}>
                {t('offers.step3Title')}
              </Text>
              <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>
                {t('offers.step3Desc')}
              </Text>
            </View>
          </View>

          <View style={[styles.stepItem, isRTL && styles.stepItemRTL]}>
            <View style={[styles.stepIcon, { backgroundColor: theme.colors.primary }]}>
              <MaterialIcons name="assignment" size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.stepContent, isRTL && styles.stepContentRTL]}>
              <Text style={[styles.stepTitle, { color: theme.colors.text }]}>
                {t('offers.step4Title')}
              </Text>
              <Text style={[styles.stepDesc, { color: theme.colors.textSecondary }]}>
                {t('offers.step4Desc')}
              </Text>
            </View>
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
          onPress={handleContinueToTracking}
        >
          <MaterialIcons name="navigation" size={20} color="#fff" style={iconMarginStyle} />
          <Text style={styles.primaryButtonText}>{t('offers.continueToTracking')}</Text>
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
    paddingTop: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badgeLine: {
    width: 40,
    height: 1,
  },
  badgeDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
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
    paddingHorizontal: 10,
  },
  providerCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerRowRTL: {
    flexDirection: 'row-reverse',
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  providerInfoRTL: {
    marginLeft: 0,
    marginRight: 14,
    alignItems: 'flex-end',
  },
  providerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  providerNameRowRTL: {
    flexDirection: 'row-reverse',
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingRowRTL: {
    flexDirection: 'row-reverse',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: 12,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRowRTL: {
    flexDirection: 'row-reverse',
  },
  priceLabel: {
    fontSize: 14,
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepItemRTL: {
    flexDirection: 'row-reverse',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
  },
  stepContentRTL: {
    marginLeft: 0,
    marginRight: 12,
    alignItems: 'flex-end',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    borderTopWidth: 1,
    padding: 20,
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
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OfferAcceptedScreen;
