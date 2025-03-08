import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '../pages/index';
import { getCharacterData } from '../utils/characterData';
import { GetServerSidePropsContext } from 'next';

vi.mock('@components/index', () => ({
  Search: vi.fn(() => <div data-testid="search" />),
  ErrorBoundary: vi.fn(({ children }) => (
    <div data-testid="error-boundary">{children}</div>
  )),
}));

vi.mock('@components/ResultPage/ResultPage', () => ({
  default: vi.fn(() => <div data-testid="result-page" />),
}));

vi.mock('@components/ReduxProvider/ReduxProvider', () => ({
  default: vi.fn(({ children }) => (
    <div data-testid="redux-provider">{children}</div>
  )),
}));

vi.mock('utils/pages', () => ({
  default: vi.fn(() => 5),
}));

vi.mock('../utils/characterData', () => ({
  getCharacterData: vi.fn(),
}));

describe('Home Page', () => {
  it('renders all main components', () => {
    render(<Home characters={[]} count={10} />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('redux-provider')).toBeInTheDocument();
    expect(screen.getByTestId('result-page')).toBeInTheDocument();
  });

  it('calls getServerSideProps correctly', async () => {
    (getCharacterData as jest.Mock).mockResolvedValue({
      props: {
        characters: [{ id: 1, name: 'Test Character' }],
        count: 20,
      },
    });

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(getCharacterData).toHaveBeenCalledWith(context);
    expect(result).toEqual({
      props: {
        characters: [{ id: 1, name: 'Test Character' }],
        count: 20,
      },
    });
  });

  it('returns notFound when getCharacterData resolves with notFound', async () => {
    (getCharacterData as jest.Mock).mockResolvedValue({ notFound: true });

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual({ notFound: true });
  });
});
