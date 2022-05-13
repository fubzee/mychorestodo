import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_CHORE } from '../utils/mutations';
import { Link } from 'react-router-dom';
// import Auth from '../utils/auth';

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

const AddChore = () => {
 
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    num_credits: '',
    repeat:'',
    parentId: '',
    childId: '',
  
  });

  const [addChore, { error, data }] = useMutation(ADD_CHORE);
  
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
    const numcreditsint = parseInt(formState.num_credits)
    const datecreated = Date()
    try {
      const { data } = await addChore({variables: { 
        "numcredits":numcreditsint, 
        "status" : false,
        "datecreated": datecreated,
        ...formState }})
    console.log(data);
    // Auth.login(data.addUser.token);
    // console.log(data.addUser._id)
    // await addParent({variables: { "userId":data.addUser._id, ...formState }})
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Wrapper>
    {data ? (
      <p>
        Success! You may now head{' '}
        <Link to="/chores/parent">back to the page.</Link>
      </p>
    ) : (
      <InputForm onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Name of Chore/Task"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
          <input
          className="form-input"
          placeholder="Description"
          name="description"
          type="text"
          value={formState.description}
          onChange={handleChange}
          
        />
        <input
          className="form-input"
          placeholder="How many credits"
          name="num_credits"
          type="Number"
          value={formState.num_credits}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="Parent_Id"
          name="parentId"
          type="text"
          value={formState.parentId}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="childId"
          name="childId"
          type="text"
          value={formState.childId}
          onChange={handleChange}
        />
        <input
          className="form-input"
          placeholder="repeat"
          name="repeat"
          type="String"
          value={formState.repeat}
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

export default AddChore;
