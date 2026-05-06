import apiService from './api';
import { AxiosResponse } from 'axios';

export interface RegisterPayload {
  email: string;
  phone: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
}

export interface LoginPayload {
  identifier: string;
  password: string;
  fcmToken?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  };
}

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: string;
  avatar?: string;
  createdAt?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await apiService.instance.post('/auth/register', payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await apiService.instance.post('/auth/login', payload);
    return response.data;
  },

  logout: async (refreshToken?: string): Promise<void> => {
    await apiService.instance.post('/auth/logout', { refreshToken });
    await apiService.clearAuth();
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await apiService.instance.post('/auth/forgot-password', payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await apiService.instance.post('/auth/reset-password', payload);
    return response.data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await apiService.instance.post('/auth/change-password', payload);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response: AxiosResponse<User> = await apiService.instance.get('/auth/me');
    return response.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = await apiService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response: AxiosResponse<AuthResponse> = await apiService.instance.post('/auth/refresh', { refreshToken });
    return response.data;
  },
};

export default authApi;