import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { JobStatus } from '../services';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'small' | 'medium' | 'large';
  theme: any;
}

const STATUS_COLORS: Record<JobStatus, string> = {
  PENDING: '#F59E0B',
  ASSIGNED: '#3B82F6',
  ACCEPTED: '#8B5CF6',
  IN_PROGRESS: '#10B981',
  COMPLETED: '#53D22D',
  CANCELLED: '#EF4444',
  REJECTED: '#EF4444',
};

const STATUS_LABELS: Record<JobStatus, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  ACCEPTED: 'Accepted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium', theme }) => {
  const color = STATUS_COLORS[status] || '#6B7280';
  const label = STATUS_LABELS[status] || status;

  const containerStyle: ViewStyle = {
    ...styles.container,
    paddingHorizontal: size === 'small' ? 8 : size === 'large' ? 14 : 10,
    paddingVertical: size === 'small' ? 4 : size === 'large' ? 6 : 4,
    backgroundColor: `${color}20`,
  };

  const textStyle = {
    fontSize: size === 'small' ? 10 : size === 'large' ? 14 : 12,
    fontWeight: '700' as const,
    color,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});

export default StatusBadge;