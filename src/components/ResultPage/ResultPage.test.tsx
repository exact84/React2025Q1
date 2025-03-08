import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResultPage from './ResultPage';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/indexStore';
import { ThemeContext } from '../../context/ThemeContext';

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

  it('рендерит список персонажей', async () => {
    renderWithProviders(
      <ResultPage characters={mockCharacters} totalPages={1} />
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('показывает сообщение, если персонажи не найдены', async () => {
    renderWithProviders(<ResultPage characters={[]} totalPages={0} />);

    await waitFor(() => {
      expect(screen.getByText('No characters found.')).toBeInTheDocument();
    });
  });

  it('переключает тему при клике на кнопку "Change Theme"', async () => {
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

  it('вызывает ошибку при клике на "Error Button"', async () => {
    renderWithProviders(
      <ResultPage characters={mockCharacters} totalPages={1} />
    );

    const errorButton = screen.getByText('Error Button');

    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error!');
  });
});
