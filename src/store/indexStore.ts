import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import checkedItemsReducer from './slices/checkedItemsSlice';

const rootReducer = combineReducers({
  items: checkedItemsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
