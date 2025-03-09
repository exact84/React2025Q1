import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../Search/Search';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => {
  return {
    usePathname: vi.fn(() => '/search'),
    useSearchParams: vi.fn(() => new URLSearchParams('search=test')),
    useRouter: vi.fn(() => ({ push: vi.fn() })),
  };
});

describe('Search component', () => {
  let pushMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    pushMock = vi.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({ push: pushMock });
  });

  test('renders input with initial query from URL', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Enter request...');
    expect(input).toHaveValue('test');
  });
});
