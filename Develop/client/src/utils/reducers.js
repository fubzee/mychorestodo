import { useReducer } from 'react';
import {  } from './actions';

export const reducer = (state, action) => {
      console.log('UPDATE_ACCOUNT_STATUS dispatched');
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
      };
};


export function useAccountReducer(initialState) {
  return useReducer(reducer, initialState);
}
