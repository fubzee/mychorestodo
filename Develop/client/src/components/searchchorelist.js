import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CHILDREN_CHORES } from "../utils/queries";
import { useChildContext} from "../utils/GlobalState";
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
  max-width: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin: auto auto;
  @media (max-width: 1000px) {
    background-color: #fff8dc;
  }
`;
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0.5em 1em;
  color: #538e73;
  font-size: 2em;
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
const Regbtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5rem 1rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  width: 8rem;
  background: #fffff0;
  color: #2f4f4f;
  border: 3px solid #538e73ba;
  font-size: 1em;
`;
const Table = styled.table`

width:100%;
`;
const ColumnA = styled.col`

width=15%
`;
const ColumnB = styled.col`

width=45%
`;
const ColumnC = styled.col`

width=20%
`;
const ColumnD = styled.col`

width=20%
`;
const TH = styled.th`
padding: 10px;
font-family: "Fredericka the Great", cursive;
text-align:center;
color: #538e73;
`;

const TD = styled.td`
padding: 10px;
border: 0.5px solid #538e73ba;
text-align:center;
font-family: "Fredericka the Great", cursive;
`;
const Choreslist = () => {
 
    const { Child } = useChildContext();
    console.log(Child);
    // const [chores, setChores] = useState([]);
    // useEffect(() => {
    //   Choreslist();
    // }, []);

  
      console.log(Child);
      const { loading, error, data } = useQuery(QUERY_ALL_CHILDREN_CHORES, {
      variables: { childId: Child._id },
      });
      if (loading) return null;
      if (error) return `Error! ${error}`;
      console.log("data", data);
      // setChores(data);
      return (
      <div>
        <Text>Hello {Child.name}</Text>
        <Card>
            {data && (
                data.childchores.map((chore) => (
                  <div key={chore._Id}>
            <Table>
            <ColumnA></ColumnA>
            <ColumnB></ColumnB>
            <ColumnC></ColumnC>
            <ColumnD></ColumnD>
          <thead>
            <tr>
              <TH>Chore</TH>
              <TH>What needs to be done</TH>
              <TH>{Child.credittype}</TH>
              <TH>Completed?</TH>
            </tr>
          </thead>
            <tbody>
              <tr>
              <TD>{chore.name}</TD>
              <TD>{chore.description}</TD>
              <TD>{chore.numcredits}</TD>
              <Regbtn>{chore.status}Completed</Regbtn>
              </tr>
              </tbody>
              </Table>
            </div>
            )))}
         </Card>
        </div>
    );
};
export default Choreslist;
