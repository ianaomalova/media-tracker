import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import type { DiscoverItemResponse } from '@app/api-client';
import { Image } from 'expo-image';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Play, Plus, Star } from 'lucide-react-native';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { Button, MediaTypeBadge } from '@/shared/ui';

interface Props {
  items: DiscoverItemResponse[];
}

export default function HeroCarousel({ items }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <Animated.FlatList
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <HeroSlide item={item} width={width} index={index} scrollX={scrollX} />
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        directionalLockEnabled
      />
      <View style={styles.pagination}>
        {items.map((item, index) => (
          <View key={item.key} style={[styles.dot, index === activeIndex && styles.activeDot]} />
        ))}
      </View>
      <View style={styles.actions}>
        <Button
          icon={Play}
          onPress={() => {
            if (!activeItem) return;
          }}
        >
          Watch Movie
        </Button>
        <Button
          icon={Plus}
          variant="secondary"
          onPress={() => {
            if (!activeItem) return;
          }}
        />
      </View>
    </View>
  );
}

function HeroSlide({
  item,
  width,
  index,
  scrollX,
}: {
  item: DiscoverItemResponse;
  width: number;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          inputRange,
          [-width * 0.12, 0, width * 0.12],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(scrollX.value, inputRange, [1.08, 1, 1.08], Extrapolation.CLAMP),
      },
    ],
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(scrollX.value, inputRange, [24, 0, 24], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <View style={[styles.slide, { width }]}>
      <Animated.View style={[StyleSheet.absoluteFill, imageStyle]}>
        <Image source={item.coverUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Animated.View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Animated.Text style={[styles.title, contentStyle]}>{item.name}</Animated.Text>
        <View style={styles.detailsRow}>
          <View style={styles.metaRow}>
            <MediaTypeBadge type={item.type} />
            <Animated.Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.meta, contentStyle]}
            >
              {item.genres.join(' · ')}
            </Animated.Text>
          </View>
          {item.rating !== null && (
            <Animated.View style={[styles.rating, contentStyle]}>
              <Star size={17} color="#FACC15" fill="#FACC15" />
              <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
              <Text style={styles.ratingMax}>/ 10</Text>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    height: 450,
    overflow: 'hidden',
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
    flexShrink: 1,
    fontSize: fontSize.md,
    lineHeight: 22,
    color: semanticColors.text.primary,
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  metaRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  rating: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(250, 204, 21, 0.35)',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  ratingValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },

  ratingMax: {
    fontSize: fontSize.sm,
    color: semanticColors.text.muted,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginRight: 20,
    marginTop: 10,
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
    marginTop: 10,
  },
});
