import {
  ApiError,
  authMobileLogout,
  userFindMe,
  type AuthUserResponse,
  type MobileAuthResponse,
  type UserResponse,
} from '@app/api-client';
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
  user: UserResponse | null;

  hydrate: () => Promise<void>;
  signIn: (response: MobileAuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
      user: null,
    });

    await get().updateUser();
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
      set({ status: 'unauthenticated', user: null });
    }
  },

  updateUser: async () => {
    try {
      const user = await userFindMe();
      set({ user });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        await get().signOut();
      }
    }
  },

  clearUser: () => {
    set({ user: null, status: 'unauthenticated' });
  },
}));
