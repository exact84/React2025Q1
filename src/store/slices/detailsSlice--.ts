import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Тип состояния
// type State = {
//   idItem: number;
// };

// // Начальное состояние
// const initialState: State = {
//   idItem: 0,
// };

// Создаём срез
const detailsSlice = createSlice({
  name: 'details',
  initialState: { idItem: 0 },
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.idItem = action.payload;
    },
  },
});

// Экспортируем экшены и редуктор
export const { setId } = detailsSlice.actions;
export default detailsSlice.reducer;
