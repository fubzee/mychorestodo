import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Chores from './pages/Addchores';
import AddchildPage from './pages/Addchild';
import AddchorePage from './pages/Addchore';

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
            path="/Chores/:usertype" 
            element={<Chores />} 
          />
          <Route 
            path="/Add/child" 
            element={<AddchildPage />} 
          />
          <Route 
            path="/Add/Chore" 
            element={<AddchorePage />} 
          />
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
  );
}
export default App;