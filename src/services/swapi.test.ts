import { renderHook } from '@testing-library/react';
import { useCharacters } from './swapi';
import { useGetCharactersQuery } from '../store/slices/apiSlice';
import { vi } from 'vitest';

vi.mock('../store/slices/apiSlice', () => ({
  useGetCharactersQuery: vi.fn(),
}));

const mockedUseGetCharactersQuery = useGetCharactersQuery as jest.Mock;

describe('useCharacters', () => {
  it('shold call useGetCharactersQuery and return data', () => {
    const mockData = {
      results: [{ name: 'Luke Skywalker', height: '172', mass: '77' }],
    };

    mockedUseGetCharactersQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useCharacters('Luke', 1));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);

    expect(mockedUseGetCharactersQuery).toHaveBeenCalledWith({
      query: 'Luke',
      page: 1,
    });
  });
});
