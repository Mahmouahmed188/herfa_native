import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type PaymentMethod = 'card' | 'cash' | 'wallet';

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  icon: string;
  subtitle?: string;
}

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  theme: any;
  isRTL?: boolean;
  supportedMethods?: PaymentMethod[];
}

const DEFAULT_OPTIONS: PaymentMethodOption[] = [
  { id: 'card', label: 'Credit/Debit Card', icon: 'credit-card', subtitle: 'Visa, Mastercard, Mada' },
  { id: 'cash', label: 'Cash', icon: 'payments', subtitle: 'Pay when service is completed' },
  { id: 'wallet', label: 'Digital Wallet', icon: 'account-balance-wallet', subtitle: 'Herfa Wallet' },
];

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
  theme,
  isRTL = false,
  supportedMethods = ['card', 'cash', 'wallet'],
}) => {
  const options = DEFAULT_OPTIONS.filter((opt) => supportedMethods.includes(opt.id));

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedMethod === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionContainer,
              {
                backgroundColor: isSelected ? `${theme.colors.primary}10` : theme.colors.surface,
                borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onSelect(option.id)}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isSelected ? theme.colors.primary : theme.colors.background,
                },
              ]}
            >
              <MaterialIcons
                name={option.icon as any}
                size={22}
                color={isSelected ? '#FFFFFF' : theme.colors.textSecondary}
              />
            </View>
            <View style={[styles.textContainer, isRTL && styles.textContainerRTL]}>
              <Text
                style={[
                  styles.label,
                  { color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' },
                ]}
              >
                {option.label}
              </Text>
              {option.subtitle && (
                <Text
                  style={[
                    styles.subtitle,
                    { color: theme.colors.textSecondary, textAlign: isRTL ? 'right' : 'left' },
                  ]}
                >
                  {option.subtitle}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.radioOuter,
                {
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                },
              ]}
            >
              {isSelected && (
                <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  textContainerRTL: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default PaymentMethodSelector;