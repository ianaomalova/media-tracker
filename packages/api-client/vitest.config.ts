import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // Запросы перехватывает nock, поэтому системный прокси только ломает адреса.
    env: {
      HTTP_PROXY: '',
      HTTPS_PROXY: '',
      http_proxy: '',
      https_proxy: '',
      ALL_PROXY: '',
      all_proxy: '',
      NO_PROXY: '*',
      no_proxy: '*',
    },
  },
});
