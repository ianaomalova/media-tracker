import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:4000/api/docs-json',
    },
    output: {
      target: './src/generated/api.ts',

      client: 'react-query',

      httpClient: 'axios',

      override: {
        mutator: {
          path: './src/http/mutator.ts',
          name: 'apiRequest',
        },
      },
    },
  },
});
