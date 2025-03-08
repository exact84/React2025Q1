import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/characterTypes';

type State = {
  selectedCharacter: Character | null;
  items: Character[];
};

const initialState: State = {
  selectedCharacter: null,
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
    selectCharacter: (state, action: PayloadAction<Character | null>) => {
      state.selectedCharacter = action.payload;
    },
  },
});

export const { addItem, delItem, delAll, selectCharacter } =
  checkedItemsSlice.actions;
export default checkedItemsSlice.reducer;
