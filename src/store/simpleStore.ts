import { createStore } from 'redux';

type Action =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'DEL_ITEM'; payload: string }
  | { type: 'DEL_ALL' }
  | { type: 'GET_ITEMS'; payload: string[] };

export type RootState = {
  items: string[];
};

export type AppDispatch = (action: Action) => void;

const defaultState: RootState = { items: [] };

const reducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'DEL_ITEM': {
      const newItems: string[] = state.items.filter(
        (item) => item !== action.payload
      );
      return { ...state, items: newItems };
    }
    case 'DEL_ALL':
      return { ...state, items: [] };
    case 'GET_ITEMS':
      return state;
    default:
      return state;
  }
};

export const store = createStore(reducer);
