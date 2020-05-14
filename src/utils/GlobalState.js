import React, { createContext, useReducer, useContext } from "react";

import {
  SETS_CHANGE,
  LENGTH_CHANGE,
  GENERATE
} from "./actions";

export const StoreContext = createContext();
const initialState = {
  specialSet : "!#$%&'()*+,-./:;<=>?@[]^_`{|}~",
  numericSet : "012345678901234567890123456789",
  lowerCaseSet : "abcdefghijklmnopqrstuvwxyz",
  upperCaseSet : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  length: 0,
  sets: {
    numeric: false,
    special: false,
    upperCase: false,
    lowerCase: false
  }
};

const reducer = (state, action) => {

  switch (action.type) {
    case SETS_CHANGE:
      return state;

    case LENGTH_CHANGE:
      return state;

    case GENERATE:
      return state;

    default:
      return state;
  }
};

const StoreProvider = ({ ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return <StoreContext.Provider value={value} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
