import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.fetch = vi.fn();
