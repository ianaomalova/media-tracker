import { MEDIA_TYPE_CONFIG } from '@app/configs';
import { semanticColors } from '@app/design-tokens';
import type { TMediaType } from '@app/types';
import { GlassView } from 'expo-glass-effect';
import { Film, Tv, Gamepad2, BookOpen, Sparkles, type LucideIcon } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

interface Props {
  type: TMediaType;
}

const MEDIA_TYPE_ICONS = {
  MOVIE: Film,
  TV_SHOW: Tv,
  GAME: Gamepad2,
  BOOK: BookOpen,
  ANIME: Sparkles,
} satisfies Record<TMediaType, LucideIcon>;

export default function MediaTypeBadge({ type }: Props) {
  const config = MEDIA_TYPE_CONFIG[type];
  const Icon = MEDIA_TYPE_ICONS[type];

  return (
    <GlassView style={styles.badge} glassEffectStyle="clear" tintColor={config.color}>
      <Icon size={14} strokeWidth={2.2} color="white" />
    </GlassView>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
