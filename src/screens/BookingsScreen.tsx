import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useJobs } from '../hooks/useJobs';
import { Job, JobStatus } from '../services';
import type { RootStackParamList } from '../navigation/AppNavigator';

const STATUS_COLORS: Record<JobStatus, string> = {
  PENDING: '#F59E0B',
  ASSIGNED: '#3B82F6',
  ACCEPTED: '#8B5CF6',
  IN_PROGRESS: '#10B981',
  COMPLETED: '#53D22D',
  CANCELLED: '#EF4444',
  REJECTED: '#EF4444',
};

const STATUS_TITLES: Record<JobStatus, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  ACCEPTED: 'Accepted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
};

interface JobCardProps {
  job: Job;
  theme: any;
  t: any;
}

const JobCard: React.FC<JobCardProps> = ({ job, theme, t }) => {
  const statusColor = STATUS_COLORS[job.status] || '#6B7280';

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <View style={[styles.jobCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.jobHeader}>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {STATUS_TITLES[job.status]}
          </Text>
        </View>
        <Text style={[styles.jobDate, { color: theme.colors.textSecondary }]}>
          {formatDate(job.scheduledDate)}
        </Text>
      </View>

      <View style={styles.jobContent}>
        <View style={styles.jobIconContainer}>
          <MaterialIcons
            name={job.service?.icon ? 'build' : 'construction'}
            size={24}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.jobInfo}>
          <Text style={[styles.jobTitle, { color: theme.colors.text }]}>
            {job.title || job.service?.name || 'Service Request'}
          </Text>
          <Text style={[styles.jobAddress, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {job.address}
          </Text>
          {job.provider && (
            <View style={styles.providerInfo}>
              <Image
                source={{ uri: job.provider.avatar || 'https://via.placeholder.com/24' }}
                style={styles.providerAvatar}
              />
              <Text style={[styles.providerName, { color: theme.colors.text }]}>
                {job.provider.businessName}
              </Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={12} color="#EAB308" />
                <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                  {job.provider.rating?.toFixed(1) || '0.0'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.jobFooter}>
        {job.estimatedPrice && (
          <Text style={[styles.jobPrice, { color: theme.colors.primary }]}>
            {job.estimatedPrice} EGP
          </Text>
        )}
        <TouchableOpacity style={[styles.detailsButton, { backgroundColor: theme.colors.surfaceSecondary }]} activeOpacity={0.7}>
          <Text style={[styles.detailsButtonText, { color: theme.colors.text }]}>
            {t('common.details')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BookingsScreen: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { jobs, isLoading, refresh } = useJobs();
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleJobPress = (job: Job) => {
    navigation.navigate('BookingStatus', { job });
  };

  const filteredJobs = selectedStatus ? jobs.filter(j => j.status === selectedStatus) : jobs;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const statuses: (JobStatus | null)[] = [null, 'PENDING', 'IN_PROGRESS', 'COMPLETED'];

  const getStatusLabel = (status: JobStatus | null) => {
    if (!status) return t('bookings.all');
    return STATUS_TITLES[status];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{t('bookings.title')}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {t('bookings.subtitle')}
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={statuses}
          keyExtractor={(item) => item || 'all'}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor: selectedStatus === item ? theme.colors.primary : theme.colors.surface,
                  borderColor: selectedStatus === item ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => setSelectedStatus(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedStatus === item ? '#FFFFFF' : theme.colors.text },
                ]}
              >
                {getStatusLabel(item)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : filteredJobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="calendar-month" size={64} color={theme.colors.primary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            {t('bookings.noBookings')}
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            {t('bookings.noBookingsMessage')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.jobsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleJobPress(item)}>
              <JobCard job={item} theme={theme} t={t} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  filterContainer: {
    paddingVertical: 8,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  jobsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  jobCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  jobDate: {
    fontSize: 12,
  },
  jobContent: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  jobIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(83,210,45,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobInfo: {
    flex: 1,
    gap: 4,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  jobAddress: {
    fontSize: 14,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  providerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  providerName: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  jobPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BookingsScreen;