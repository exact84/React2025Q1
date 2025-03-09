import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Page from '../app/page';
import { notFound } from 'next/navigation';
import { Character } from '@/types/characterTypes';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('@/app/components/index', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Search: () => <div>Search Component</div>,
}));

vi.mock('@/app/components/ResultPage/ResultPage', () => ({
  default: ({
    characters,
    totalPages,
  }: {
    characters: Character[];
    totalPages: number;
  }) => (
    <div>
      ResultPage Component: {characters.length} characters, {totalPages} pages
    </div>
  ),
}));

vi.mock('@/app/components/ReduxProvider/ReduxProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/utils/pages', () => ({
  default: (count: number, perPage: number) => Math.ceil(count / perPage),
}));

describe('Page Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: 'Luke Skywalker',
                url: 'https://swapi.dev/api/people/1/',
              },
            ],
            count: 82,
          }),
      } as unknown as Response)
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('calls notFound when data is null', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as unknown as Response)
    );
    const PageWithProps = await Page({
      searchParams: { page: '1', search: '' },
    });
    render(PageWithProps);
    expect(notFound).toHaveBeenCalled();
  });

  test('handles fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Failed to fetch')));
    const PageWithProps = await Page({
      searchParams: { page: '1', search: '' },
    });
    render(PageWithProps);
    expect(notFound).toHaveBeenCalled();
  });
});
