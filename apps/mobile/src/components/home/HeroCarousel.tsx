import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import type { TitleListItemResponse } from '@app/api-client';
import { Image } from 'expo-image';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { LinearGradient } from 'expo-linear-gradient';
import MediaTypeBadge from '../ui/MediaTypeBadge';
import { useState } from 'react';
import { Play, Plus } from 'lucide-react-native';
import Button from '../ui/Button';

interface Props {
  items: TitleListItemResponse[];
}

export default function Carousel({ items }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HeroSlide item={item} width={width} />}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        bounces={false}
        overScrollMode="never"
        directionalLockEnabled
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <View style={styles.actions}>
          <Button
            icon={Play}
            onPress={() => {
              if (!activeItem) return;

              console.log('Open:', activeItem.id);
            }}
          >
            Watch Movie
          </Button>
          <Button
            icon={Plus}
            variant="secondary"
            onPress={() => {
              if (!activeItem) return;

              console.log('Add:', activeItem.id);
            }}
          />
        </View>
        <View style={styles.pagination}>
          {items.map((item, index) => (
            <View key={item.id} style={[styles.dot, index === activeIndex && styles.activeDot]} />
          ))}
        </View>
      </View>
    </View>
  );
}

function HeroSlide({ item, width }: { item: TitleListItemResponse; width: number }) {
  return (
    <View style={[styles.slide, { width }]}>
      <Image source={item.coverUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MediaTypeBadge type={item.type} />
            <Text style={styles.meta}>Thrillers · Dramas · Action</Text>
          </View>
          <Text style={styles.description}>When an overachieving college senior...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    height: 450,
  },

  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
    flexShrink: 1,
  },

  meta: {
    fontSize: fontSize.md,
    color: semanticColors.text.primary,
  },

  description: {
    fontSize: fontSize.sm,
    color: semanticColors.text.muted,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginRight: 20,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  activeDot: {
    backgroundColor: 'white',
    width: 18,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
