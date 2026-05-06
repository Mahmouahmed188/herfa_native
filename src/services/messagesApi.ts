import apiService from './api';
import { AxiosResponse } from 'axios';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  relatedType?: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  sender?: {
    id: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  receiver?: {
    id: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export interface Conversation {
  oderId: string;
  lastMessage?: Message;
  unreadCount: number;
  otherUser: {
    id: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role: string;
  };
}

export interface SendMessagePayload {
  receiverId: string;
  content: string;
  relatedType?: string;
  relatedId?: string;
}

export interface MessagesResponse {
  data: Message[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const messagesApi = {
  sendMessage: async (payload: SendMessagePayload): Promise<Message> => {
    const response: AxiosResponse<Message> = await apiService.instance.post('/messages', payload);
    return response.data;
  },

  getConversations: async (): Promise<Conversation[]> => {
    const response: AxiosResponse<Conversation[]> = await apiService.instance.get('/messages');
    return response.data;
  },

  getConversation: async (otherUserId: string): Promise<MessagesResponse> => {
    const response: AxiosResponse<MessagesResponse> = await apiService.instance.get(`/messages/${otherUserId}`);
    return response.data;
  },

  markAsRead: async (messageId: string): Promise<Message> => {
    const response: AxiosResponse<Message> = await apiService.instance.patch(`/messages/${messageId}/read`);
    return response.data;
  },
};

export default messagesApi;