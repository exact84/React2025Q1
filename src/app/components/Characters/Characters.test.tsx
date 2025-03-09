import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Characters from '@/app/components/Characters/Characters';
import configureStore from 'redux-mock-store';
import { Character } from 'types/characterTypes';
import { vi } from 'vitest';
import { useRouter } from 'next/router';

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

describe('Characters Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      items: { items: [], selectedCharacter: null },
    });
    store.dispatch = vi.fn();
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

  it('allows deleting all selected characters', () => {
    render(
      <Provider store={store}>
        <Characters characters={characters} />
      </Provider>
    );

    const button = screen.getByText('Unselect all');
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'items/delAll',
    });
  });
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockCharacters: Character[] = [
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

describe('Characters Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      items: { items: [], selectedCharacter: null },
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: vi.fn(),
      pathname: '/',
    });
  });

  it('adds a character when clicking on a checkbox', () => {
    render(
      <Provider store={store}>
        <Characters characters={mockCharacters} />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(store.getActions()).toEqual([
      { type: 'items/addItem', payload: mockCharacters[0] },
    ]);
  });

  it('selects a character when clicking on a character card', () => {
    render(
      <Provider store={store}>
        <Characters characters={mockCharacters} />
      </Provider>
    );

    const characterCard = screen.getByText('Luke Skywalker');
    fireEvent.click(characterCard);

    expect(store.getActions()).toEqual([
      { type: 'items/selectCharacter', payload: mockCharacters[0] },
    ]);
  });

  it('removes all selected characters', () => {
    render(
      <Provider store={store}>
        <Characters characters={mockCharacters} />
      </Provider>
    );

    const button = screen.getByText('Unselect all');
    fireEvent.click(button);

    expect(store.getActions()).toEqual([{ type: 'items/delAll' }]);
  });

  store = mockStore({
    items: { items: [], selectedCharacter: null },
  });

  it('downloads CSV when clicking on the Download button', async () => {
    global.URL.createObjectURL = vi.fn(() => 'mocked_url');

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

    render(
      <Provider store={store}>
        <Characters characters={mockCharacters} />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );

    const downloadButton = screen.getByText(/Download/i);
    expect(downloadButton).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
