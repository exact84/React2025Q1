import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Characters from '@/app/components/Characters/Characters';
import configureStore from 'redux-mock-store';
import { Character } from 'types/characterTypes';
import { vi } from 'vitest';
import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';

const mockStore = configureStore([]);

const characters: Character[] = [
  {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    height: '',
    gender: '',
    hair_color: '',
    eye_color: '',
    skin_color: '',
  },
  {
    name: 'Darth Vader',
    url: 'https://swapi.dev/api/people/4/',
    height: '',
    gender: '',
    hair_color: '',
    eye_color: '',
    skin_color: '',
  },
];

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Characters Component', () => {
  let store: ReturnType<typeof mockStore>;
  const pushMock = vi.fn();

  beforeEach(() => {
    store = mockStore({
      items: { items: [], selectedCharacter: null },
    });
    store.dispatch = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(usePathname).mockReturnValue('/');
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn(),
      toString: vi.fn(() => ''),
      [Symbol.iterator]: vi.fn(),
    } as unknown as ReadonlyURLSearchParams);
  });

  it('renders character list', () => {
    render(
      <Provider store={store}>
        <Characters characters={characters} />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('removes all selected characters', () => {
    store = mockStore({
      items: {
        items: [characters[0]],
        selectedCharacter: null,
      },
    });

    render(
      <Provider store={store}>
        <Characters characters={characters} />
      </Provider>
    );

    const button = screen.getByText('Unselect all');
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'items/delAll' }]);
  });

  it('downloads CSV when clicking on the Download button', async () => {
    global.URL.createObjectURL = vi.fn(() => 'mocked_url');
    global.URL.revokeObjectURL = vi.fn();

    const mockCharacters: Character[] = [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        height: '172',
        gender: 'male',
        hair_color: 'blond',
        eye_color: 'blue',
        skin_color: 'fair',
      },
    ];

    store = mockStore({
      items: { items: mockCharacters, selectedCharacter: null },
    });

    render(
      <Provider store={store}>
        <Characters characters={mockCharacters} />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
