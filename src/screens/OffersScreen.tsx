import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { MOCK_OFFERS } from '../data/mockOffers';
import { ProviderOffer, SortOption } from '../types/offers';
import OfferCard from '../components/OfferCard';
import SortSelector from '../components/SortSelector';
import OfferDetailsModal from '../components/OfferDetailsModal';
import EmptyOffersState from '../components/EmptyOffersState';

const SORT_OPTIONS = [
  { value: 'lowest_price' as SortOption, labelKey: 'offers.lowestPrice', icon: 'arrow-downward' },
  { value: 'highest_rating' as SortOption, labelKey: 'offers.highestRating', icon: 'star' },
  { value: 'fastest_arrival' as SortOption, labelKey: 'offers.fastestArrival', icon: 'timer' },
];

const LOADING_DELAY = 1500;

const OffersScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [sortBy, setSortBy] = useState<SortOption>('lowest_price');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<ProviderOffer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const sortedOffers = useMemo(() => {
    const offers = [...MOCK_OFFERS];
    switch (sortBy) {
      case 'lowest_price':
        return offers.sort((a, b) => a.price - b.price);
      case 'highest_rating':
        return offers.sort((a, b) => b.rating - a.rating);
      case 'fastest_arrival':
        return offers.sort((a, b) => a.responseTimeMinutes - b.responseTimeMinutes);
      default:
        return offers;
    }
  }, [sortBy]);

  const handleAcceptOffer = useCallback((offer: ProviderOffer) => {
    navigation.navigate('OfferAccepted', { offer });
  }, [navigation]);

  const handleViewProfile = useCallback((offer: ProviderOffer) => {
    navigation.navigate('ProviderProfile', { offer });
  }, [navigation]);

  const handleOpenDetails = useCallback((offer: ProviderOffer) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  }, []);

  const renderSortOptions = () => (
    <SortSelector
      options={SORT_OPTIONS.map(opt => ({ ...opt, label: t(opt.labelKey) }))}
      selected={sortBy}
      onSelect={setSortBy}
    />
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.skeletonCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderLight },
          ]}
        >
          <View style={[styles.skeletonTopSection, isRTL && styles.skeletonTopSectionRTL]}>
            <View style={[styles.skeletonAvatar, { backgroundColor: theme.colors.border }]} />
            <View style={styles.skeletonInfo}>
              <View style={[styles.skeletonLine, { backgroundColor: theme.colors.border, width: '60%' }]} />
              <View style={[styles.skeletonLine, { backgroundColor: theme.colors.border, width: '40%', marginTop: 8 }]} />
              <View style={[styles.skeletonLine, { backgroundColor: theme.colors.border, width: '30%', marginTop: 8 }]} />
            </View>
            <View style={[styles.skeletonPrice, { backgroundColor: theme.colors.border }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderError = () => (
    <View style={styles.centerContainer}>
      <View style={[styles.errorIcon, { backgroundColor: `${theme.colors.error}15` }]}>
        <MaterialIcons name="error-outline" size={64} color={theme.colors.error} />
      </View>
      <Text style={[styles.errorTitle, { color: theme.colors.text }]}>
        {t('offers.errorTitle')}
      </Text>
      <Text style={[styles.errorMessage, { color: theme.colors.textSecondary }]}>
        {t('offers.errorMessage')}
      </Text>
      <TouchableOpacity
        style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}
        onPress={() => {
          setHasError(false);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), LOADING_DELAY);
        }}
      >
        <Text style={styles.retryButtonText}>{t('common.tryAgain')}</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.borderLight, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={{ width: 40 }} />
          <View style={styles.headerTitles}>
            <Text style={[styles.headerTitle, { color: theme.colors.text, textAlign: isRTL ? 'right' : 'center' }]}>
              {t('offers.title')}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        {renderSkeleton()}
      </SafeAreaView>
    );
  }

  if (hasError) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.borderLight, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
            <MaterialIcons name={isRTL ? 'arrow_forward_ios' : 'arrow_back_ios_new'} size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={[styles.headerTitle, { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }]}>
              {t('offers.title')}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
        {renderError()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.borderLight, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <MaterialIcons name={isRTL ? 'arrow_forward_ios' : 'arrow_back_ios_new'} size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={[styles.headerTitle, { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }]}>
            {t('offers.title')}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' }]}>
            {t('offers.subtitle', { count: sortedOffers.length })}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={sortedOffers}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderSortOptions}
        ListEmptyComponent={<EmptyOffersState />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OfferCard
            offer={item}
            onPress={() => handleViewProfile(item)}
            onAccept={() => handleAcceptOffer(item)}
          />
        )}
      />

      <OfferDetailsModal
        visible={modalVisible}
        offer={selectedOffer}
        onClose={() => {
          setModalVisible(false);
          setSelectedOffer(null);
        }}
        onAccept={() => {
          setModalVisible(false);
          if (selectedOffer) {
            handleAcceptOffer(selectedOffer);
          }
        }}
      />
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
    fontSize: 13,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  skeletonContainer: {
    paddingTop: 16,
  },
  skeletonCard: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
  },
  skeletonTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonTopSectionRTL: {
    flexDirection: 'row-reverse',
  },
  skeletonAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  skeletonInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
  },
  skeletonPrice: {
    width: 60,
    height: 32,
    borderRadius: 8,
  },
});

export default OffersScreen;
