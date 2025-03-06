import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from 'types/characterTypes';

const BASE_URL = process.env.BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL || 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ query, page }) =>
        `people/?search=${encodeURIComponent(query)}&page=${page}`,
    }),
    getCharacter: builder.query<Character, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = apiSlice;
