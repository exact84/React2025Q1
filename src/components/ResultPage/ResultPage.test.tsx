import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultPage from './ResultPage';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/indexStore';
import { delAll } from '../../store/slices/checkedItemsSlice';

describe('ResultPage Component', () => {
  it('renders the specified number of cards', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[
              {
                name: 'Luke Skywalker',
                height: '172',
                hair_color: 'blond',
                gender: 'male',
                url: 'https://swapi.dev/api/people/1/',
              },
            ]}
            currentPage={1}
            totalPages={1}
            errorAPI=""
            isLoading={false}
            onPageChange={() => {}}
            searchQuery="Luke"
          />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('displays a message if no cards are present', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[]}
            currentPage={1}
            totalPages={0}
            errorAPI=""
            isLoading={false}
            onPageChange={() => {}}
            searchQuery=""
          />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('No characters found.')).toBeInTheDocument();
    });
  });

  it('displays a loader when isLoading is true', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[]}
            currentPage={1}
            totalPages={0}
            errorAPI=""
            isLoading={true}
            onPageChange={() => {}}
            searchQuery=""
          />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('renders pagination buttons and handles page change', async () => {
    const mockOnPageChange = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[
              {
                name: 'Luke Skywalker',
                height: '172',
                hair_color: 'blond',
                gender: 'male',
                url: 'https://swapi.dev/api/people/1/',
              },
            ]}
            currentPage={1}
            totalPages={3}
            errorAPI=""
            isLoading={false}
            onPageChange={mockOnPageChange}
            searchQuery="Luke"
          />
        </MemoryRouter>
      </Provider>
    );

    const prevButton = screen.getByText('◀');
    const nextButton = screen.getByText('►');
    const pageButtons = screen.getAllByRole('button', { name: /[1-3]/ });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageButtons).toHaveLength(3);

    fireEvent.click(pageButtons[1]);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('throws an error when the error button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[]}
            currentPage={1}
            totalPages={0}
            errorAPI=""
            isLoading={false}
            onPageChange={() => {}}
            searchQuery=""
          />
        </MemoryRouter>
      </Provider>
    );

    const errorButton = screen.getByText('Error Button');
    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error!');
  });

  it('checking items', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[
              {
                name: 'Leia Organa',
                height: '150',
                hair_color: 'brown',
                gender: 'female',
                url: 'https://swapi.dev/api/people/5/',
              },
            ]}
            currentPage={1}
            totalPages={1}
            errorAPI=""
            isLoading={false}
            onPageChange={() => {}}
            searchQuery="Leia"
          />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
  });

  beforeEach(() => {
    store.dispatch(delAll());
  });

  it('add and delete items at store', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultPage
            characters={[
              {
                name: 'Darth Vader',
                height: '202',
                hair_color: 'none',
                gender: 'male',
                url: 'https://swapi.dev/api/people/4/',
              },
            ]}
            currentPage={1}
            totalPages={1}
            errorAPI=""
            isLoading={false}
            onPageChange={() => {}}
            searchQuery="Darth"
          />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByText('Unselect all');

    fireEvent.click(checkbox);
    expect(store.getState().items.items).toHaveLength(1);

    fireEvent.click(checkbox);
    expect(store.getState().items.items).toHaveLength(0);

    fireEvent.click(checkbox);
    fireEvent.click(button);
    expect(store.getState().items.items).toHaveLength(0);
  });
});
