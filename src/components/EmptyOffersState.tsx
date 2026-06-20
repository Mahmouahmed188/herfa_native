import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface EmptyOffersStateProps {
  title?: string;
  message?: string;
}

const EmptyOffersState: React.FC<EmptyOffersStateProps> = ({
  title,
  message,
}) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <MaterialIcons name="assignment" size={64} color={theme.colors.primary} />
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title || t('offers.emptyTitle')}
      </Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message || t('offers.emptyMessage')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default EmptyOffersState;
