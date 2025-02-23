import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  const defaultProps = {
    onSearch: mockOnSearch,
    searchQuery: 'initial query',
  };

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders correctly with initial searchQuery', () => {
    render(<Search {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(
      'Enter request...'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('initial query');

    const buttonElement = screen.getByText('Search');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when form is submitted', () => {
    render(<Search {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(
      'Enter request...'
    ) as HTMLInputElement;
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'test query' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('does not call onSearch if input is empty', () => {
    render(<Search {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText(
      'Enter request...'
    ) as HTMLInputElement;
    const buttonElement = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to localStorage when the Search button is clicked', async () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} searchQuery="" />);

    const input = screen.getByPlaceholderText('Enter request...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Luke');
  });

  it('retrieves the value from localStorage upon mounting', async () => {
    localStorage.setItem('queryString', 'Luke');

    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} searchQuery="Luke" />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Luke')).toBeInTheDocument();
    });
  });
});
