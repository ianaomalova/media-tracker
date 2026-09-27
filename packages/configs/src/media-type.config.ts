import type { TMediaType } from '@app/types';

type MediaTypeConfig = {
  label: string;
  color: string;
};

export const MEDIA_TYPE_CONFIG = {
  MOVIE: {
    label: 'Movie',
    color: '#E5484D',
  },
  TV_SHOW: {
    label: 'Series',
    color: '#8E5CF6',
  },
  GAME: {
    label: 'Game',
    color: '#30A46C',
  },
  BOOK: {
    label: 'Book',
    color: '#D97706',
  },
  ANIME: {
    label: 'Anime',
    color: '#E546A3',
  },
} satisfies Record<TMediaType, MediaTypeConfig>;
