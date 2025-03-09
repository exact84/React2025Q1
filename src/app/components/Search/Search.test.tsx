import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';
import {
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';

const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(() => ({ push: pushMock })),
}));

describe('Search component', () => {
  beforeEach(() => {
    pushMock.mockClear();
    vi.mocked(usePathname).mockReturnValue('/search');
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'search' ? 'test' : null),
      [Symbol.iterator]: function* () {
        yield ['search', 'test'];
        return undefined;
      },
    } as unknown as ReadonlyURLSearchParams);
  });

  test('renders input with initial query from URL', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Enter request...');
    expect(input).toHaveValue('test');
  });

  test('updates input value when typing', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Enter request...');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });

  test('submits new search query and updates URL', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Enter request...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/search?search=new+query');
  });
});
