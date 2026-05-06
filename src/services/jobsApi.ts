import apiService from './api';
import { AxiosResponse } from 'axios';

export type JobStatus = 
  | 'PENDING' 
  | 'ASSIGNED' 
  | 'ACCEPTED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED' 
  | 'REJECTED';

export interface Job {
  id: string;
  customerId: string;
  providerId?: string;
  serviceId: string;
  service?: {
    id: string;
    name: string;
    nameAr?: string;
    icon?: string;
  };
  title?: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  status: JobStatus;
  estimatedPrice?: number;
  finalPrice?: number;
  scheduledDate?: string;
  scheduledTime?: string;
  images?: string[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  customer?: {
    id: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
  };
  provider?: {
    id: string;
    businessName: string;
    avatar?: string;
    rating: number;
  };
}

export interface JobAssignment {
  id: string;
  jobId: string;
  providerId: string;
  quotedPrice?: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  provider?: {
    id: string;
    businessName: string;
    avatar?: string;
    rating: number;
  };
}

export interface CreateJobPayload {
  serviceId: string;
  title?: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  estimatedPrice?: number;
  scheduledDate?: string;
  scheduledTime?: string;
  images?: string[];
  notes?: string;
}

export interface UpdateJobPayload {
  title?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  estimatedPrice?: number;
  notes?: string;
}

export interface JobQueryParams {
  page?: number;
  limit?: number;
  status?: JobStatus;
  startDate?: string;
  endDate?: string;
}

export interface JobsResponse {
  data: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const jobsApi = {
  create: async (payload: CreateJobPayload): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.post('/jobs', payload);
    return response.data;
  },

  getMyJobs: async (params?: JobQueryParams): Promise<JobsResponse> => {
    const response: AxiosResponse<JobsResponse> = await apiService.instance.get('/jobs/my-jobs', { params });
    return response.data;
  },

  getAssignedJobs: async (params?: JobQueryParams): Promise<JobsResponse> => {
    const response: AxiosResponse<JobsResponse> = await apiService.instance.get('/jobs/assigned', { params });
    return response.data;
  },

  getAvailableJobs: async (latitude: number, longitude: number, radiusKm?: number): Promise<Job[]> => {
    const params = { latitude, longitude, radiusKm };
    const response: AxiosResponse<Job[]> = await apiService.instance.get('/jobs/available', { params });
    return response.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.get(`/jobs/${id}`);
    return response.data;
  },

  updateJob: async (id: string, payload: UpdateJobPayload): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.patch(`/jobs/${id}`, payload);
    return response.data;
  },

  cancelJob: async (id: string, reason?: string): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.post(`/jobs/${id}/cancel`, { reason });
    return response.data;
  },

  updateStatus: async (id: string, status: JobStatus): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.post(`/jobs/${id}/status`, { status });
    return response.data;
  },

  acceptAssignment: async (assignmentId: string, quotedPrice?: number): Promise<Job> => {
    const response: AxiosResponse<Job> = await apiService.instance.post('/jobs/assignments/accept', { assignmentId, quotedPrice });
    return response.data;
  },

  rejectAssignment: async (assignmentId: string, rejectionReason?: string): Promise<any> => {
    const response: AxiosResponse<any> = await apiService.instance.post(`/jobs/assignments/${assignmentId}/reject`, { rejectionReason });
    return response.data;
  },
};

export default jobsApi;