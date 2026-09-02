export const STATUSES = ["want", "progress", "done"] as const;
export type TStatus = (typeof STATUSES)[number];
