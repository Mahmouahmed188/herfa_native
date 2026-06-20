import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ProviderOffer } from '../types/offers';

interface OfferDetailsModalProps {
  visible: boolean;
  offer: ProviderOffer | null;
  onClose: () => void;
  onAccept: () => void;
}

const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({ visible, offer, onClose, onAccept }) => {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  if (!offer) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
            <MaterialIcons name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text
              style={[
                styles.headerTitle,
                { color: theme.colors.text, textAlign: isRTL ? 'right' : 'center' },
              ]}
            >
              {t('offers.offerDetails')}
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
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.priceBreakdown')}
            </Text>
            <View style={styles.breakdownRow}>
              <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.serviceFee')}
              </Text>
              <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                {offer.priceBreakdown.serviceFee} EGP
              </Text>
            </View>
            {offer.priceBreakdown.materialsFee && (
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>
                  {t('offers.materialsFee')}
                </Text>
                <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                  {offer.priceBreakdown.materialsFee} EGP
                </Text>
              </View>
            )}
            <View style={styles.breakdownRow}>
              <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.travelFee')}
              </Text>
              <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                {offer.priceBreakdown.travelFee} EGP
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>
                {t('offers.tax')}
              </Text>
              <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>
                {offer.priceBreakdown.tax} EGP
              </Text>
            </View>
            <View style={[styles.breakdownDivider, { backgroundColor: theme.colors.borderLight }]} />
            <View style={styles.breakdownRow}>
              <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
                {t('offers.total')}
              </Text>
              <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
                {offer.priceBreakdown.total} EGP
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.estimatedDuration')}
            </Text>
            <View style={[styles.durationRow, isRTL && styles.durationRowRTL]}>
              <MaterialIcons name="schedule" size={20} color={theme.colors.primary} />
              <Text style={[styles.durationText, { color: theme.colors.text }]}>
                {offer.estimatedDuration}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.providerMessage')}
            </Text>
            <View style={[styles.messageBubble, { backgroundColor: theme.colors.backgroundSecondary }]}>
              <Text
                style={[
                  styles.messageText,
                  { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
                ]}
              >
                {offer.message}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.serviceDetails')}
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
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('offers.terms')}
            </Text>
            <Text
              style={[
                styles.termsText,
                { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
              ]}
            >
              {offer.terms}
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
          <TouchableOpacity
            style={[
              styles.acceptButton,
              { backgroundColor: theme.colors.primary },
            ]}
            activeOpacity={0.9}
            onPress={onAccept}
          >
            <Text style={styles.acceptButtonText}>
              {t('offers.acceptOffer')} - {offer.price} EGP
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
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
  closeButton: {
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
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  breakdownLabel: {
    fontSize: 14,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  breakdownDivider: {
    height: 1,
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationRowRTL: {
    flexDirection: 'row-reverse',
  },
  durationText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  messageBubble: {
    borderRadius: 12,
    padding: 14,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
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
  termsText: {
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    borderTopWidth: 1,
    padding: 20,
  },
  acceptButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
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

export default OfferDetailsModal;
