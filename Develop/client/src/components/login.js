import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_SINGLE_PARENT } from "../utils/mutations";
import { QUERY_SINGLE_CHILD } from "../utils/mutations";
import {
  useUserContext,
  useParentContext,
  useChildContext,
} from "../utils/GlobalState";

const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;
const Savebtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
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
  font-family: "Fredericka the Great", cursive;
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

const LoginForm = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [getParent, { error: p_error, data: p_data }] =
    useMutation(QUERY_SINGLE_PARENT);
  const [getChild, { error: c_error, data: c_data }] =
    useMutation(QUERY_SINGLE_CHILD);
  const { setParent } = useParentContext();
  const { setChild } = useChildContext();
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("at try");
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      const token = data.login.token;
      Auth.login(data.login.token);
      console.log(token);
          
      if (data.login.user.usertype === "Parent") {
        try {
          const { data: parentData } = await getParent({
            variables: { userId: data.login.user._id },
          });

          setParent(parentData.getParent);
          navigate("/Add/Chores/Parent/");
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const { data: childData } = await getChild({
            variables: { userId: data.login.user._id },
          });

          setChild(childData.getChild);
          navigate("/Mychores/");
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <Wrapper>
        <Card>
          <Input
            value={formState.username}
            name="username"
            onChange={handleInput}
            type="text"
            placeholder="User Name"
          />
          <Input
            value={formState.password}
            name="password"
            onChange={handleInput}
            type="password"
            placeholder="********"
          />
          <Savebtn type="button" onClick={handleFormSubmit}>
            Log In
          </Savebtn>
        </Card>
      </Wrapper>
    </div>
  );
};

export default LoginForm;
