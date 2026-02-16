import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          
          // Mock successful login - in real app, this would be an API response
          const mockUser: User = {
            id: '1',
            name: 'Ahmed',
            email: email,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRENLfqpwUCoC6fVYd5sRBYPyAk-NQWQ9a-HRfWVr0TyHtIAGfvPYZNDYhgAicMFzwFlxKLpmOA2pdZ8p5juD8p0OxXkcgr1HXDyieOl5ZtHVtZrl6Uj4RJ_1SIqcuufiV79piZVga9qpQMYvbDOBbuz3OKUCQ9OqgECyesoWDYY68sQaD4Jxo7DXmUWgsIpZia7GEcCtfNvSwtqB4zb7AMuksMCeVfEyOdjWq0Z8MP6JAfurXagOmokfWdzSUStmZQ23GLBK_aJc',
          };
          
          set({ user: mockUser, isAuthenticated: true });
        } catch (error) {
          throw new Error('Login failed');
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
