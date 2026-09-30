import expoConfig from 'eslint-config-expo/flat.js';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/src/generated/**',
      '**/dist/**',
      '**/.expo/**',
      '**/.next/**',
      '**/android/**',
      '**/ios/**',
      '**/expo-env.d.ts',
      'eslint.config.mjs',
    ],
  },
  expoConfig,
  ...ts.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          noWarnOnMultipleProjects: true,
          project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          basePath: import.meta.dirname,
          zones: [
            {
              target: './apps/mobile/src/shared',
              from: './apps/mobile/src/features',
              message: 'Shared modules must not depend on features.',
            },
            {
              target: './apps/mobile/src/app',
              from: './apps/mobile/src/features',
              except: [
                './auth/index.ts',
                './home/index.ts',
                './profile/index.ts',
                './auth/model/configure-api-client.ts',
              ],
              message: 'App modules must import features through their public index.ts.',
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^@/features/(?!auth/model/configure-api-client$)[^/]+/.+',
              message: 'Import features through their public index.ts.',
            },
            {
              regex: '^@/shared/(ui|api|configs)/.+',
              message: 'Import shared modules through their public index.ts.',
            },
          ],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]);
