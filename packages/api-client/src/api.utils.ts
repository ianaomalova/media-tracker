import { ApiError } from './http/api-error';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  return 'Something went wrong';
}
