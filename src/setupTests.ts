import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.fetch = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    query: {},
  }),
}));
