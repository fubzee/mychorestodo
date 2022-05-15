import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_CHORE } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Headline from './headline';
// import Auth from '../utils/auth';

const Wrapper = styled.section`
padding: 4em;
background: #FFF8DC;
`;
const Savebtn = styled.button`
display: inline-block;
font-family: 'Fredericka the Great', cursive;
border-radius: 3px;
padding: 0.25em 1em;
margin: 1rem 1rem;
width: 6rem;
background: White;
color: #2F4F4F;
border: 3px solid #538e73ba;
font-size: 1em;
`;
const Input = styled.input`
display: inline-block;
border-radius: 3px;
padding: 0.25em 1em;
margin: 0.5rem 1rem;
width: 8rem;
background: White;
color: #2F4F4F;
border: 3px solid #538e73ba;
font-size: 1em;
`;
const Card = styled.div`
max-width: 200px;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 5px;
overflow: hidden;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
margin: 30px auto;
@media (max-width: 1000px) {
background-color: #FFF8DC;
}
`;
const Text = styled.p`
font-family: 'Fredericka the Great', cursive;
padding: 0.5em 1em;
color: #2F4F4F;
font-size: 1em;
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
      <Headline></Headline>
    {data ? (
      <Text>
        Success! You may now head{' '}
        <Link to="/chores/parent">back to the page.</Link>
      </Text>
    ) : (
      <Card onSubmit={handleFormSubmit}>
        <Input>
          className="form-input"
          placeholder="Name of Chore/Task"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          </Input>
          <Input>
          className="form-input"
          placeholder="Description"
          name="description"
          type="text"
          value={formState.description}
          onChange={handleChange}
          </Input>
          <Input>
          className="form-input"
          placeholder="How many credits"
          name="num_credits"
          type="Number"
          value={formState.num_credits}
          onChange={handleChange}
          </Input>
          <Input>
          className="form-input"
          placeholder="Parent_Id"
          name="parentId"
          type="text"
          value={formState.parentId}
          onChange={handleChange}
          </Input>
          <Input>
          className="form-input"
          placeholder="childId"
          name="childId"
          type="text"
          value={formState.childId}
          onChange={handleChange}
          </Input>
          <Input>
          className="form-input"
          placeholder="repeat"
          name="repeat"
          type="String"
          value={formState.repeat}
          onChange={handleChange}
          </Input>
        <Savebtn
            type="Submit">
          Submit
        </Savebtn>
      </Card>
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
