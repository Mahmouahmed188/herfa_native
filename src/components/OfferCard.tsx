import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ProviderOffer } from '../types/offers';
import ProviderBadge from './ProviderBadge';
import RatingCard from './RatingCard';
import PriceCard from './PriceCard';

interface OfferCardProps {
  offer: ProviderOffer;
  onPress: () => void;
  onAccept: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onPress, onAccept }) => {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderLight,
        },
        theme.shadows.card,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[styles.topSection, isRTL && styles.topSectionRTL]}>
        <Image source={{ uri: offer.providerAvatar }} style={styles.avatar} />
        <View style={[styles.providerInfo, isRTL && styles.providerInfoRTL]}>
          <View style={[styles.nameRow, isRTL && styles.nameRowRTL]}>
            <Text
              style={[styles.providerName, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              {offer.providerName}
            </Text>
            {offer.isVerified && <ProviderBadge type="verified" size="small" />}
          </View>
          <RatingCard rating={offer.rating} count={offer.reviewsCount} size="small" />
          <View style={[styles.jobRow, isRTL && styles.jobRowRTL]}>
            <MaterialIcons name="work-history" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.jobText, { color: theme.colors.textSecondary }]}>
              {offer.completedJobs} {t('offers.jobs')}
            </Text>
          </View>
        </View>
        <PriceCard price={offer.price} duration={offer.estimatedDuration} size="small" />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.borderLight }]} />

      <View style={[styles.bottomSection, isRTL && styles.bottomSectionRTL]}>
        <View style={[styles.metaRow, isRTL && styles.metaRowRTL]}>
          <View style={[styles.metaItem, isRTL && styles.metaItemRTL]}>
            <MaterialIcons name="timer" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
              {offer.responseTime}
            </Text>
          </View>
          <View style={[styles.metaItem, isRTL && styles.metaItemRTL]}>
            <MaterialIcons name="star" size={14} color="#EAB308" />
            <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
              {offer.experienceYears} {t('offers.yearsExp')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.acceptButton, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.8}
          onPress={(e) => {
            e.stopPropagation();
            onAccept();
          }}
        >
          <Text style={styles.acceptButtonText}>{t('offers.accept')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 14,
    overflow: 'hidden',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  topSectionRTL: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerInfoRTL: {
    marginLeft: 0,
    marginRight: 12,
    alignItems: 'flex-end',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  nameRowRTL: {
    flexDirection: 'row-reverse',
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  jobRowRTL: {
    flexDirection: 'row-reverse',
  },
  jobText: {
    fontSize: 12,
    marginLeft: 4,
  },
  divider: {
    height: 1,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bottomSectionRTL: {
    flexDirection: 'row-reverse',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaRowRTL: {
    flexDirection: 'row-reverse',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItemRTL: {
    flexDirection: 'row-reverse',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  acceptButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default OfferCard;
