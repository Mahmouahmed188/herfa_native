import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const COLORS = {
  primary: '#53D22D',
  backgroundWhite: '#FFFFFF',
  surfaceLight: '#F9FAFB',
  charcoal: '#333333',
  textSecondary: '#6B7280',
  borderLight: '#E5E7EB',
  red: '#EF4444',
};

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => logout(), style: 'destructive' },
      ]
    );
  };

  const menuItems = [
    { icon: 'person', title: 'Edit Profile', onPress: () => Alert.alert('Coming Soon') },
    { icon: 'notifications', title: 'Notifications', onPress: () => Alert.alert('Coming Soon') },
    { icon: 'payment', title: 'Payment Methods', onPress: () => Alert.alert('Coming Soon') },
    { icon: 'help', title: 'Help & Support', onPress: () => Alert.alert('Coming Soon') },
    { icon: 'settings', title: 'Settings', onPress: () => Alert.alert('Coming Soon') },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.avatar || 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, isDark && styles.textDark]}>{user?.name || 'Ahmed'}</Text>
        <Text style={styles.email}>{user?.email || 'ahmed@example.com'}</Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, isDark && styles.menuItemDark]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <MaterialIcons name={item.icon as any} size={24} color={COLORS.primary} />
            </View>
            <Text style={[styles.menuText, isDark && styles.textDark]}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
        <MaterialIcons name="logout" size={24} color={COLORS.red} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  containerDark: {
    backgroundColor: '#0A0F08',
  },
  textDark: {
    color: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: `${COLORS.primary}30`,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menuSection: {
    paddingHorizontal: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    gap: 12,
  },
  menuItemDark: {
    backgroundColor: '#1A2318',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.charcoal,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.red,
  },
});

export default ProfileScreen;
