import apiClient from './api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const apiService = {
  // Example endpoints
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get('/posts');
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await apiClient.post('/posts', post);
    return response.data;
  },

  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await apiClient.put(`/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
