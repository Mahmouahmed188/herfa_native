import { useState, useEffect, useCallback } from 'react';
import { providersApi, ProviderProfile, SearchProvidersParams, ProviderSearchResult } from '../services';

interface UseProvidersResult {
  providers: ProviderProfile[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  searchProviders: (params: SearchProvidersParams) => Promise<ProviderSearchResult>;
}

export const useProviders = (): UseProvidersResult => {
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await providersApi.searchProviders({ limit: 20 });
      setProviders(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load providers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const searchProviders = useCallback(async (params: SearchProvidersParams): Promise<ProviderSearchResult> => {
    const response = await providersApi.searchProviders(params);
    return response;
  }, []);

  return {
    providers,
    isLoading,
    error,
    refresh: fetchProviders,
    searchProviders,
  };
};

export default useProviders;