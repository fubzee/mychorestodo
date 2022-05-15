import React, { createContext, useContext } from 'react';
import { useAccountReducer } from './reducers';

const AccountContext = createContext();
const { Provider } = AccountContext;

const AccountProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAccountReducer({
    isLoggedIn: false,
    user_id: '',
    usertype: '',
  });
  console.log("state=", state);
  return <Provider value={[state, dispatch]} {...props} />;
};

const useAccountContext = () => useContext(AccountContext);

export { AccountProvider, useAccountContext };
