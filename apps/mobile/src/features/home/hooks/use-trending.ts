import { useDiscoverGetTrending } from '@app/api-client';

export function useTrending(take = 10) {
  return useDiscoverGetTrending(
    { take },
    {
      query: {
        staleTime: 5 * 60_000,
        retry: 1,
      },
    },
  );
}
