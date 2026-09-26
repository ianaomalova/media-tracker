import { semanticColors } from '@app/design-tokens';
import type { TMediaType } from '@app/types';
import { Film, Tv, Gamepad2, BookOpen, Sparkles, type LucideIcon } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

const MEDIA_TYPE_ICONS = {
  MOVIE: Film,
  TV_SHOW: Tv,
  GAME: Gamepad2,
  BOOK: BookOpen,
  ANIME: Sparkles,
} satisfies Record<TMediaType, LucideIcon>;

interface Props {
  type: TMediaType;
}

export default function MediaTypeBadge({ type }: Props) {
  const Icon = MEDIA_TYPE_ICONS[type];
  return (
    <View style={styles.badge}>
      <Icon size={14} strokeWidth={2} color={semanticColors.text.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 26,
    height: 26,
    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
});
