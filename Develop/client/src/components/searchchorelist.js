import React, { useState, useEffect } from "react";
// import ResultList  from './resultlist';
import { useMutation } from "@apollo/client";
import { QUERY_ALL_PARENT_CHORES } from "../utils/mutations";
import { QUERY_ALL_CHILDREN_CHORES } from "../utils/mutations";
import {
  useAccountContext,
  useParentContext,
  useChildContext,
} from "../utils/GlobalState";
import Auth from "../utils/auth";

import styled from "styled-components";

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
const Choreslist = () => {
  // const [results, setResults] = useState('');
  const [getParentChores, { error: p_error, data: p_data }] = useMutation(
    QUERY_ALL_PARENT_CHORES
  );
  const [getChildChores, { error: c_error, data: c_data }] = useMutation(
    QUERY_ALL_CHILDREN_CHORES
  );
  let results = " ";
  const { Parent } = useParentContext();
  const { Child } = useChildContext();
  // const { state } = useAccountContext();
  const { data } = Auth.getUser();
  console.log("data", data);

  console.log("usertype", data.usertype);
  if (data.usertype === "Parent") {
    console.log("Parent Case");
    try {
      const { Parentchores } = getParentChores({
        variables: { parentId: Parent._id },
      });
      // setResults(results, Parentchores)
      results = Parentchores;
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("Child Case", Child);
    try {
      const { childchores } = getChildChores({
        variables: { childId: Child._id },
      });
      console.log(c_data);

      results = childchores;
    } catch (e) {
      console.error(e);
    }
  }
  const ChoreList = async (e) => {
    e.preventDefault();
    return (
      <div>
        const {results}
        <Card>
          <Text>Chores</Text>
          <hr />
          {results &&
            results.map((results) => {
              return (
                <table>
                  <tr>
                    <td>{results._id}</td>
                    <td>
                      <p key={results._id}>{results.name}</p>
                    </td>
                  </tr>
                </table>
              );
            })}
        </Card>
      </div>
    );
  };
};

export default Choreslist;
