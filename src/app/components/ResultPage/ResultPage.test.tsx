import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResultPage from './ResultPage';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../../store/indexStore';
import { ThemeContext } from '../../../context/ThemeContext';

describe('ResultPage Component', () => {
  const mockCharacters = [
    {
      name: 'Luke Skywalker',
      height: '172',
      hair_color: 'blond',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
      eye_color: '',
      skin_color: '',
    },
  ];

  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: vi.fn() }}>
          {ui}
        </ThemeContext.Provider>
      </Provider>
    );
  };

  it('renders the character list', async () => {
    renderWithProviders(
      <ResultPage characters={mockCharacters} totalPages={1} />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('displays a message if no characters are found', async () => {
    renderWithProviders(<ResultPage characters={[]} totalPages={0} />);

    await waitFor(() => {
      expect(screen.getByText('No characters found.')).toBeInTheDocument();
    });
  });

  it('toggles the theme when clicking the "Change Theme" button', async () => {
    const toggleThemeMock = vi.fn();
    render(
      <Provider store={store}>
        <ThemeContext.Provider
          value={{ theme: 'light', toggleTheme: toggleThemeMock }}
        >
          <ResultPage characters={mockCharacters} totalPages={1} />
        </ThemeContext.Provider>
      </Provider>
    );

    const button = screen.getByText('Change Theme');
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('throws an error when clicking the "Error Button"', async () => {
    renderWithProviders(
      <ResultPage characters={mockCharacters} totalPages={1} />
    );

    const errorButton = screen.getByText('Error Button');

    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error!');
  });
});
