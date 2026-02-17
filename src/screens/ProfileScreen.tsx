import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useLanguage, SUPPORTED_LANGUAGES } from '../contexts/LanguageContext';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { t, currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const { theme, themeMode, setThemeMode, isDark } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      t('common.confirm') || 'Logout',
      t('profile.logoutConfirmation'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('auth.logout'), onPress: () => logout(), style: 'destructive' },
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      t('profile.selectLanguage'),
      '',
      supportedLanguages.map((lang) => ({
        text: lang.name,
        onPress: () => changeLanguage(lang.code),
      }))
    );
  };

  const handleThemeChange = () => {
    const options: { text: string; onPress: () => void }[] = [];
    
    if (themeMode !== 'light') {
      options.push({ text: t('profile.lightMode'), onPress: () => setThemeMode('light') });
    }
    if (themeMode !== 'dark') {
      options.push({ text: t('profile.darkMode'), onPress: () => setThemeMode('dark') });
    }
    if (themeMode !== 'system') {
      options.push({ text: t('profile.systemDefault'), onPress: () => setThemeMode('system') });
    }

    Alert.alert(
      t('profile.theme'),
      '',
      [...options, { text: t('common.cancel'), style: 'cancel' }]
    );
  };

  const menuItems = [
    { 
      icon: 'person', 
      title: t('profile.editProfile'), 
      onPress: () => Alert.alert(t('common.comingSoon')) 
    },
    { 
      icon: 'notifications', 
      title: t('profile.notifications'), 
      onPress: () => Alert.alert(t('common.comingSoon')) 
    },
    { 
      icon: 'payment', 
      title: t('profile.paymentMethods'), 
      onPress: () => Alert.alert(t('common.comingSoon')) 
    },
    { 
      icon: 'help', 
      title: t('profile.helpSupport'), 
      onPress: () => Alert.alert(t('common.comingSoon')) 
    },
    { 
      icon: 'settings', 
      title: t('profile.settings'), 
      onPress: () => Alert.alert(t('common.comingSoon')) 
    },
  ];

  const getCurrentLanguageName = () => {
    const lang = supportedLanguages.find(l => l.code === currentLanguage);
    return lang?.name || 'English';
  };

  const getCurrentThemeName = () => {
    switch (themeMode) {
      case 'light': return t('profile.lightMode');
      case 'dark': return t('profile.darkMode');
      case 'system': return t('profile.systemDefault');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{t('profile.title')}</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/80' }}
            style={styles.avatar}
          />
          <Text style={[styles.name, { color: theme.colors.text }]}>{user?.name || 'Ahmed'}</Text>
          <Text style={[styles.email, { color: theme.colors.textSecondary }]}>{user?.email || 'ahmed@example.com'}</Text>
        </View>

        {/* Language Setting */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t('profile.language')}</Text>
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
            onPress={handleLanguageChange}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
              <MaterialIcons name="language" size={24} color={theme.colors.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>{getCurrentLanguageName()}</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Theme Setting */}
        <View style={styles.settingSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t('profile.theme')}</Text>
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
            onPress={handleThemeChange}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
              <MaterialIcons 
                name={themeMode === 'dark' ? 'dark-mode' : themeMode === 'light' ? 'light-mode' : 'brightness-auto'} 
                size={24} 
                color={theme.colors.primary} 
              />
            </View>
            <Text style={[styles.settingText, { color: theme.colors.text }]}>{getCurrentThemeName()}</Text>
            <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                <MaterialIcons name={item.icon as any} size={24} color={theme.colors.primary} />
              </View>
              <Text style={[styles.menuText, { color: theme.colors.text }]}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: theme.colors.error }]} 
          onPress={handleLogout} 
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={24} color={theme.colors.error} />
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>{t('auth.logout')}</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
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
    borderColor: 'rgba(83,210,45,0.3)',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
  },
  settingSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    paddingHorizontal: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 32,
  },
});

export default ProfileScreen;
