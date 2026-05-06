import apiService from './api';
import { AxiosResponse } from 'axios';

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  businessDescription?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  serviceRadiusKm?: number;
  isAvailable: boolean;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
  totalJobs: number;
  completedJobs: number;
  workingHours?: string;
  createdAt: string;
  services?: ProviderService[];
  user?: {
    id: string;
    email: string;
    phone: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface ProviderService {
  id: string;
  providerId: string;
  serviceId: string;
  service: {
    id: string;
    name: string;
    nameAr?: string;
    icon?: string;
  };
  price: number;
  priceUnit?: string;
}

export interface SearchProvidersParams {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  serviceId?: string;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
  rating?: number;
}

export interface ProviderSearchResult {
  data: ProviderProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const providersApi = {
  getProfile: async (): Promise<ProviderProfile> => {
    const response: AxiosResponse<ProviderProfile> = await apiService.instance.get('/providers/profile');
    return response.data;
  },

  updateProfile: async (payload: Partial<ProviderProfile>): Promise<ProviderProfile> => {
    const response: AxiosResponse<ProviderProfile> = await apiService.instance.patch('/providers/profile', payload);
    return response.data;
  },

  setAvailability: async (isAvailable: boolean): Promise<{ isAvailable: boolean }> => {
    const response: AxiosResponse<{ isAvailable: boolean }> = await apiService.instance.post('/providers/availability', { isAvailable });
    return response.data;
  },

  updateLocation: async (payload: { latitude: number; longitude: number; accuracy?: number }): Promise<ProviderProfile> => {
    const response: AxiosResponse<ProviderProfile> = await apiService.instance.post('/providers/location', payload);
    return response.data;
  },

  searchProviders: async (params: SearchProvidersParams): Promise<ProviderSearchResult> => {
    const response: AxiosResponse<ProviderSearchResult> = await apiService.instance.get('/providers/search', { params });
    return response.data;
  },

  getProviderById: async (id: string): Promise<ProviderProfile> => {
    const response: AxiosResponse<ProviderProfile> = await apiService.instance.get(`/providers/${id}`);
    return response.data;
  },

  getProviderStats: async (): Promise<any> => {
    const response: AxiosResponse<any> = await apiService.instance.get('/providers/stats');
    return response.data;
  },

  apply: async (payload: {
    businessName: string;
    businessDescription?: string;
    nationalId?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    serviceRadiusKm?: number;
    bio?: string;
  }): Promise<any> => {
    const response: AxiosResponse<any> = await apiService.instance.post('/providers/apply', payload);
    return response.data;
  },

  addService: async (payload: { serviceId: string; price: number; priceUnit?: string }): Promise<ProviderService> => {
    const response: AxiosResponse<ProviderService> = await apiService.instance.post('/providers/services', payload);
    return response.data;
  },

  removeService: async (serviceId: string): Promise<void> => {
    await apiService.instance.delete(`/providers/services/${serviceId}`);
  },
};

export default providersApi;