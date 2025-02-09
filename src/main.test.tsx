import { vi } from 'vitest';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

test('renders app without crashing', async () => {
  document.body.innerHTML = '<div id="root"></div>';

  await import('./main');

  expect(document.getElementById('root')).not.toBeNull();
});
