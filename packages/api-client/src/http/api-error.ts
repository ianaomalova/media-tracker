export class ApiError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T;

  constructor(status: number, message: string, data: T) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
