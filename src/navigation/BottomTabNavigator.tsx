import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Tab Param List
export type BottomTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Custom Tab Bar Icon Component
interface TabIconProps {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  hasBadge?: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size, focused, hasBadge }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name as any} size={size} color={color} />
    {hasBadge && (
      <View style={styles.badge} />
    )}
  </View>
);

// Custom Tab Label Component
interface TabLabelProps {
  label: string;
  color: string;
  focused: boolean;
}

const TabLabel: React.FC<TabLabelProps> = ({ label, color, focused }) => (
  <Text style={[
    styles.tabLabel,
    { color },
    focused && styles.tabLabelFocused
  ]}>
    {label}
  </Text>
);

// Bottom Tab Navigator
const BottomTabNavigator: React.FC = () => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  const screenOptions = ({ route }: { route: { name: keyof BottomTabParamList } }) => {
    let iconName: string;
    let hasBadge = false;
    let labelKey: string;

    switch (route.name) {
      case 'Home':
        iconName = 'home';
        labelKey = 'tabs.home';
        break;
      case 'Bookings':
        iconName = 'calendar-month';
        labelKey = 'tabs.bookings';
        break;
      case 'Chat':
        iconName = 'chat-bubble';
        labelKey = 'tabs.chat';
        hasBadge = true;
        break;
      case 'Profile':
        iconName = 'person';
        labelKey = 'tabs.profile';
        break;
      default:
        iconName = 'home';
        labelKey = 'tabs.home';
    }

    return {
      tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
        return <TabIcon name={iconName} color={color} size={28} focused={focused} hasBadge={hasBadge} />;
      },
      tabBarLabel: ({ color, focused }: { color: string; focused: boolean }) => {
        return <TabLabel label={t(labelKey)} color={color} focused={focused} />;
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textSecondary,
      tabBarStyle: [
        styles.tabBar,
        {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      ],
      tabBarItemStyle: styles.tabBarItem,
      headerShown: false,
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  tabLabelFocused: {
    fontWeight: '700',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    height: 80,
    paddingTop: 8,
    paddingBottom: 16,
  },
  tabBarItem: {
    paddingTop: 4,
  },
});

export default BottomTabNavigator;
