import axios, { type InternalAxiosRequestConfig } from 'axios';
import type { MobileAuthResponse } from '../generated/api';

type TokenProvider = () => string | null | Promise<string | null>;

interface ApiClientConfig {
  baseURL: string;
  getAccessToken: TokenProvider;
  getRefreshToken: TokenProvider;
  onTokensRefreshed: (tokens: MobileAuthResponse) => Promise<void>;
  onSessionExpired: () => Promise<void>;
  withCredentials?: boolean;
}

let accessTokenProvider: TokenProvider | undefined;
let refreshTokenProvider: TokenProvider | undefined;
let tokensRefreshedHandler: ApiClientConfig['onTokensRefreshed'] | undefined;
let sessionExpiredHandler: ApiClientConfig['onSessionExpired'] | undefined;

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  timeout: 10000,
});

export function configureApiClient({
  baseURL,
  getAccessToken,
  getRefreshToken,
  onTokensRefreshed,
  onSessionExpired,
  withCredentials = false,
}: ApiClientConfig) {
  axiosInstance.defaults.baseURL = baseURL;
  axiosInstance.defaults.withCredentials = withCredentials;
  accessTokenProvider = getAccessToken;
  refreshTokenProvider = getRefreshToken;
  tokensRefreshedHandler = onTokensRefreshed;
  sessionExpiredHandler = onSessionExpired;
}

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await accessTokenProvider?.();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

async function refreshTokens(): Promise<string | null> {
  const refreshToken = await refreshTokenProvider?.();
  if (!refreshToken) return null;

  const { data } = await axiosInstance.post<MobileAuthResponse>('/auth/refresh', {
    refreshToken,
  });

  await tokensRefreshedHandler?.(data);
  return data.accessToken;
}

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      throw error;
    }

    const original = error.config as
      (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;

    if (!original || original._retried) throw error;

    if (original.url?.startsWith('/auth/mobile/')) throw error;

    original._retried = true;

    refreshPromise ??= refreshTokens().finally(() => {
      refreshPromise = null;
    });

    const accessToken = await refreshPromise.catch(() => null);
    if (!accessToken) {
      await sessionExpiredHandler?.();
      throw error;
    }
    return axiosInstance.request(original);
  },
);
