import { createContext, useReducer } from 'react';

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload };

    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, fetchedCoffeeStores: action.payload };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreContext = createContext();

const initialState = {
  latLong: '',
  fetchedCoffeeStores: [],
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const { latLong, fetchedCoffeeStores } = state;

  const value = { latLong, fetchedCoffeeStores, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
