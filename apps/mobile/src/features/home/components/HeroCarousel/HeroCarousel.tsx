import type { DiscoverItemResponse } from '@app/api-client';
import { MEDIA_TYPE_CONFIG } from '@app/configs';
import { semanticColors } from '@app/design-tokens';
import { GlassView } from 'expo-glass-effect';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { routes } from '@/shared/configs/routes';
import { Button } from '@/shared/ui';

import { HERO_ACTION_CONFIG } from './hero-actions';
import HeroSlide from './HeroSlide';

interface Props {
  items: DiscoverItemResponse[];
}

export default function HeroCarousel({ items }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const primaryAction = activeItem ? HERO_ACTION_CONFIG[activeItem.type] : null;
  const activeColor = activeItem
    ? MEDIA_TYPE_CONFIG[activeItem.type].color
    : semanticColors.primary;
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
        {primaryAction && (
          <GlassView
            isInteractive
            glassEffectStyle="clear"
            tintColor={activeColor}
            style={styles.primaryActionGlass}
          >
            <Button
              icon={primaryAction.icon}
              foregroundColor="white"
              style={styles.primaryActionButton}
              onPress={() => {
                if (!activeItem) return;
                router.push(`${routes.DISCOVER}/${activeItem.key}`);
              }}
            >
              {primaryAction.label}
            </Button>
          </GlassView>
        )}
        <Button
          icon={Plus}
          variant="secondary"
          style={[styles.addButton]}
          onPress={() => {
            if (!activeItem) return;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  primaryActionGlass: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    overflow: 'hidden',
  },

  primaryActionButton: {
    backgroundColor: 'transparent',
  },

  addButton: {
    borderWidth: 1,
  },
});
