import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { ADD_CHILD } from '../utils/mutations';
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

  /* Adapt the colors based on state */
  background:  #FFF8DC;
  color: # 000;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 3px;
`;

const AddChild = () => {
 
  const [formState, setFormState] = useState({
    username: '',
    usertype: '',
    password: '',
    hint: '',
    name: '',
    total_credits: '',
    credittype: '',
    parent_Id:'',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [addChild, {err1, data1}] = useMutation(ADD_CHILD);
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
    console.log(event.totalcredits)
    const totalcreditsint = parseInt(formState.total_credits)
    // const totalcreditsint = () => {
    //     setState({[event.totalcredits]: parseInt(event.totalcredits) ? parseInt(event.totalcredits) : ''})
    // }
    console.log(totalcreditsint);
    await addChild({variables: { "userId":data.addUser._id, "totalcredits":totalcreditsint, ...formState }})
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Wrapper>
    {data ? (
      <p>
        Success! You may now head{' '}
        <Link to= "/Chores/Parent">back and add some chores to do!.</Link>
      </p>
    ) : (
      <InputForm onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Child's username"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
          <input
          className="form-input"
          placeholder="Child"
          defaultValue="Child"
          name="usertype"
          type="text"
        //   value={formState.usertype}
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
          name="total_credits"
          type="number"
          value={formState.total_credits}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Credit type, e.g. Stars or Dollars"
          name="credittype"
          type="text"
          value={formState.credittype}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="parentId"
          name="parentId"
          type="text"
          value={formState.parent_Id}
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

export default AddChild;