import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Controls Component', () => {
  let pushMock: ReturnType<typeof vi.fn>;
  let replaceMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    pushMock = vi.fn();
    replaceMock = vi.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '2' },
      pathname: '/characters',
      push: pushMock,
      replace: replaceMock,
    });
  });

  it('calls handlePreviousPage when clicking ◀ and updates page', () => {
    render(<Controls totalPages={5} />);

    const prevButton = screen.getByText('◀');
    fireEvent.click(prevButton);

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/characters',
      query: { page: 1 },
    });
  });

  it('calls handleNextPage when clicking ► and updates page', () => {
    render(<Controls totalPages={5} />);

    const nextButton = screen.getByText('►');
    fireEvent.click(nextButton);

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/characters',
      query: { page: 3 },
    });
  });

  it('disables ◀ button on the first page', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      pathname: '/characters',
      push: pushMock,
      replace: replaceMock,
    });

    render(<Controls totalPages={5} />);

    const prevButton = screen.getByText('◀');
    expect(prevButton).toBeDisabled();
  });

  it('disables ► button on the last page', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '5' },
      pathname: '/characters',
      push: pushMock,
      replace: replaceMock,
    });

    render(<Controls totalPages={5} />);

    const nextButton = screen.getByText('►');
    expect(nextButton).toBeDisabled();
  });
});
