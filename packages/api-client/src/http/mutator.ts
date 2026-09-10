import type { AxiosRequestConfig } from 'axios';

import { axiosInstance } from './axios-instance';

export const apiRequest = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.request<T>({
    ...config,
    ...options,
  });

  return response.data;
};
