import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Controls from './Controls';
import {
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';

const pushMock = vi.fn();
const replaceMock = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useRouter: vi.fn(() => ({
    push: pushMock,
    replace: replaceMock,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

describe('Controls Component', () => {
  beforeEach(() => {
    pushMock.mockClear();
    replaceMock.mockClear();
    vi.mocked(usePathname).mockReturnValue('/search');
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '1' : null),
      toString: () => 'page=1',
      [Symbol.iterator]: function* () {
        yield ['page', '1'];
      },
    } as unknown as ReadonlyURLSearchParams);
  });

  test('renders pagination buttons', () => {
    render(<Controls totalPages={5} />);
    expect(screen.getByText('◀')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('►')).toBeInTheDocument();
  });

  test('changes page when clicking pagination buttons', () => {
    render(<Controls totalPages={5} />);
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);
    expect(pushMock).toHaveBeenCalledWith('/search?page=2');
  });

  test('disables previous button on first page', () => {
    render(<Controls totalPages={5} />);
    const previousButton = screen.getByText('◀');
    expect(previousButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'page' ? '5' : null),
      toString: () => 'page=5',
      [Symbol.iterator]: function* () {
        yield ['page', '5'];
      },
    } as unknown as ReadonlyURLSearchParams);
    render(<Controls totalPages={5} />);
    const nextButton = screen.getByText('►');
    expect(nextButton).toBeDisabled();
  });

  test('updates URL when changing page', () => {
    render(<Controls totalPages={5} />);
    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);
    expect(pushMock).toHaveBeenCalledWith('/search?page=3');
  });
});
