import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface PriceCardProps {
  price: number;
  currency?: string;
  duration?: string;
  size?: 'small' | 'large';
}

const PriceCard: React.FC<PriceCardProps> = ({ price, currency = 'EGP', duration, size = 'small' }) => {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();
  const isLarge = size === 'large';

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <View style={[styles.priceRow, isRTL && styles.priceRowRTL]}>
        <Text
          style={[
            styles.price,
            {
              color: theme.colors.primary,
              fontSize: isLarge ? 28 : 18,
              fontWeight: isLarge ? '800' : '700',
            },
          ]}
        >
          {price}
        </Text>
        <Text
          style={[
            styles.currency,
            {
              color: theme.colors.primary,
              fontSize: isLarge ? 16 : 12,
              fontWeight: isLarge ? '600' : '500',
            },
          ]}
        >
          {currency}
        </Text>
      </View>
      {duration && (
        <View style={[styles.durationRow, isRTL && styles.durationRowRTL]}>
          <MaterialIcons name="schedule" size={isLarge ? 16 : 12} color={theme.colors.textSecondary} />
          <Text style={[styles.duration, { color: theme.colors.textSecondary, fontSize: isLarge ? 14 : 11 }]}>
            {duration}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  containerRTL: {
    alignItems: 'flex-start',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceRowRTL: {
    flexDirection: 'row-reverse',
  },
  price: {},
  currency: {
    marginLeft: 2,
    marginTop: 1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  durationRowRTL: {
    flexDirection: 'row-reverse',
  },
  duration: {},
});

export default PriceCard;
