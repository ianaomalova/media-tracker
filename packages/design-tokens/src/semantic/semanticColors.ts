import { colors } from '../primitives/colors';

export const semanticColors = {
  primary: colors.white,
  secondary: '#323431',
  text: {
    primary: '#fcfeff',
    secondary: '#040106',
    ['little-muted']: '#a5a3a6',
    muted: '#707070',
  },
  bg: {
    base: '#020003',
    card: '#262626',
    elevated: '#000000',
  },
  border: '#171717',
  select: 'rgba(129, 65, 248, 0.14)',
  status: {
    success: '#8141F8',
    warning: '#F6A290',
    error: '#FF3F15',
  },
} as const;
