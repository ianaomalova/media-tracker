class Pages {
  readonly HOME = '/home' as const;
  readonly LOGIN = '/login' as const;
  readonly REGISTER = '/register' as const;
}

export const pages = new Pages();
