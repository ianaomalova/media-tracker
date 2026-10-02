import { MediaTypeBadge } from '@/shared/ui';
import type { DiscoverItemResponse } from '@app/api-client';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { routes } from '../configs';

interface Props {
  item: DiscoverItemResponse;
}

export default function TitleCard({ item }: Props) {
  return (
    <Pressable onPress={() => router.push(`${routes.DISCOVER}/${item.key}`)}>
      <View style={styles.container}>
        <Image
          source={item.coverUrl}
          style={[StyleSheet.absoluteFill, styles.cover]}
          contentFit="cover"
        />
        <View style={styles.badge}>
          <MediaTypeBadge type={item.type} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
  },

  cover: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
