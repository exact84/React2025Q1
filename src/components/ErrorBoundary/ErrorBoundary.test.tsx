import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../';

describe('ErrorBoundary component', () => {
  test('renders child components without errors', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('catches errors and displays fallback UI', async () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return/i })).toBeInTheDocument();

    const returnButton = screen.getByText('Return');
    fireEvent.click(returnButton);
  });
});
