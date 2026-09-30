import { configureApiClient } from '@app/api-client';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from './auth-storage';
import { useAuthStore } from './auth-store';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error('EXPO_PUBLIC_API_URL is not configured');
}

configureApiClient({
  baseURL,
  getAccessToken,
  getRefreshToken,
  onTokensRefreshed: async ({ accessToken, refreshToken }) => {
    await saveAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
  },
  onSessionExpired: async () => {
    await useAuthStore.getState().signOut();
  },
});
