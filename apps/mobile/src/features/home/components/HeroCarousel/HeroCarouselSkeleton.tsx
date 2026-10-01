import { Skeleton } from '@/shared/ui';
import { semanticColors } from '@app/design-tokens';
import { StyleSheet, View } from 'react-native';

export default function HeroCarouselSkeleton() {
  return (
    <View style={styles.hero}>
      <View style={styles.content}>
        <Skeleton style={styles.title} />
        <View style={styles.metaRow}>
          <Skeleton style={styles.badge} />
          <Skeleton style={styles.meta} />
        </View>
        <Skeleton style={styles.description} />
        <Skeleton style={[styles.description, styles.shortDescription]} />
      </View>
    </View>
  );
}

const skeletonColor = semanticColors.skeleton;

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
});
