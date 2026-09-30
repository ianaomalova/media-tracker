import { useAuthStore } from '@/features/auth';
import { useUserFindMe } from '@app/api-client';

export function useCurrentUser() {
  const status = useAuthStore((state) => state.status);

  return useUserFindMe({
    query: {
      enabled: status === 'authenticated',
      staleTime: 5 * 60_000,
    },
  });
}
