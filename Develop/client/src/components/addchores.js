import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import { ADD_CHORE } from "../utils/mutations";
import { QUERY_PARENT_CHILD } from "../utils/mutations";
import { Link } from "react-router-dom";
import Headline from "./headline";
import { useParentContext } from "../utils/GlobalState";

import Auth from "../utils/auth";

const Wrapper = styled.section`
  padding: 4em;
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

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border: none;
  justify-content: space-evenly;
  align-itmes: stretch;
`;

const AddChore = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    num_credits: "",
    repeat: "",
  });
  const { Parent } = useParentContext();

  const [getName, { n_error, n_data }] = useMutation(QUERY_PARENT_CHILD);
  console.log("Parent", Parent);

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
    const numcreditsint = parseInt(formState.num_credits);
    const datecreated = Date();
    try {
      const { data: nameData } = await getName({
        variables: { name: formState.childName },
      });
      for (let i = 0; i < nameData.childname.length; i++) {
        if (nameData.childname[i].parent_Id === Parent._id) {
          const useID = nameData.childname[i]._id;
          const { data: choredata } = await addChore({
            variables: {
              numcredits: numcreditsint,
              status: false,
              datecreated: datecreated,
              datecompleted: "",
              parentId: Parent._id,
              childId: useID,
              ...formState,
            }
          })
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Wrapper>
      <Headline></Headline>
      <FlexBox>
      {data ? (
        <Text>
          Success! You may now head{" "}
          <Link to="/chores/parent">back to the page.</Link>
        </Text>
      ) : (
        <Card>
          <Text>Details about the task</Text>
          <Input
            className="form-input"
            placeholder="Name of Chore/Task"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="Description"
            name="description"
            type="text"
            value={formState.description}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="How many credits"
            name="num_credits"
            type="Number"
            value={formState.num_credits}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="Child"
            name="childName"
            type="text"
            value={formState.childName}
            onChange={handleChange}
          />
          <Input
            className="form-input"
            placeholder="repeat"
            name="repeat"
            type="String"
            value={formState.repeat}
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
      </FlexBox>
    </Wrapper>
  );
};

export default AddChore;
