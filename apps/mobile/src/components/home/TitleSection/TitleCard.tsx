import MediaTypeBadge from '@/components/ui/MediaTypeBadge';
import type { TitleListItemResponse } from '@app/api-client';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  item: TitleListItemResponse;
}

export default function TitleCard({ item }: Props) {
  return (
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
