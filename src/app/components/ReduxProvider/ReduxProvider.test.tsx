import { render, screen } from '@testing-library/react';
import ReduxProvider from './ReduxProvider';
import { Provider } from 'react-redux';
import { store } from '@/store/indexStore';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  Provider: vi.fn(({ children }) => (
    <div data-testid="provider">{children}</div>
  )),
}));

describe('ReduxProvider Component', () => {
  it('renders children inside Provider', () => {
    render(
      <ReduxProvider>
        <div data-testid="child">Child Component</div>
      </ReduxProvider>
    );

    expect(screen.getByTestId('provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses the correct store', () => {
    render(
      <ReduxProvider>
        <div>Test</div>
      </ReduxProvider>
    );

    expect(Provider).toHaveBeenCalledWith(
      expect.objectContaining({ store }),
      expect.anything()
    );
  });
});
