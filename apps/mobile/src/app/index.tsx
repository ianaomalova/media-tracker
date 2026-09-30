import { useAuthStore } from '@/features/auth';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  const status = useAuthStore((state) => state.status);

  if (status === 'loading') {
    return null;
  }

  return <Redirect href={status === 'authenticated' ? '/(tabs)/home' : '/(auth)/login'} />;
}
