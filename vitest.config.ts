import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx', '**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.config.ts',
        '**/*.config.d.ts',
        '**/*.spec.tsx',
        '**/*.d.ts',
        'src/__tests__/setup.ts',
        'src/mocks',
        'src/App.tsx',
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
});
