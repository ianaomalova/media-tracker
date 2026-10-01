import type { TMediaType } from '@app/types';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import { MediaTypeBadge } from '@/shared/ui';

export interface HeroCoverItem {
  coverUrl: string | null;
  name: string;
  type: TMediaType;
  genres: string[];
  rating: number | null;
}

type HeroAnimatedStyle = StyleProp<AnimatedStyle<ViewStyle>>;

interface Props {
  item: HeroCoverItem;
  style?: StyleProp<ViewStyle>;
  imageStyle?: HeroAnimatedStyle;
  contentStyle?: HeroAnimatedStyle;
}

export default function HeroCover({ item, style, imageStyle, contentStyle }: Props) {
  return (
    <View style={[styles.slide, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, imageStyle]}>
        <Image source={item.coverUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Animated.View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Animated.View style={contentStyle}>
          <Text style={styles.title}>{item.name}</Text>
        </Animated.View>
        <View style={styles.detailsRow}>
          <View style={styles.metaRow}>
            <MediaTypeBadge type={item.type} />
            <Animated.View style={[styles.metaWrap, contentStyle]}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.meta}>
                {item.genres.join(' · ')}
              </Text>
            </Animated.View>
          </View>
          {item.rating !== null && (
            <Animated.View style={[styles.rating, contentStyle]}>
              <Star size={17} color="#FACC15" fill="#FACC15" />
              <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
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

  metaWrap: {
    flexShrink: 1,
  },

  meta: {
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
});
