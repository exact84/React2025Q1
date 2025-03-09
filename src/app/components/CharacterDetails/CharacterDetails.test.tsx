import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import { Character } from 'types/characterTypes';

describe('CharacterDetails Component', () => {
  const mockCharacter: Character = {
    name: 'Luke Skywalker',
    height: '172',
    gender: 'male',
    hair_color: 'blond',
    eye_color: 'blue',
    skin_color: 'fair',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('renders character details correctly', () => {
    render(
      <CharacterDetails
        character={mockCharacter}
        isLoading={false}
        error={null}
        handleCloseClick={vi.fn()}
      />
    );

    expect(screen.getByText(/name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/172/i)).toBeInTheDocument();
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });

  it('calls handleCloseClick when Close button is clicked', () => {
    const handleCloseClick = vi.fn();

    render(
      <CharacterDetails
        character={mockCharacter}
        isLoading={false}
        error={null}
        handleCloseClick={handleCloseClick}
      />
    );

    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    expect(handleCloseClick).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error exists', () => {
    render(
      <CharacterDetails
        character={null}
        isLoading={false}
        error="Failed to load character"
        handleCloseClick={vi.fn()}
      />
    );

    expect(screen.getByText(/Failed to load character/i)).toBeInTheDocument();
  });

  it('renders nothing when character is null and no error', () => {
    const { container } = render(
      <CharacterDetails
        character={null}
        isLoading={false}
        error={null}
        handleCloseClick={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
