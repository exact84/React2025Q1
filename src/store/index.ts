// import { configureStore } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './slices/detailsSlice';

// type State = {
//   idItem: number;
// };

// export type ShowDetails = {
//   type: 'inc';
// };

// export type HideDetails = {
//   type: 'dec';
// };

// type Action = ShowDetails | HideDetails;

// const initialState = {
//   idItem: 0,
// };

// const reducer = (state = initialState, action: Action): State => {
//   switch (action.type) {
//     case 'inc':
//       return {
//         ...state,
//         idItem: state.idItem + 1,
//       };
//       break;

//     case 'dec':
//       return {
//         ...state,
//         idItem: state.idItem - 1,
//       };
//       break;

//     default:
//       return state;
//       break;
//   }
// };

// export const store = configureStore({
//   reducer: {
//     detaisReducer: reducer,
//   },
// });

export const store = configureStore({
  reducer: {
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // тип состояни Redux, для использования в useSelector
export type AppDispatch = typeof store.dispatch; // тип функции dispatch, для useDispatch
// Если структура Redux изменится, TypeScript автоматически обновит типы
