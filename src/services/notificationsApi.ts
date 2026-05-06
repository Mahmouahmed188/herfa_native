import apiService from './api';
import { AxiosResponse } from 'axios';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  titleAr?: string;
  message: string;
  messageAr?: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  isRead?: boolean;
}

export interface NotificationsResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UnreadCountResponse {
  count: number;
}

export const notificationsApi = {
  getNotifications: async (params?: NotificationQueryParams): Promise<NotificationsResponse> => {
    const response: AxiosResponse<NotificationsResponse> = await apiService.instance.get('/notifications', { params });
    return response.data;
  },

  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response: AxiosResponse<UnreadCountResponse> = await apiService.instance.get('/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (notificationIds: string[]): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await apiService.instance.post('/notifications/mark-read', { notificationIds });
    return response.data;
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiService.instance.delete(`/notifications/${id}`);
  },
};

export default notificationsApi;