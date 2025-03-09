import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from '../../layout';

vi.mock('@components/Header/Header', () => ({
  default: vi.fn(() => <div data-testid="header" />),
}));

vi.mock('context/ThemeProvider', () => ({
  ThemeProvider: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  )),
}));

describe('Layout Component', () => {
  test('renders without crashing', () => {
    render(
      <Layout>
        <p>Test Content</p>
      </Layout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(
      <Layout>
        <p>Test Content</p>
      </Layout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <Layout>
        <p>Some Child</p>
      </Layout>
    );
    expect(screen.getByText('Some Child')).toBeInTheDocument();
  });
});
