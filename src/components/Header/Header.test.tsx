import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Header from './Header';

const toggleThemeMock = vi.fn();

vi.mock('../../context', () => ({
  useTheme: () => ({ toggleTheme: toggleThemeMock }),
}));

describe('Header component', () => {
  beforeEach(() => {
    toggleThemeMock.mockClear();
  });

  test('renders header title and button', () => {
    render(<Header />);

    expect(
      screen.getByText(/Task2 "Redux\. Context api\."/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Change Theme/i })
    ).toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /Change Theme/i });

    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
