import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { ADD_CHILD } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Headline from './headline';



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

const AddChild = () => {
 
  const [formState, setFormState] = useState({
    username: '',
    usertype: '',
    password: '',
    hint: '',
    name: '',
    total_credits: '',
    credittype: '',
    
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [addChild, {c_err, c_data1}] = useMutation(ADD_CHILD);
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
      console.log(totalcreditsint);
      const { c_data } = await addChild({variables: { 
      "userId":data.addUser._id, 
      "totalcredits":totalcreditsint, 
      "parent_ID": useContext.Parent._id, 
      ...formState }})
      }catch (e) {
        console.error(e.message);
      }
    }
  

  return (
    <Wrapper>
      <Headline></Headline>
    {data ? (
      <Text>
        Success! You may now head{' '}
        <Link to= "/Chores/Parent">back and add some chores to do!.</Link>
     </Text>
    ) : (
      <Card>
        <Text>Child's Information</Text>
        <Input
          className="form-input"
          placeholder="Child's username"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
         <Input
          className="form-input"
          placeholder="Child"
          defaultValue="Child"
          name="usertype"
          type="text"
          value={formState.usertype}
          onChange={handleChange}
          />
          <Input
          className="form-input"
          placeholder="Password Hint"
          name="hint"
          type="text"
          value={formState.hint}
          onChange={handleChange}
          />
          <Input
          className="form-input"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          />
          <Input
          className="form-input"
          placeholder="Name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          />
          <Input
          className="form-input"
          name="total_credits"
          type="number"
          value={formState.total_credits}
          onChange={handleChange}
          />
          <Input
          className="form-input"
          placeholder="Credit type, e.g. Stars or Dollars"
          name="credittype"
          type="text"
          value={formState.credittype}
          onChange={handleChange}
          />
          {/* <Input
          className="form-input"
          placeholder="parentId"
          name="parentId"
          type="text"
          value={formState.parentId}
          onChange={handleChange}
          /> */}
          <Savebtn 
            type="Submit" onClick={handleFormSubmit}>
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

export default AddChild;