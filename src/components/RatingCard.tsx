import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface RatingCardProps {
  rating: number;
  count: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating, count, size = 'medium', showLabel = true }) => {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();

  const starSize = size === 'small' ? 14 : size === 'large' ? 22 : 18;
  const textSize = size === 'small' ? 12 : size === 'large' ? 18 : 14;

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <MaterialIcons name="star" size={starSize} color="#EAB308" />
      <Text
        style={[
          styles.ratingText,
          {
            color: theme.colors.text,
            fontSize: textSize,
            fontWeight: size === 'large' ? '700' : '600',
          },
        ]}
      >
        {rating.toFixed(1)}
      </Text>
      {showLabel && (
        <Text style={[styles.countText, { color: theme.colors.textSecondary, fontSize: textSize - 2 }]}>
          ({count})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  ratingText: {
    marginLeft: 4,
    marginRight: 4,
  },
  countText: {},
});

export default RatingCard;
