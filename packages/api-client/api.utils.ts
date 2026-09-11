import type { NestErrorResponse } from './api.types';

export function isNestErrorResponse(data: unknown): data is NestErrorResponse {
  return typeof data === 'object' && data !== null && 'message' in data;
}
