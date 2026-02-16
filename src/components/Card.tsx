import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemeStore } from '../store/themeStore';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const { theme } = useThemeStore();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          shadowColor: theme.colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text,
                  fontSize: theme.typography.h3.fontSize,
                  fontWeight: theme.typography.h3.fontWeight as '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold',
                },
                titleStyle,
              ]}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.bodySmall.fontSize,
                },
                subtitleStyle,
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
});

export default Card;
