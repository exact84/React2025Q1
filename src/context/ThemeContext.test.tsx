import { render, screen } from '@testing-library/react';
import { ThemeContext } from './ThemeContext';
import { defaultToggleTheme } from './ThemeContext';
import { vi } from 'vitest';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('ThemeContext functions', () => {
    test('toggleTheme should be call', () => {
      const mockFn = vi.fn(defaultToggleTheme);
      mockFn();
      expect(mockFn).toHaveBeenCalled();
    });
  });
  test('provide default values', () => {
    render(
      <ThemeContext.Consumer>
        {({ theme }) => <span data-testid="theme">{theme}</span>}
      </ThemeContext.Consumer>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
});
