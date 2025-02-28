import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL || 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ query, page }) =>
        `people/?search=${encodeURIComponent(query)}&page=${page}`,
    }),
  }),
});

export const { useGetCharactersQuery } = apiSlice;
