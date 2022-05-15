import React, { createContext, useContext } from 'react';
import { useAccountReducer } from './reducers';
import { useProductReducer } from './reducers'

const AccountContext = createContext();
const { AccProvider } = AccountContext;
const StoreContext = createContext();
const { StrProvider } = StoreContext;

const AccountProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAccountReducer({
    isLoggedIn: false,
    user_id: '',
    usertype: '',
  });
  console.log("state=", state);
  return <AccProvider value={[state, dispatch]} {...props} />;
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <StrProvider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

const useAccountContext = () => useContext(AccountContext);

export { AccountProvider, useAccountContext, StoreProvider, useStoreContext };
