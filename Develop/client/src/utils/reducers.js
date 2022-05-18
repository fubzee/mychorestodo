import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        isLoggedIn: !action.isLoggedIn,
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        isLoggedIn: !action.isLoggedIn,
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        isLoggedIn: !action.isLoggedIn,
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
        currentCategory: action.currentCategory,
      };

    default:
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
      };
  }
};
export function useAccountReducer(initialState) {
  return useReducer(reducer, initialState);
}
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}

export function useParentReducer(initialState) {
  return useReducer(reducer, initialState);
}

export function useChildReducer(initialState) {
  return useReducer(reducer, initialState);
}

export function useUserReducer(initialState) {
  return useReducer(reducer, initialState);
}
