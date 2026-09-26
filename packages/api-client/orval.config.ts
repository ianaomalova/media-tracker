import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:4000/api/docs-json',
    },
    output: {
      mode: 'tags-split',

      target: './src/generated/endpoints.ts',

      schemas: './src/generated/model',

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
