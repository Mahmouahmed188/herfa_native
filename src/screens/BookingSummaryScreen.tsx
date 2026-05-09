import React from 'react';
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
import { useJobs } from '../hooks/useJobs';
import { CreateJobPayload } from '../services';

type BookingSummaryRouteProp = RouteProp<RootStackParamList, 'BookingSummary'>;

interface BookingData {
  category: string;
  serviceType: string;
  name: string;
  contact: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: Date;
  time: Date;
  notes: string;
  estimatedPrice?: string;
}

const BookingSummaryScreen: React.FC = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BookingSummaryRouteProp>();
  const { bookingData } = route.params || {};
  const { createJob } = useJobs();
  const [isLoading, setIsLoading] = React.useState(false);

  const data: BookingData = bookingData || {
    category: 'Plumbing',
    serviceType: 'Leak Repair',
    name: 'Ahmed Hassan',
    contact: '+966 50 123 4567',
    location: '123 King Fahd Road, Riyadh',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    date: new Date(),
    time: new Date(),
    notes: 'Kitchen sink is leaking',
    estimatedPrice: '80 - 120',
  };

  const formattedDate = data.date instanceof Date 
    ? data.date.toLocaleDateString(currentLanguage, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date(data.date).toLocaleDateString(currentLanguage, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  const formattedTime = data.time instanceof Date
    ? data.time.toLocaleTimeString(currentLanguage, {
        hour: 'numeric',
        minute: '2-digit',
      })
    : new Date(data.time).toLocaleTimeString(currentLanguage, {
        hour: 'numeric',
        minute: '2-digit',
      });

  const handleEdit = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const jobPayload: CreateJobPayload = {
        serviceId: data.category.toLowerCase(),
        title: `${data.category} - ${data.serviceType}`,
        description: data.notes,
        address: data.location,
        latitude: data.coordinates.lat,
        longitude: data.coordinates.lng,
        scheduledDate: data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString(),
        scheduledTime: formattedTime,
        notes: data.notes,
      };

      const job = await createJob(jobPayload);
      navigation.replace('BookingConfirmation', { bookingId: job.id });
    } catch (error: any) {
      Alert.alert(
        t("common.error"),
        error.response?.data?.message || t("bookingRequest.submitError"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const iconMarginStyle = isRTL ? { marginLeft: 12 } : { marginRight: 12 };

  const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
    <View style={[styles.infoRow, isRTL && styles.infoRowRTL]}>
      <MaterialIcons name={icon as any} size={20} color={theme.colors.primary} style={iconMarginStyle} />
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: theme.colors.text }]}>{value}</Text>
      </View>
    </View>
  );

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
            {t('bookingSummary.title')}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
            ]}
          >
            {t('bookingSummary.subtitle')}
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
          <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
            <MaterialIcons name="build-circle" size={24} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('bookingSummary.serviceDetails')}
            </Text>
          </View>
          <InfoRow icon="category" label={t('bookingSummary.category')} value={data.category} />
          <InfoRow icon="handyman" label={t('bookingSummary.serviceType')} value={data.serviceType} />
        </View>

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
            <MaterialIcons name="person-circle" size={24} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('bookingSummary.contactInfo')}
            </Text>
          </View>
          <InfoRow icon="badge" label={t('bookingSummary.name')} value={data.name} />
          <InfoRow icon="phone" label={t('bookingSummary.contact')} value={data.contact} />
        </View>

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
            <MaterialIcons name="location-on" size={24} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('bookingSummary.location')}
            </Text>
          </View>
          <InfoRow icon="place" label={t('bookingSummary.address')} value={data.location} />
        </View>

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
            <MaterialIcons name="schedule" size={24} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {t('bookingSummary.dateTime')}
            </Text>
          </View>
          <InfoRow icon="event" label={t('bookingSummary.date')} value={formattedDate} />
          <InfoRow icon="access-time" label={t('bookingSummary.time')} value={formattedTime} />
        </View>

        {data.notes && (
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
              <MaterialIcons name="note" size={24} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {t('bookingSummary.notes')}
              </Text>
            </View>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>
              {data.notes}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.editButton,
            {
              borderColor: theme.colors.borderLight,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.7}
          onPress={handleEdit}
        >
          <MaterialIcons name="edit" size={18} color={theme.colors.textSecondary} style={iconMarginStyle} />
          <Text style={[styles.editButtonText, { color: theme.colors.textSecondary }]}>
            {t('bookingSummary.editRequest')}
          </Text>
        </TouchableOpacity>
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
            styles.priceRow,
            { flexDirection: isRTL ? 'row-reverse' : 'row' },
          ]}
        >
          <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
            {t('bookingSummary.estimatedTotal')}
          </Text>
          <Text style={[styles.priceValue, { color: theme.colors.primary }]}>
            {data.estimatedPrice || '80 - 120'} SAR
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: theme.colors.primary,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}
          activeOpacity={0.9}
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.confirmButtonText}>{t('bookingSummary.confirmBooking')}</Text>
              <MaterialIcons
                name={isRTL ? 'arrow_back' : 'arrow_forward'}
                size={20}
                color="#fff"
                style={iconMarginStyle}
              />
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
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoRowRTL: {
    flexDirection: 'row-reverse',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  confirmButton: {
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
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default BookingSummaryScreen;