import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { ProviderOffer } from '../types/offers';
import ProviderBadge from '../components/ProviderBadge';
import RatingCard from '../components/RatingCard';
import PriceCard from '../components/PriceCard';
import ReviewCard from '../components/ReviewCard';

const { width } = Dimensions.get('window');
const PORTFOLIO_IMAGE_SIZE = (width - 48) / 2;

type ProviderProfileRouteProp = RouteProp<RootStackParamList, 'ProviderProfile'>;

const ProviderProfileScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ProviderProfileRouteProp>();
  const { offer } = route.params;

  const handleCall = useCallback(() => {
    Linking.openURL(`tel:${offer.phone}`);
  }, [offer.phone]);

  const handleWhatsApp = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${offer.whatsapp.replace('+', '')}`);
  }, [offer.whatsapp]);

  const handleAccept = useCallback(() => {
    navigation.navigate('OfferAccepted', { offer });
  }, [navigation, offer]);

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
            {t('offers.providerProfile')}
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
            styles.profileHeaderCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Image source={{ uri: offer.providerAvatar }} style={styles.profilePhoto} />
          <Text style={[styles.profileName, { color: theme.colors.text }]}>
            {offer.providerName}
          </Text>
          <View style={[styles.ratingRow, isRTL && styles.ratingRowRTL]}>
            <RatingCard rating={offer.rating} count={offer.reviewsCount} size="medium" />
          </View>
          <View style={styles.badgesRow}>
            {offer.isVerified && <ProviderBadge type="verified" size="medium" />}
            {offer.responseTimeMinutes <= 10 && <ProviderBadge type="fast_response" size="medium" />}
          </View>

          <View style={[styles.statsRow, isRTL && styles.statsRowRTL]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {offer.completedJobs}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.jobsCompleted')}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {offer.experienceYears}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.yearsExperience')}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {offer.reviewsCount}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.reviews')}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('offers.serviceCategories')}
          </Text>
          <View style={styles.categoriesContainer}>
            {offer.categories.map((cat) => (
              <View
                key={cat}
                style={[styles.categoryTag, { backgroundColor: `${theme.colors.primary}15` }]}
              >
                <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
                  {cat}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('offers.about')}
          </Text>
          <Text
            style={[
              styles.aboutText,
              { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {offer.about}
          </Text>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('offers.portfolio')}
          </Text>
          <View style={styles.portfolioGrid}>
            {offer.portfolio.map((image, index) => (
              <Image
                key={`${offer.id}_portfolio_${index}`}
                source={{ uri: image }}
                style={[
                  styles.portfolioImage,
                  {
                    borderColor: theme.colors.borderLight,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.reviewsHeader, isRTL && styles.reviewsHeaderRTL]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.reviews')}
            </Text>
            <Text style={[styles.reviewsCount, { color: theme.colors.textSecondary }]}>
              {offer.reviews.length} {t('offers.reviews')}
            </Text>
          </View>
          {offer.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
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
        <View style={styles.footerPriceRow}>
          <PriceCard price={offer.price} duration={offer.estimatedDuration} size="large" />
        </View>
        <View style={[styles.footerActions, isRTL && styles.footerActionsRTL]}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: `${theme.colors.primary}15`, borderColor: theme.colors.primary },
            ]}
            activeOpacity={0.7}
            onPress={handleCall}
          >
            <MaterialIcons name="phone" size={22} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: '#25D36620', borderColor: '#25D366' },
            ]}
            activeOpacity={0.7}
            onPress={handleWhatsApp}
          >
            <MaterialIcons name="chat" size={22} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.9}
            onPress={handleAccept}
          >
            <MaterialIcons name="check-circle" size={20} color="#FFFFFF" style={isRTL ? { marginLeft: 8 } : { marginRight: 8 }} />
            <Text style={styles.acceptButtonText}>{t('offers.acceptOffer')}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  profileHeaderCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 14,
  },
  profilePhoto: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingRowRTL: {
    flexDirection: 'row-reverse',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  statsRowRTL: {
    flexDirection: 'row-reverse',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  portfolioImage: {
    width: PORTFOLIO_IMAGE_SIZE,
    height: PORTFOLIO_IMAGE_SIZE,
    borderRadius: 12,
    borderWidth: 1,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewsHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  reviewsCount: {
    fontSize: 13,
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
    gap: 12,
  },
  footerPriceRow: {
    alignItems: 'center',
  },
  footerActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  footerActionsRTL: {
    flexDirection: 'row-reverse',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProviderProfileScreen;
