import Screen from '@/components/Screen';
import { Text } from 'react-native';
import { MEDIA_TYPES } from '@app/types';

export default function WatchlistScreen() {
  return (
    <Screen edges={['top']}>
      <Text>Watchlist</Text>
    </Screen>
  );
}
