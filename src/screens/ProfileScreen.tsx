import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { useAppStore } from '../store/appStore';
import Card from '../components/Card';
import Button from '../components/Button';

const ProfileScreen: React.FC = () => {
  const { theme } = useThemeStore();
  const { user, setUser } = useAppStore();

  const handleLoginAsDemo = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=11',
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatarPlaceholder,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || '?'}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {user?.name || 'Guest User'}
        </Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
          {user?.email || 'Sign in to access all features'}
        </Text>
      </View>

      <Card title="Statistics" style={styles.cardSpacing}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              24
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Posts
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              1.2k
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Followers
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              85
            </Text>
            <Text
              style={[styles.statLabel, { color: theme.colors.textSecondary }]}
            >
              Following
            </Text>
          </View>
        </View>
      </Card>

      <Card title="Bio" style={styles.cardSpacing}>
        <Text style={[styles.bioText, { color: theme.colors.text }]}>
          {user
            ? 'Passionate developer creating amazing mobile experiences. Love React Native and building products that make a difference.'
            : 'Sign in to add your bio and connect with other users.'}
        </Text>
      </Card>

      {!user && (
        <View style={styles.loginContainer}>
          <Button
            title="Login as Demo User"
            variant="primary"
            onPress={handleLoginAsDemo}
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
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
  },
  email: {
    fontSize: 16,
    marginTop: 4,
  },
  cardSpacing: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  loginContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  bottomPadding: {
    height: 40,
  },
});

export default ProfileScreen;
