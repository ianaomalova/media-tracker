import axios, { type AxiosRequestConfig } from 'axios';

import { ApiError } from './api-error';
import { axiosInstance } from './axios-instance';

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({
      ...config,
      ...options,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.response?.status ?? 0, error.message, error.response?.data);
    }

    throw error;
  }
}
