import { DiscoverDetails } from '@/features/discover';
import { useLocalSearchParams } from 'expo-router';

export default function DiscoverRoute() {
  const { key } = useLocalSearchParams<{ key: string }>();
  return <DiscoverDetails discoverKey={key} />;
}
