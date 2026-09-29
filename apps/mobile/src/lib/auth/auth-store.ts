import { authMobileLogout, type MobileAuthResponse } from '@app/api-client';
import { create } from 'zustand';

import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveAccessToken,
  saveRefreshToken,
} from './auth-storage';
import { queryClient } from '../api/query-client';

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface AuthState {
  status: AuthStatus;

  hydrate: () => Promise<void>;
  signIn: (response: MobileAuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',

  hydrate: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([getAccessToken(), getRefreshToken()]);
      if (accessToken && refreshToken) {
        set({ status: 'authenticated' });
        return;
      }
      await removeTokens();
      set({ status: 'unauthenticated' });
    } catch {
      set({ status: 'unauthenticated' });
    }
  },

  signIn: async (response) => {
    await saveAccessToken(response.accessToken);
    await saveRefreshToken(response.refreshToken);
    set({
      status: 'authenticated',
    });
  },

  signOut: async () => {
    try {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        await authMobileLogout({ refreshToken }).catch(() => undefined);
      }
    } finally {
      await removeTokens();
      queryClient.clear();
      set({ status: 'unauthenticated' });
    }
  },
}));
