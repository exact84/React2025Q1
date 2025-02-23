import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorBoundary } from '../';

describe('ErrorBoundary component', () => {
  test('renders child components without errors', () => {
    render(
      <ErrorBoundary onError={vi.fn()} onSearch={vi.fn()} searchQuery="">
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('catches errors and displays fallback UI', async () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };
    const onErrorMock = vi.fn();
    const onSearchMock = vi.fn();

    render(
      <ErrorBoundary
        onError={onErrorMock}
        onSearch={onSearchMock}
        searchQuery=""
      >
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('An Error occurred but handled')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return/i })).toBeInTheDocument();
    expect(onErrorMock).toHaveBeenCalled();

    const returnButton = screen.getByText('Return');
    fireEvent.click(returnButton);
  });

  test('calls onSearch when handleSearch is triggered', () => {
    const onSearchMock = vi.fn();
    const searchQuery = 'test query';

    const instance = new ErrorBoundary({
      onError: vi.fn(),
      onSearch: onSearchMock,
      searchQuery,
      children: null,
    });
    instance.handleSearch();

    expect(onSearchMock).toHaveBeenCalledWith(searchQuery);
  });
});
