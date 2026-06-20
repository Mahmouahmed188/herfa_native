import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { SortOption } from '../types/offers';

interface SortOptionItem {
  value: SortOption;
  label: string;
  icon: string;
}

interface SortSelectorProps {
  options: SortOptionItem[];
  selected: SortOption;
  onSelect: (value: SortOption) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ options, selected, onSelect }) => {
  const { isRTL } = useLanguage();
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
                borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelect(option.value)}
          >
            <MaterialIcons
              name={option.icon as any}
              size={16}
              color={isSelected ? '#FFFFFF' : theme.colors.textSecondary}
              style={isRTL ? { marginLeft: 6 } : { marginRight: 6 }}
            />
            <Text
              style={[
                styles.pillText,
                {
                  color: isSelected ? '#FFFFFF' : theme.colors.textSecondary,
                  fontWeight: isSelected ? '600' : '400',
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pillText: {
    fontSize: 13,
  },
});

export default SortSelector;
