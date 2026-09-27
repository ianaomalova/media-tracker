// export const MEDIA_TYPES = ['MOVIE', 'TV_SHOW', 'GAME', 'BOOK', 'ANIME'] as const;
// export type TMediaType = (typeof MEDIA_TYPES)[number];

import type { TitleListItemResponseType } from '@app/api-client';

export type TMediaType = TitleListItemResponseType;
