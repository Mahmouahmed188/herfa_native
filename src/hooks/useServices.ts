import { useState, useEffect, useCallback } from 'react';
import { servicesApi, ServiceCategory, Service } from '../services';

interface UseServicesResult {
  categories: ServiceCategory[];
  services: Service[];
  featuredServices: Service[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getServicesByCategory: (categoryId: string) => Service[];
}

export const useServices = (): UseServicesResult => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [categoriesData, servicesData, featuredData] = await Promise.all([
        servicesApi.getCategories(),
        servicesApi.getServices(),
        servicesApi.getFeaturedServices(),
      ]);
      setCategories(categoriesData);
      setServices(servicesData);
      setFeaturedServices(featuredData);
    } catch (err: any) {
      setError(err.message || 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getServicesByCategory = useCallback((categoryId: string): Service[] => {
    return services.filter(s => s.categoryId === categoryId);
  }, [services]);

  return {
    categories,
    services,
    featuredServices,
    isLoading,
    error,
    refresh: fetchData,
    getServicesByCategory,
  };
};

export default useServices;