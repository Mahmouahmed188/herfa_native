import apiService from './api';
import { AxiosResponse } from 'axios';

export interface ServiceCategory {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  services?: Service[];
}

export interface Service {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
  categoryId: string;
  category?: ServiceCategory;
  icon?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export const servicesApi = {
  getCategories: async (): Promise<ServiceCategory[]> => {
    const response: AxiosResponse<ServiceCategory[]> = await apiService.instance.get('/services/categories');
    return response.data;
  },

  getCategoryById: async (id: string): Promise<ServiceCategory> => {
    const response: AxiosResponse<ServiceCategory> = await apiService.instance.get(`/services/categories/${id}`);
    return response.data;
  },

  getServices: async (categoryId?: string): Promise<Service[]> => {
    const params = categoryId ? { categoryId } : {};
    const response: AxiosResponse<Service[]> = await apiService.instance.get('/services', { params });
    return response.data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const response: AxiosResponse<Service> = await apiService.instance.get(`/services/${id}`);
    return response.data;
  },

  getFeaturedServices: async (): Promise<Service[]> => {
    const response: AxiosResponse<Service[]> = await apiService.instance.get('/services/featured');
    return response.data;
  },
};

export default servicesApi;