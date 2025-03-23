import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from 'src/types/Country';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1' }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => '/all',
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
