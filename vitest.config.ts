import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
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
        '**/*--*',
        '.next/**',
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
