import { useGetCharactersQuery } from '../store/slices/apiSlice';

export const useCharacters = (query: string, page: number) => {
  return useGetCharactersQuery({ query, page });
};
