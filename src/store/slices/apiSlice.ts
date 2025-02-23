import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ query, page }) =>
        `people/?search=${encodeURIComponent(query)}&page=${page}`,
    }),
  }),
});

export const { useGetCharactersQuery } = apiSlice;
