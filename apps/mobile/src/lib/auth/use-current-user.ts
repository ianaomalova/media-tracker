import { useUserFindMe } from '@app/api-client';
import { useAuthStore } from './auth-store';

export function useCurrentUser() {
  const status = useAuthStore((state) => state.status);

  return useUserFindMe({
    query: {
      enabled: status === 'authenticated',
      staleTime: 5 * 60_000,
    },
  });
}
