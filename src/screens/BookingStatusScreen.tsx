import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';
import StatusBadge from '../components/StatusBadge';
import { Job, JobStatus } from '../services';

type BookingStatusRouteProp = RouteProp<RootStackParamList, 'BookingStatus'>;

const STATUS_ORDER: JobStatus[] = ['PENDING', 'ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];

const BookingStatusScreen: React.FC = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<BookingStatusRouteProp>();
  
  const { job } = route.params || {};
  
  const mockJob: Job = job || {
    id: '1',
    customerId: 'c1',
    serviceId: 's1',
    service: {
      id: 's1',
      name: 'Plumbing Service',
      nameAr: 'خدمة السباكة',
      icon: 'plumbing',
    },
    title: 'Leak Repair',
    description: 'Kitchen sink leak repair',
    address: '123 King Fahd Road, Riyadh',
    latitude: 24.7136,
    longitude: 46.6753,
    status: 'IN_PROGRESS',
    estimatedPrice: 120,
    scheduledDate: new Date().toISOString(),
    scheduledTime: '10:00 AM',
    notes: 'Kitchen sink is leaking',
    createdAt: new Date().toISOString(),
    customer: {
      id: 'c1',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      phone: '+966501234567',
      email: 'ahmed@example.com',
    },
    provider: {
      id: 'p1',
      businessName: 'Ahmed Technical Services',
      avatar: 'https://via.placeholder.com/100',
      rating: 4.8,
    },
  };

  const currentStatusIndex = STATUS_ORDER.indexOf(mockJob.status);
  const iconMarginStyle = isRTL ? { marginLeft: 10 } : { marginRight: 10 };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLanguage, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const handleCall = () => {
    if (mockJob.provider?.id) {
      Linking.openURL('tel:+966501234567');
    } else {
      Alert.alert(t('common.error'), t('bookingStatus.noProvider'));
    }
  };

  const handleMessage = () => {
    if (mockJob.provider?.id) {
      navigation.navigate('Main');
    } else {
      Alert.alert(t('common.error'), t('bookingStatus.noProvider'));
    }
  };

  const renderTimeline = () => {
    return (
      <View style={styles.timelineContainer}>
        {STATUS_ORDER.map((status, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isLast = index === STATUS_ORDER.length - 1;

          const statusLabels: Record<JobStatus, string> = {
            PENDING: t('bookingStatus.pending'),
            ASSIGNED: t('bookingStatus.assigned'),
            ACCEPTED: t('bookingStatus.accepted'),
            IN_PROGRESS: t('bookingStatus.inProgress'),
            COMPLETED: t('bookingStatus.completed'),
            CANCELLED: t('bookingStatus.cancelled'),
            REJECTED: t('bookingStatus.rejected'),
          };

          const statusIcons: Record<JobStatus, string> = {
            PENDING: 'hourglass-empty',
            ASSIGNED: 'person-search',
            ACCEPTED: 'check-circle-outline',
            IN_PROGRESS: 'engineering',
            COMPLETED: 'task-alt',
            CANCELLED: 'cancel',
            REJECTED: 'do-not-disturb',
          };

          return (
            <React.Fragment key={status}>
              <View style={[styles.timelineItem, isRTL && styles.timelineItemRTL]}>
                <View style={styles.timelineDotContainer}>
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: isCompleted || isCurrent ? theme.colors.primary : theme.colors.border,
                        borderColor: isCompleted || isCurrent ? theme.colors.primary : theme.colors.border,
                      },
                    ]}
                  >
                    {isCompleted ? (
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    ) : (
                      <MaterialIcons
                        name={statusIcons[status] as any}
                        size={14}
                        color={isCurrent ? '#FFFFFF' : theme.colors.textSecondary}
                      />
                    )}
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.timelineLine,
                        {
                          backgroundColor: isCompleted ? theme.colors.primary : theme.colors.border,
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={[styles.timelineContent, isRTL && styles.timelineContentRTL]}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      {
                        color: isCurrent ? theme.colors.text : theme.colors.textSecondary,
                        fontWeight: isCurrent ? '700' : '500',
                      },
                    ]}
                  >
                    {statusLabels[status]}
                  </Text>
                  {isCurrent && (
                    <Text style={[styles.timelineSubtitle, { color: theme.colors.textSecondary }]}>
                      {t('bookingStatus.currentStatus')}
                    </Text>
                  )}
                </View>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    );
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
            {t('bookingStatus.title')}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusHeader}>
          <StatusBadge status={mockJob.status} theme={theme} size="large" />
          <Text style={[styles.bookingId, { color: theme.colors.textSecondary }]}>
            {mockJob.id}
          </Text>
        </View>

        {mockJob.provider && (
          <View
            style={[
              styles.providerCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.borderLight,
              },
            ]}
          >
            <View style={[styles.providerHeader, isRTL && styles.providerHeaderRTL]}>
              <Image
                source={{ uri: mockJob.provider.avatar || 'https://via.placeholder.com/60' }}
                style={styles.providerAvatar}
              />
              <View style={[styles.providerInfo, isRTL && styles.providerInfoRTL]}>
                <Text style={[styles.providerName, { color: theme.colors.text }]}>
                  {mockJob.provider.businessName}
                </Text>
                <View style={[styles.ratingRow, isRTL && styles.ratingRowRTL]}>
                  <MaterialIcons name="star" size={16} color="#EAB308" style={iconMarginStyle} />
                  <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                    {mockJob.provider.rating?.toFixed(1) || '0.0'}
                  </Text>
                  <Text style={[styles.ratingLabel, { color: theme.colors.textSecondary }]}>
                    {t('bookingStatus.rating')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.providerActions, isRTL && styles.providerActionsRTL]}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: theme.colors.primary, flexDirection: isRTL ? 'row-reverse' : 'row' },
                ]}
                activeOpacity={0.8}
                onPress={handleCall}
              >
                <MaterialIcons name="phone" size={18} color="#fff" style={iconMarginStyle} />
                <Text style={styles.actionButtonText}>{t('bookingStatus.call')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.borderLight,
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                  },
                ]}
                activeOpacity={0.8}
                onPress={handleMessage}
              >
                <MaterialIcons name="chat" size={18} color={theme.colors.text} style={iconMarginStyle} />
                <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>
                  {t('bookingStatus.message')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={[
            styles.timelineCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('bookingStatus.tracking')}
          </Text>
          {renderTimeline()}
        </View>

        <View
          style={[
            styles.detailsCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('bookingStatus.details')}
          </Text>

          <View style={styles.detailRow}>
            <MaterialIcons name="build" size={20} color={theme.colors.primary} style={iconMarginStyle} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                {t('bookingStatus.service')}
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {mockJob.title || mockJob.service?.name}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color={theme.colors.primary} style={iconMarginStyle} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                {t('bookingStatus.dateTime')}
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {formatDate(mockJob.scheduledDate)}
                {mockJob.scheduledTime && ` • ${mockJob.scheduledTime}`}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color={theme.colors.primary} style={iconMarginStyle} />
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                {t('bookingStatus.location')}
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {mockJob.address}
              </Text>
            </View>
          </View>

          {mockJob.estimatedPrice && (
            <View style={styles.detailRow}>
              <MaterialIcons name="payments" size={20} color={theme.colors.primary} style={iconMarginStyle} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                  {t('bookingStatus.price')}
                </Text>
                <Text style={[styles.priceValue, { color: theme.colors.primary }]}>
                  {mockJob.estimatedPrice} SAR
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
    paddingBottom: 32,
  },
  statusHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bookingId: {
    fontSize: 14,
    marginTop: 8,
  },
  providerCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  providerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
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
  ratingLabel: {
    fontSize: 12,
    marginLeft: 4,
  },
  providerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  providerActionsRTL: {
    flexDirection: 'row-reverse',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  timelineCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  timelineContainer: {
    marginTop: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 44,
  },
  timelineItemRTL: {
    flexDirection: 'row-reverse',
  },
  timelineDotContainer: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 16,
  },
  timelineContentRTL: {
    marginLeft: 0,
    marginRight: 12,
    alignItems: 'flex-end',
  },
  timelineTitle: {
    fontSize: 14,
  },
  timelineSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  detailsCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default BookingStatusScreen;