import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('updates the URL query when form is submitted', () => {
    const pushMock = vi.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: '/search',
      query: {},
    });

    render(<Search />);

    const inputElement = screen.getByPlaceholderText(
      'Enter request...'
    ) as HTMLInputElement;
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'test query' } });
    fireEvent.click(buttonElement);

    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/search',
      query: { search: 'test query' },
    });
  });
});
