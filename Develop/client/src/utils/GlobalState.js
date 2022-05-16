import React, { createContext, useContext } from 'react';
import { useAccountReducer } from './reducers';
import { useProductReducer } from './reducers';
import { useParentReducer } from './reducers';
import { useChildReducer } from './reducers';

const AccountContext = createContext();
const ParentContext = createContext();
const StoreContext = createContext();
const ChildContext = createContext();

const AccountProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAccountReducer({
    isLoggedIn: false,
    user_id: '',
    usertype: '',
  });
  console.log("state=", state);
  return <AccountContext.Provider value={[state, dispatch]} {...props} />;
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const ParentProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useParentReducer({
      Parent: []
      });

return <ParentContext.Provider value={[state, dispatch]} {...props} />;
};

const ChildProvider = ( { value = [], ...props }) => {
  const [state, dispatch] = useChildReducer({
      Child: []
      });

return <ChildContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

const useAccountContext = () => {
  return useContext(AccountContext)
};

const useParentContext = () => {
  return useContext(ParentContext)
};

const useChildContext = () => {
  return useContext(ChildContext)
};
export { 
  AccountProvider, useAccountContext, 
  StoreProvider, useStoreContext,
  ParentProvider, useParentContext,
  ChildProvider, useChildContext
 };
