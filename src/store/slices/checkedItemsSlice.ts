import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/characterTypes';

type State = {
  items: Character[];
};

const initialState: State = {
  items: [],
};

const checkedItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Character>) => {
      state.items.push(action.payload);
    },
    delItem: (state, action: PayloadAction<Character>) => {
      state.items = state.items.filter(
        (item) => item.url !== action.payload.url
      );
    },
    delAll: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, delItem, delAll } = checkedItemsSlice.actions;
export default checkedItemsSlice.reducer;
