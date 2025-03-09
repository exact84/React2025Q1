import { configureStore, Store } from '@reduxjs/toolkit';
import checkedItemsReducer, {
  addItem,
  delItem,
  delAll,
} from './checkedItemsSlice';
import { Character } from '../../types/characterTypes';
import { RootState } from '../indexStore';

describe('checkedItemsSlice', () => {
  let store: Store<RootState>;
  const character: Character = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    gender: 'male',
    hair_color: 'blond',
    eye_color: '',
    skin_color: '',
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        items: checkedItemsReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  test('should return the initial state', () => {
    expect(store.getState().items).toEqual({
      selectedCharacter: null,
      items: [],
    });
  });

  test('should handle addItem', () => {
    store.dispatch(addItem(character));
    expect(store.getState().items.items).toContainEqual(character);
  });

  test('should handle delItem', () => {
    store.dispatch(addItem(character));
    store.dispatch(delItem(character));
    expect(store.getState().items.items).not.toContainEqual(character);
  });

  test('should handle delAll', () => {
    store.dispatch(addItem(character));
    store.dispatch(delAll());
    expect(store.getState().items.items).toEqual([]);
  });
});
