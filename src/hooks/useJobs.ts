import { useState, useEffect, useCallback } from 'react';
import { jobsApi, Job, JobStatus, CreateJobPayload, JobsResponse } from '../services';

interface UseJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createJob: (payload: CreateJobPayload) => Promise<Job>;
  cancelJob: (id: string, reason?: string) => Promise<void>;
}

export const useJobs = (status?: JobStatus): UseJobsResult => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: JobsResponse = await jobsApi.getMyJobs({ status, limit: 50 });
      setJobs(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = useCallback(async (payload: CreateJobPayload): Promise<Job> => {
    const job = await jobsApi.create(payload);
    setJobs(prev => [job, ...prev]);
    return job;
  }, []);

  const cancelJob = useCallback(async (id: string, reason?: string): Promise<void> => {
    await jobsApi.cancelJob(id, reason);
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'CANCELLED' as JobStatus } : j));
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refresh: fetchJobs,
    createJob,
    cancelJob,
  };
};

export default useJobs;