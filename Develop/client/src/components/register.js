import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { ADD_PARENT } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Wrapper = styled.section`
  padding: 4em;
  background: #FFF8DC;
`;

const InputForm = styled.form`
padding: 4em;
background: #000000;
`;

const Savebtn = styled.button`
  background: #2F4F4F;
  color: # 000;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 3px;
`;

const Registration = () => {
 
  const [formState, setFormState] = useState({
    username: '',
    usertype: '',
    password: '',
    hint: '',
    name: '',
    email: '',
    chart: ''
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [addParent, {err1, data1}] = useMutation(ADD_PARENT);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({variables: { ...formState }})
    console.log(data);
    Auth.login(data.addUser.token);
    console.log(data.addUser._id)
    await addParent({variables: { "userId":data.addUser._id, ...formState }})
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Wrapper>
    {data ? (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
    ) : (
      <InputForm onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
          <input
          className="form-input"
          placeholder="Parent"
          defaultValue={"Parent"}
          name="usertype"
          type="text"
          value={formState.usertype}
          onChange={handleChange}
          
        />
        <input
          className="form-input"
          placeholder="Password Hint"
          name="hint"
          type="text"
          value={formState.hint}
          onChange={handleChange}
        />
          <input
          className="form-input"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="eMail"
          name="email"
          type="text"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Chart Name"
          name="chart"
          type="text"
          value={formState.chart}
          onChange={handleChange}
        />

        <Savebtn
            type="Submit">
          Submit
        </Savebtn>
      </InputForm>
    )}
    {error && (
      <div className="my-3 p-3 bg-danger text-white">
        {error.message}
      </div>
    )}
    </Wrapper>
  );
};

export default Registration;
