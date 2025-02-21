import { createStore } from 'redux';
import { Character } from '../types/characterTypes';

type Action =
  | { type: 'ADD_ITEM'; payload: Character }
  | { type: 'DEL_ITEM'; payload: Character }
  | { type: 'DEL_ALL' };

export type RootState = {
  items: Character[];
};

export type AppDispatch = (action: Action) => void;

const defaultState: RootState = { items: [] };

const reducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'DEL_ITEM': {
      const newItems: Character[] = state.items.filter(
        (item) => item.url !== action.payload.url
      );
      return { ...state, items: newItems };
    }
    case 'DEL_ALL':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const store = createStore(reducer);
