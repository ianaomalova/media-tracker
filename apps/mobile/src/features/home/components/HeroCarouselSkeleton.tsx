import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function HeroCarouselSkeleton() {
  const opacity = useSharedValue(0.45);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.9, { duration: 800 }), -1, true);

    return () => cancelAnimation(opacity);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View>
      <Animated.View style={[styles.hero, animatedStyle]}>
        <View style={styles.content}>
          <View style={styles.title} />

          <View style={styles.metaRow}>
            <View style={styles.badge} />
            <View style={styles.meta} />
          </View>

          <View style={styles.description} />
          <View style={[styles.description, styles.shortDescription]} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.footer, animatedStyle]}>
        <View style={styles.actions}>
          <View style={styles.primaryButton} />
          <View style={styles.roundButton} />
        </View>

        <View style={styles.pagination}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </View>
  );
}

const skeletonColor = 'rgba(255, 255, 255, 0.14)';

const styles = StyleSheet.create({
  hero: {
    height: 450,
    backgroundColor: '#111827',
    justifyContent: 'flex-end',
    padding: 20,
  },

  content: {
    gap: 12,
  },

  title: {
    width: '65%',
    height: 34,
    borderRadius: 8,
    backgroundColor: skeletonColor,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  badge: {
    width: 65,
    height: 24,
    borderRadius: 12,
    backgroundColor: skeletonColor,
  },

  meta: {
    width: 150,
    height: 16,
    borderRadius: 6,
    backgroundColor: skeletonColor,
  },

  description: {
    width: '85%',
    height: 14,
    borderRadius: 6,
    backgroundColor: skeletonColor,
  },

  shortDescription: {
    width: '55%',
  },

  footer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  primaryButton: {
    width: 145,
    height: 48,
    borderRadius: 14,
    backgroundColor: skeletonColor,
  },

  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: skeletonColor,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 20,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: skeletonColor,
  },

  activeDot: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: skeletonColor,
  },
});
