import {
  StyleSheet,
  useWindowDimensions,
  View,
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

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

interface Props {
  items: TitleListItemResponse[];
}

export default function Carousel({ items }: Props) {
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
        keyExtractor={(item) => item.id}
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

function HeroSlide({
  item,
  width,
  index,
  scrollX,
}: {
  item: TitleListItemResponse;
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
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MediaTypeBadge type={item.type} />
            <Animated.Text style={[styles.meta, contentStyle]}>
              Thrillers · Dramas · Action
            </Animated.Text>
          </View>
          <Animated.Text style={[styles.description, contentStyle]}>
            When an overachieving college senior...
          </Animated.Text>
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
