import type { TStatus } from '@app/types';

export const STATUS_LABELS = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
  DROPPED: 'Dropped',
} satisfies Record<TStatus, string>;
