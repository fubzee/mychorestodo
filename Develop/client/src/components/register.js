import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { ADD_PARENT } from "../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Wrapper = styled.section`
  padding: none;
  background: #fff8dc;
`;
const Savebtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
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
  padding: 0.25em 1em;
  margin: 0.5rem 1rem;
  width: 8rem;
  background: White;
  color: #2f4f4f;
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
    background-color: #fff8dc;
  }
`;
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0.5em 1em;
  color: #2f4f4f;
  font-size: 1em;
`;

const Picture = styled.picture`
  display: inline-block;
  background: white;
  padding: none;
`;
const FlexBox = styled.div`
padding: none;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
border: none;
justify-content: space-evenly;
align-itmes: stretch;
`;

const Registration = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    hint: "",
    name: "",
    email: "",
    chart: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [addParent, { err1, data1 }] = useMutation(ADD_PARENT);
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
      const { data } = await addUser({
        variables: { usertype: "Parent", ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
      console.log(data.addUser._id);
      await addParent({
        variables: { userId: data.addUser._id, ...formState },
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Wrapper>
      {data ? (
        <Text>
          Welcome, you have successfully registered{" "}
          <Link to="/">
            Please head back to the login page and login to start adding some
            chores to do.
          </Link>
        </Text>
      ) : (
        <Card onSubmit={handleFormSubmit}>
          <Text>Registration Details</Text>
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
            placeholder="eMail"
            name="email"
            type="text"
            value={formState.email}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.username}
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
            placeholder="Password Hint"
            name="hint"
            type="text"
            value={formState.hint}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="Chart Name"
            name="chart"
            type="text"
            value={formState.chart}
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

export default Registration;
