import type { AuthUserResponse, MobileAuthResponse } from '@app/api-client';
import { create } from 'zustand';

import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveAccessToken,
  saveRefreshToken,
} from './auth-storage';

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface AuthState {
  status: AuthStatus;
  user: AuthUserResponse | null;

  hydrate: () => Promise<void>;
  signIn: (response: MobileAuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  hydrate: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([getAccessToken(), getRefreshToken()]);
      if (accessToken && refreshToken) {
        set({ status: 'authenticated' });
        return;
      }
      await removeTokens();
      set({ status: 'unauthenticated', user: null });
    } catch {
      set({ status: 'unauthenticated', user: null });
    }
  },
  signIn: async (response) => {
    await saveAccessToken(response.accessToken);
    await saveRefreshToken(response.refreshToken);
    set({
      status: 'authenticated',
      user: response.user,
    });
  },
  signOut: async () => {
    try {
      await removeTokens();
    } finally {
      set({
        status: 'unauthenticated',
        user: null,
      });
    }
  },
}));
