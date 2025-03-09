import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Layout from '@/app/layout';

describe('Layout', () => {
  it('renders the Header component', () => {
    const { getByTestId } = render(
      <Layout>
        <div>Test Children</div>
      </Layout>
    );

    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Children</div>
      </Layout>
    );

    const childrenElement = getByText('Test Children');
    expect(childrenElement).toBeInTheDocument();
  });

  it('wraps the content in ThemeProvider', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Children</div>
      </Layout>
    );

    const themeProviderElement = getByText('Test Children').closest('div');
    expect(themeProviderElement).toBeInTheDocument();
  });
});
