import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedItemsReducer from './slices/checkedItemsSlice';

const rootReducer = combineReducers({
  items: checkedItemsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
