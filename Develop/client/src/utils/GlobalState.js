import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccountReducer } from './reducers';
import { useProductReducer } from './reducers';


const AccountContext = createContext();
const ParentContext = createContext();
const StoreContext = createContext();
const ChildContext = createContext();
const UserContext = createContext();


const AccountProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAccountReducer({
    isLoggedIn: false,
    user_id: '',
    usertype: '',
  });
  console.log("state=", state);
  return <AccountContext.Provider value={[state, dispatch]} {...props} />;
};

const { Provider } =  StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
    chore: [],
    children: [],
  });

return < Provider value={[state, dispatch]} {...props} />;
};

const UserProvider = (props) => {
  const [User, setUser] = useState();

  useEffect(() => {
    console.log(User)
  }, [User])

return <UserContext.Provider value={{ User, setUser }} {...props} />;
};

const ParentProvider = (props) => {
  const [Parent, setParent] = useState();

  useEffect(() => {
    console.log(Parent)
  }, [Parent])

return <ParentContext.Provider value={{ Parent, setParent }} {...props} />;
};

const ChildProvider = (props) => {
  const [Child, setChild] = useState();

  useEffect(() => {
    console.log(Child)
  }, [Child])

return <ChildContext.Provider value={{ Child, setChild }} {...props} />;
};

// const ChoreProvider = (props) => {
//   const [Chore, setChore] = useState();

//   useEffect(() => {
//     console.log(Chore)
//   }, [Chore])

// return <ChoreContext.Provider value={{ Chore, setChore }} {...props} />;
// };


// const ChildrenProvider = (props) => {
//   const [Children, setChildren] = useState();

//   useEffect(() => {
//     console.log(Children)
//   }, [Children])

// return <ChoreContext.Provider value={{ Children, setChildren }} {...props} />;
// };
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

// const useChoreContext = () => {
//   return useContext(ChoreContext)
// };

// const useChildrenContext = () => {
//   return useContext(ChildrenContext)
// };

const useUserContext = () => {
  return useContext(UserContext)
};
export { 
  AccountProvider, useAccountContext, 
  StoreProvider, useStoreContext,
  ParentProvider, useParentContext,
  ChildProvider, useChildContext,
  UserProvider, useUserContext,
  // ChoreProvider, useChoreContext,
  // ChildrenProvider, useChildrenContext,

 };
