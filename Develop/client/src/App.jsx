import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Chores from './pages/Addchores';
import AddchildPage from './pages/Addchild';
import AddchorePage from './pages/Addchore';
import Donate from './pages/Donate'
import Success from './pages/Success'
import OrderHistory from './pages/OrderHistory';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import MyChores from './pages/Mychores';
import { AccountProvider, StoreProvider, ParentProvider, ChildProvider } from './utils/GlobalState';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
      <AccountProvider>
      <ParentProvider>
      <ChildProvider>
    <Router>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/Register" 
            element={<Register />} 
          />
          <Route 
            path="/Add/Chores/Parent" 
            element={<Chores />} 
          />
          <Route 
            path="/MyChores" 
            element={<MyChores />} 
          />
          <Route 
            path="/Add/child" 
            element={<AddchildPage />} 
          />
          <Route 
            path="/Add/Chore" 
            element={<AddchorePage />} 
          />
          <Route
            path="/Donate"
            element={<Donate />}
          />
            <Route 
            path="/Success" 
            element={<Success />} 
          />
          <Route 
            path="/orderHistory" 
            element={<OrderHistory />} 
          />
          <Route 
            path="/products/:id" 
            element={<Detail />} 
          />
          <Route
            path="*" 
            element={<NoMatch />} 
          />
          
        </Routes>
      </div>
    </Router>
    </ChildProvider>
    </ParentProvider>  
    </AccountProvider>  
    </StoreProvider>
  </ApolloProvider>
  );
}
export default App;