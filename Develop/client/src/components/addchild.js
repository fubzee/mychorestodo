import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { ADD_CHILD } from "../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Headline from "./headline";
import { useParentContext } from "../utils/GlobalState";

const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;
const Savebtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  border-radius: 3px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  padding: 0.25em 1em;
  margin: 1rem 1rem;
  width: 6rem;
  background: White;
  color: #2f4f4f;
  border: 3px solid #538e73ba;
  font-size: 1em;
`;
const Input = styled.input`
  display: inline-block;
  border-radius: 3px;
  padding: 0em 0.5em;
  margin: 0.2rem 0.2rem;
  width: 12rem;
  background: White;
  color: #2f4f4f;
  border: 3px solid #538e73ba;
  font-size: 1em;
`;
const Card = styled.div`
  max-width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin: 30px auto;
  @media (max-width: 1000px) {
    background-color: #fff8dc;
  }
`;
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0em 0.5em;
  color: #2f4f4f;
  font-size: 1 em;
  margin: 0.2rem 0.2rem;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border: none;
  justify-content: space-evenly;
  align-itmes: stretch;
`;
const AddChild = () =>
{
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    hint: "",
    name: "",
    total_credits: "",
    credittype: "",
  });
  const { Parent } = useParentContext();
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [addChild, { c_err, c_data1 }] = useMutation(ADD_CHILD);
  // update state based on form input changes
  const handleChange = (event) =>
  {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) =>
  {
    event.preventDefault();
    console.log(formState);
    try
    {
      const { data } = await addUser({
        variables: { usertype: "Child", ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
      console.log(data.addUser._id);
      console.log(event.totalcredits);
      const totalcreditsint = parseInt(formState.total_credits);
      console.log(totalcreditsint);
      console.log("userid", data.addUser._id);
      console.log("parentid", Parent);
      const { c_data } = await addChild({
        variables: {
          userId: data.addUser._id,
          totalcredits: totalcreditsint,
          parentId: Parent._id,
          ...formState,
        },
      });
    } catch (e)
    {
      console.error(e.message);
    }
  };

  return (
    <Wrapper>
      <Headline></Headline>
      {data ? (
        <Text>
          Success! You may now head{" "}
          <Link to="/Chores/Parent">back and add some chores to do!.</Link>
        </Text>
      ) : (
        <Card>
          <Text>Child's Information</Text>
          <Text>Username</Text>
          <Input
            className="form-input"
            placeholder="Child's username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
          <Text>Password Hint</Text>
          <Input
            className="form-input"
            placeholder="Password Hint"
            name="hint"
            type="text"
            value={formState.hint}
            onChange={handleChange}
          />
          <Text>Password</Text>
          <Input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <Text>Name</Text>
          <Input
            className="form-input"
            placeholder="Name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <Text>Reward Total</Text>
          <Input
            className="form-input"
            name="total_credits"
            type="Number"
            value={formState.total_credits}
            onChange={handleChange}
          />
          <Text>Reward type (e.g. Stars/Dollars)</Text>
          <Input
            className="form-input"
            placeholder="Credit type, e.g. Stars or Dollars"
            name="credittype"
            type="text"
            value={formState.credittype}
            onChange={handleChange}
          />
          <Savebtn type="Submit" onClick={handleFormSubmit}>
            Submit
          </Savebtn>
        </Card>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </Wrapper>
  );
};

export default AddChild;
