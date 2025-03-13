import { createSlice } from '@reduxjs/toolkit';

interface Country {
  id: string;
  name: string;
}

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [
    { id: '1', name: 'Россия' },
    { id: '2', name: 'Беларусь' },
    { id: '3', name: 'Казахстан' },
    { id: '4', name: 'Узбекистан' },
    { id: '5', name: 'Киргизия' },
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
