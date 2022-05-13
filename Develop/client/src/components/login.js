import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Wrapper = styled.section`
  padding: 4em;
  background: #FFF8DC;
 
`;
const Savebtn = styled.button`

display: inline-block;
font-family: 'Fredericka the Great', cursive;
border-radius: 3px;
padding: 0.25em 1em;
margin: 0.5rem 1rem;
width: 8rem;
background: #FFFFF0;
color: #2F4F4F;
border: 3px solid #538e73ba;
font-size: 1em;
`;

const LoginForm = () => {
  // Here we set two state variables for username and password using `useState`
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);
    const navigate = useNavigate();
  // update state based on form input changes
  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
    const handleFormSubmit = async (e) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      e.preventDefault();
      try {
        const { data } = await  login({
          variables: { ...formState },
        });
        console.log(data);
        Auth.login(data.login.token);
        if (data.login.user.usertype === "Parent") {
          navigate("/Chores/Parent");  // Add Cores
        }
        else {
          navigate("/Chores/Child");  // My chores
        }
      } catch (e) {
        console.error(e);
      }
      
    };
  
    return (
      <div>
        <Wrapper>
            <div>
              <p>Hello </p>
            </div>
            <form className="form">
              <input
              value={formState.username}
              name="username"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
              />
            <div className="col-md-6">
              <input
              value={formState.password}
              name="password"
              onChange={handleInput}
              type="password"
              placeholder="********"
              />
            </div>
          
     
          <Savebtn type="button" onClick={handleFormSubmit}>
            Log In
          </Savebtn>
        </form>
       
        </Wrapper>
      </div>
    );
  }
  
  export default LoginForm;
  