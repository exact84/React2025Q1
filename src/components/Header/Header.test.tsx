import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Header from './Header';
import { ThemeContext } from '../../context/ThemeContext';

const toggleThemeMock = vi.fn();

describe('Header component', () => {
  beforeEach(() => {
    toggleThemeMock.mockClear();
  });

  test('renders header title and button', () => {
    render(<Header />);

    expect(screen.getByText(/Task4/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Change Theme/i })
    ).toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', () => {
    render(
      <ThemeContext.Provider
        value={{ theme: 'light', toggleTheme: toggleThemeMock }}
      >
        <Header />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Change Theme/i });
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
