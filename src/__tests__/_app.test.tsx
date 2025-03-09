import { render, screen } from '@testing-library/react';
import MyApp from '../pages/_app';
import { AppProps } from 'next/app';
import { Router } from 'next/router';

vi.mock('@components/Layout/Layout', () => ({
  default: vi.fn(({ children }) => <div data-testid="layout">{children}</div>),
}));

const mockRouter = {
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
} as unknown as Router;

describe('MyApp Component', () => {
  it('renders the Layout and Component', () => {
    const TestComponent = () => (
      <div data-testid="test-component">Test Content</div>
    );

    const props: AppProps = {
      Component: TestComponent,
      pageProps: {},
      router: mockRouter,
    };

    render(<MyApp {...props} />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
});
