import { GetServerSidePropsContext } from 'next';
import { getCharacterData } from '../utils/characterData';

global.fetch = vi.fn();

describe('getCharacterData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns character data when API response is valid', async () => {
    const mockResponse = {
      results: [{ name: 'Luke Skywalker', id: 1 }],
      count: 1,
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const context = {
      query: { page: '2' },
    } as unknown as GetServerSidePropsContext;

    const result = await getCharacterData(context);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://swapi.dev/api/people/?page=2')
    );
    expect(result).toEqual({
      props: {
        characters: mockResponse.results,
        count: mockResponse.count,
      },
    });
  });

  it('returns notFound when API response is empty', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ results: [], count: 0 }),
    });

    const context = {
      query: { page: '3' },
    } as unknown as GetServerSidePropsContext;

    const result = await getCharacterData(context);

    expect(result).toEqual({ notFound: true });
  });

  it('returns notFound when API request fails', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const context = {
      query: { page: '1' },
    } as unknown as GetServerSidePropsContext;

    const result = await getCharacterData(context);

    expect(result).toEqual({ notFound: true });
  });
});
