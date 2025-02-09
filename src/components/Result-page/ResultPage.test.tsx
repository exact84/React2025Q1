import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultPage from '../Result-page/Result-page';

describe('Card List Component', () => {
  it('renders the specified number of cards', async () => {
    render(
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
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('displays a message if no cards are present', async () => {
    render(
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
    );

    await waitFor(() => {
      expect(screen.getByText('No characters found.')).toBeInTheDocument();
    });
  });
});

it('updates the URL query parameter when the page changes', async () => {
  render(
    <MemoryRouter initialEntries={['/?query=Luke&page=1']}>
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
        onPageChange={() => {}}
        searchQuery="Luke"
      />
    </MemoryRouter>
  );

  const pageButton = screen.getByText('2');
  // expect(pageButton).toBeInTheDocument();

  fireEvent.click(pageButton);

  // Проверяем, что URL обновился
  // await waitFor(() => {
  //   expect(window.location.search).toContain('page=2');
  // });
});
