import type { DiscoverItemResponse } from '@app/api-client';
import { BookOpen, Gamepad2, Play, type LucideIcon } from 'lucide-react-native';

export interface HeroActionConfig {
  label: string;
  icon: LucideIcon;
}

export const HERO_ACTION_CONFIG = {
  MOVIE: {
    label: 'Watch Movie',
    icon: Play,
  },
  TV_SHOW: {
    label: 'Watch TV-Show',
    icon: Play,
  },
  ANIME: {
    label: 'Watch Anime',
    icon: Play,
  },
  GAME: {
    label: 'Play Game',
    icon: Gamepad2,
  },
  BOOK: {
    label: 'Read Book',
    icon: BookOpen,
  },
} satisfies Record<DiscoverItemResponse['type'], HeroActionConfig>;
