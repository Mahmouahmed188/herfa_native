import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Review } from '../types/offers';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { theme } = useTheme();
  const { isRTL, currentLanguage } = useLanguage();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(currentLanguage, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.borderLight,
        },
      ]}
    >
      <View style={[styles.header, isRTL && styles.headerRTL]}>
        <View style={[styles.userInfo, isRTL && styles.userInfoRTL]}>
          <Image
            source={{ uri: review.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=53D22D&color=fff&size=40` }}
            style={styles.avatar}
          />
          <View style={[styles.userText, isRTL && styles.userTextRTL]}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {review.userName}
            </Text>
            <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
              {formatDate(review.date)}
            </Text>
          </View>
        </View>
        <View style={[styles.ratingRow, isRTL && styles.ratingRowRTL]}>
          <MaterialIcons name="star" size={14} color="#EAB308" />
          <Text style={[styles.ratingText, { color: theme.colors.text }]}>
            {review.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.comment,
          { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
        ]}
      >
        {review.comment}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userInfoRTL: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userText: {
    marginLeft: 10,
    flex: 1,
  },
  userTextRTL: {
    marginLeft: 0,
    marginRight: 10,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingRowRTL: {
    flexDirection: 'row-reverse',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 3,
  },
  comment: {
    fontSize: 13,
    lineHeight: 20,
  },
});

export default ReviewCard;
