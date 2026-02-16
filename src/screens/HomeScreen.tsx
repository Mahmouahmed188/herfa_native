import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { useThemeStore } from '../store/themeStore';
import { useAppStore } from '../store/appStore';
import Button from '../components/Button';
import Card from '../components/Card';
import { apiService, Post } from '../services/apiService';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useThemeStore();
  const { user, setUser } = useAppStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      // Using JSONPlaceholder for demo
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const navigateToDetails = (post: Post) => {
    navigation.navigate('Details', { 
      id: post.id.toString(), 
      title: post.title 
    });
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      onPress={() => navigateToDetails(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.postCard}>
        <Text style={[styles.postTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
        <Text 
          style={[styles.postBody, { color: theme.colors.textSecondary }]} 
          numberOfLines={2}
        >
          {item.body}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.colors.text }]}>
          Welcome back! 👋
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {user ? user.name : 'Guest'}
        </Text>
      </View>

      <Card title="Quick Actions">
        <View style={styles.buttonContainer}>
          <Button
            title="View Details"
            variant="primary"
            onPress={() => navigation.navigate('Details', { id: 'demo-1', title: 'Demo Item' })}
            style={styles.button}
          />
          <Button
            title="Refresh Data"
            variant="outline"
            onPress={onRefresh}
            style={styles.button}
          />
        </View>
      </Card>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Posts
        </Text>
        <Button
          title="Refresh"
          variant="ghost"
          size="small"
          onPress={onRefresh}
        />
      </View>

      {posts.map((post) => (
        <View key={post.id}>
          {renderPostItem({ item: post })}
        </View>
      ))}

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
  greeting: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  postCard: {
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});

export default HomeScreen;
