import axios, { type AxiosRequestConfig } from 'axios';

import { ApiError } from './api-error';
import { axiosInstance } from './axios-instance';

function extractMessage(data: unknown): string | undefined {
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const { message } = data;

    if (typeof message === 'string') {
      return message;
    }

    if (Array.isArray(message)) {
      const messages = message.filter((item): item is string => typeof item === 'string');

      return messages.length > 0 ? messages.join('\n') : undefined;
    }
  }

  return undefined;
}

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
      const message =
        extractMessage(error.response?.data) ??
        (error.response ? 'Something went wrong' : 'No internet connection');

      throw new ApiError(message, error.response?.status, error.response?.data);
    }

    throw error;
  }
}
