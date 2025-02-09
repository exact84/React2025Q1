import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

it('renders child components without errors', () => {
  render(
    <ErrorBoundary onError={vi.fn()}>
      <div>Child Component</div>
    </ErrorBoundary>
  );
  expect(screen.getByText('Child Component')).toBeInTheDocument();
});

it('catches errors and displays fallback UI', () => {
  const ThrowError = () => {
    throw new Error('Test Error');
  };
  const onErrorMock = vi.fn();

  render(
    <ErrorBoundary onError={onErrorMock}>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('An Error occurred but handled')).toBeInTheDocument();
  expect(onErrorMock).toHaveBeenCalled();
});

it('resets error state when return button is clicked', () => {
  const ThrowError = () => {
    throw new Error('Test Error');
  };
  const onErrorMock = vi.fn();

  render(
    <ErrorBoundary onError={onErrorMock}>
      <ThrowError />
    </ErrorBoundary>
  );
});
