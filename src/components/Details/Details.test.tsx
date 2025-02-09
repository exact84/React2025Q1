import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Details from '../Details/Details';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

describe('Detailed Card Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ name: 'Luke Skywalker' }))
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('correctly displays the detailed card data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ name: 'Luke Skywalker' }))
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ name: 'Luke Skywalker' }))
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
    });
  });

  it('handles API errors correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('404. Person not found.')
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error: 404. person not found./i)
      ).toBeInTheDocument();
    });
  });
});
