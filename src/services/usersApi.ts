import apiService from './api';
import { AxiosResponse } from 'axios';

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: string;
  avatar?: string;
  createdAt?: string;
  profile?: {
    address?: string;
    city?: string;
    country?: string;
    bio?: string;
    dateOfBirth?: string;
  };
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profile?: {
    address?: string;
    city?: string;
    country?: string;
    bio?: string;
    dateOfBirth?: string;
  };
}

export const usersApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response: AxiosResponse<UserProfile> = await apiService.instance.get('/users/me');
    return response.data;
  },

  updateProfile: async (payload: UpdateUserPayload): Promise<UserProfile> => {
    const response: AxiosResponse<UserProfile> = await apiService.instance.patch('/users/me', payload);
    return response.data;
  },

  getUserById: async (id: string): Promise<UserProfile> => {
    const response: AxiosResponse<UserProfile> = await apiService.instance.get(`/users/${id}`);
    return response.data;
  },
};

export default usersApi;