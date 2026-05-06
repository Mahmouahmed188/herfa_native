import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { messagesApi, Conversation, SendMessagePayload } from '../services';

const ConversationItem: React.FC<{
  conversation: Conversation;
  theme: any;
  onPress: () => void;
}> = ({ conversation, theme, onPress }) => {
  const otherUser = conversation.otherUser;
  const lastMessage = conversation.lastMessage;

  return (
    <TouchableOpacity
      style={[styles.conversationItem, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: otherUser.avatar || 'https://via.placeholder.com/48' }}
        style={styles.avatar}
      />
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {otherUser.firstName || otherUser.lastName || 'User'}
          </Text>
          {lastMessage && (
            <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
              {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </View>
        {lastMessage && (
          <Text
            style={[styles.lastMessage, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {lastMessage.content}
          </Text>
        )}
      </View>
      {conversation.unreadCount > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const ChatScreen: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchConversations = useCallback(async () => {
    try {
      const data = await messagesApi.getConversations();
      setConversations(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConversations();
    setRefreshing(false);
  }, [fetchConversations]);

  const handleConversationPress = (conversation: Conversation) => {
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{t('chat.title')}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {conversations.length} {t('chat.conversations')}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <MaterialIcons name="chat-bubble" size={48} color={theme.colors.primary} />
        </View>
      ) : conversations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="chat-bubble-outline" size={64} color={theme.colors.primary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            {t('chat.noConversations')}
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
            {t('chat.noConversationsMessage')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.otherUser.id}
          contentContainerStyle={styles.conversationsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              theme={theme}
              onPress={() => handleConversationPress(item)}
            />
          )}
        />
      )}
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
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  conversationsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ChatScreen;