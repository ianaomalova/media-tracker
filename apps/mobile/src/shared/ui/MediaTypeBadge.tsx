import { MEDIA_TYPE_CONFIG } from '@app/configs';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import type { TMediaType } from '@app/types';
import { GlassView } from 'expo-glass-effect';
import { Film, Tv, Gamepad2, BookOpen, Sparkles, type LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text } from 'react-native';

interface Props {
  type: TMediaType;
  size?: 'short' | 'full';
}

const MEDIA_TYPE_ICONS = {
  MOVIE: Film,
  TV_SHOW: Tv,
  GAME: Gamepad2,
  BOOK: BookOpen,
  ANIME: Sparkles,
} satisfies Record<TMediaType, LucideIcon>;

export default function MediaTypeBadge({ type, size = 'short' }: Props) {
  const config = MEDIA_TYPE_CONFIG[type];
  const Icon = MEDIA_TYPE_ICONS[type];
  const isFull = size === 'full';

  return (
    <GlassView
      style={[styles.badge, isFull ? styles.badgeFull : styles.badgeShort]}
      glassEffectStyle="clear"
      tintColor={config.color}
    >
      <Icon size={14} strokeWidth={2.2} color={semanticColors.text.primary} />
      {isFull && <Text style={styles.label}>{config.label}</Text>}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  badgeShort: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  badgeFull: {
    height: 28,
    paddingLeft: 8,
    paddingRight: 10,
    gap: 6,
    borderRadius: 10,
  },

  label: {
    color: semanticColors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
  },
});
