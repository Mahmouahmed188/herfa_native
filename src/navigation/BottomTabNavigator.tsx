import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../store/themeStore';
import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Color constants
const COLORS = {
  primary: '#53D22D',
  backgroundWhite: '#FFFFFF',
  charcoal: '#333333',
  textSecondary: '#6B7280',
  borderLight: '#E5E7EB',
  red: '#EF4444',
};

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
  const { isDarkMode } = useThemeStore();

  const screenOptions = ({ route }: { route: { name: keyof BottomTabParamList } }) => ({
    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
      let iconName: string;
      let hasBadge = false;

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Bookings':
          iconName = 'calendar-month';
          break;
        case 'Chat':
          iconName = 'chat-bubble';
          hasBadge = true; // Show badge for unread messages
          break;
        case 'Profile':
          iconName = 'person';
          break;
        default:
          iconName = 'home';
      }

      return <TabIcon name={iconName} color={color} size={28} focused={focused} hasBadge={hasBadge} />;
    },
    tabBarLabel: ({ color, focused }: { color: string; focused: boolean }) => {
      let label: string;

      switch (route.name) {
        case 'Home':
          label = 'Home';
          break;
        case 'Bookings':
          label = 'Bookings';
          break;
        case 'Chat':
          label = 'Chat';
          break;
        case 'Profile':
          label = 'Profile';
          break;
        default:
          label = route.name;
      }

      return <TabLabel label={label} color={color} focused={focused} />;
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.textSecondary,
    tabBarStyle: [
      styles.tabBar,
      {
        backgroundColor: isDarkMode ? '#0A0F08' : COLORS.backgroundWhite,
        borderTopColor: isDarkMode ? '#1A2318' : COLORS.borderLight,
      },
    ],
    tabBarItemStyle: styles.tabBarItem,
    headerShown: false,
  });

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
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.backgroundWhite,
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
