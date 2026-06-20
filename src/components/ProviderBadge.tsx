import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

type BadgeType = 'verified' | 'top_rated' | 'fast_response';
type BadgeSize = 'small' | 'medium';

interface ProviderBadgeProps {
  type: BadgeType;
  size?: BadgeSize;
}

const badgeConfig: Record<BadgeType, { label: string; icon: string; color: string }> = {
  verified: { label: 'Verified', icon: 'verified', color: '#1D9BF0' },
  top_rated: { label: 'Top Rated', icon: 'stars', color: '#EAB308' },
  fast_response: { label: 'Fast Response', icon: 'bolt', color: '#22C55E' },
};

const ProviderBadge: React.FC<ProviderBadgeProps> = ({ type, size = 'small' }) => {
  const { theme } = useTheme();
  const config = badgeConfig[type];
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${config.color}15`,
          borderColor: `${config.color}30`,
          paddingHorizontal: isSmall ? 8 : 12,
          paddingVertical: isSmall ? 3 : 6,
        },
      ]}
    >
      <MaterialIcons
        name={config.icon as any}
        size={isSmall ? 12 : 16}
        color={config.color}
        style={isSmall ? { marginRight: 3 } : { marginRight: 5 }}
      />
      <Text
        style={[
          styles.label,
          {
            color: config.color,
            fontSize: isSmall ? 11 : 13,
            fontWeight: isSmall ? '500' : '600',
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {},
});

export default ProviderBadge;
