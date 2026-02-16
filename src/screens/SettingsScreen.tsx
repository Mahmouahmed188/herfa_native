import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { useAppStore } from '../store/appStore';
import Card from '../components/Card';
import Button from '../components/Button';

const SettingsScreen: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAppStore();

  const handleLogout = () => {
    logout();
    // Navigate to login screen or perform other logout actions
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Settings
        </Text>
      </View>

      <Card title="Appearance">
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {isDarkMode ? 'Currently enabled' : 'Currently disabled'}
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={isDarkMode ? theme.colors.surface : '#f4f3f4'}
          />
        </View>
      </Card>

      <Card title="Account" style={styles.cardSpacing}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Email
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {user?.email || 'Not signed in'}
            </Text>
          </View>
        </View>

        <View style={[styles.settingRow, styles.borderTop]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Notifications
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              Push notifications enabled
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
          />
        </View>
      </Card>

      <Card title="About" style={styles.cardSpacing}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Version
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              1.0.0 (Build 100)
            </Text>
          </View>
        </View>

        <View style={[styles.settingRow, styles.borderTop]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Terms of Service
            </Text>
          </View>
          <Text style={[styles.chevron, { color: theme.colors.textSecondary }]}>
            ›
          </Text>
        </View>

        <View style={[styles.settingRow, styles.borderTop]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Privacy Policy
            </Text>
          </View>
          <Text style={[styles.chevron, { color: theme.colors.textSecondary }]}>
            ›
          </Text>
        </View>
      </Card>

      {user && (
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            style={{ ...styles.logoutButton, borderColor: theme.colors.error }}
            textStyle={{ color: theme.colors.error }}
          />
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  cardSpacing: {
    marginTop: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '400',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
  logoutContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  logoutButton: {
    borderWidth: 2,
  },
  bottomPadding: {
    height: 40,
  },
});

export default SettingsScreen;
