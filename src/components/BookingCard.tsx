import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Job } from '../services';
import StatusBadge from './StatusBadge';

interface BookingCardProps {
  job: Job;
  theme: any;
  t: any;
  onPress?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  isRTL?: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({
  job,
  theme,
  t,
  onPress,
  onCancel,
  showCancelButton = false,
  isRTL = false,
}) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    return timeStr;
  };

  const getServiceIcon = (icon?: string) => {
    switch (icon) {
      case 'plumbing':
        return 'plumbing';
      case 'electrical':
        return 'bolt';
      case 'carpentry':
        return 'handyman';
      case 'painting':
        return 'format-paint';
      default:
        return 'build';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      ]}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <MaterialIcons
          name={getServiceIcon(job.service?.icon) as any}
          size={24}
          color={theme.colors.primary}
        />
      </View>

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <View style={[styles.header, isRTL && styles.headerRTL]}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
            ]}
            numberOfLines={1}
          >
            {job.title || job.service?.name || 'Service Request'}
          </Text>
          <StatusBadge status={job.status} theme={theme} size="small" />
        </View>

        <View style={[styles.details, isRTL && styles.detailsRTL]}>
          <View style={styles.detailRow}>
            <MaterialIcons name="calendar_today" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
              {formatDate(job.scheduledDate)}
              {job.scheduledTime && ` • ${formatTime(job.scheduledTime)}`}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location_on" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              {job.address}
            </Text>
          </View>
        </View>

        {job.provider && (
          <View style={[styles.providerRow, isRTL && styles.providerRowRTL]}>
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

        <View style={[styles.footer, isRTL && styles.footerRTL]}>
          {job.estimatedPrice && (
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              {job.estimatedPrice} SAR
            </Text>
          )}
          {showCancelButton && job.status === 'PENDING' && onCancel && (
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.colors.error }]}
              activeOpacity={0.7}
              onPress={(e) => {
                e.stopPropagation();
                onCancel();
              }}
            >
              <Text style={[styles.cancelButtonText, { color: theme.colors.error }]}>
                {t('common.cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  contentRTL: {
    marginLeft: 0,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  details: {
    gap: 4,
    marginBottom: 8,
  },
  detailsRTL: {
    alignItems: 'flex-end',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    flex: 1,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  providerRowRTL: {
    flexDirection: 'row-reverse',
  },
  providerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  providerName: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerRTL: {
    flexDirection: 'row-reverse',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BookingCard;