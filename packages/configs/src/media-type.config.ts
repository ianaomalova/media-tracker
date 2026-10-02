import type { TMediaType } from '@app/types';

type MediaTypeConfig = {
  label: string;
  color: string;
};

export const MEDIA_TYPE_CONFIG = {
  MOVIE: {
    label: 'Movie',
    color: '#1E4A86',
  },
  TV_SHOW: {
    label: 'Series',
    color: '#5A3C94',
  },
  GAME: {
    label: 'Game',
    color: '#1A684C',
  },
  BOOK: {
    label: 'Book',
    color: '#8A4C18',
  },
  ANIME: {
    label: 'Anime',
    color: '#8C3448',
  },
} satisfies Record<TMediaType, MediaTypeConfig>;
