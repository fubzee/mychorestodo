import React, { useState, useEffect, useContext, Children } from "react";
import Tabs from "./tabs";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CHILDREN, QUERY_ALL_PARENT_CHORES } from "../utils/queries";
import { REM_CHORE, REM_SINGLE_CHILD } from "../utils/mutations";
import { useParentContext } from "../utils/GlobalState";
import styled from "styled-components";
import { Link } from "react-router-dom";
const dayjs = require ('dayjs'); 
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
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border: none;
  justify-content: space-evenly;
  align-itmes: stretch;
`;
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0.5em 0.5em;
  color: #538e73;
  font-size: 1em;
`;
const Progress = styled.progress`
  height: 30px;
  width: 400px;
  colour: #538e73ba;
`;
const Card = styled.div`
  max-width: auto;
  padding 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin: auto auto;
  @media (max-width: 1000px) {
    background-color: #fff8dc;
  }
`;
const Table = styled.table`
  width: 100%;
`;
const ColumnA = styled.col`
  width: 15%;
`;
const ColumnB = styled.col`
  width: 40%;
`;
const ColumnC = styled.col`
  width: 15%;
`;
const ColumnD = styled.col`
  width: 5%;
`;
const ColumnE = styled.col`
  width: 5%;
`;
const ColumnF = styled.col`
  width: 15%;
`;
const ColumnG = styled.col`
  width: 5%;
`;
const TH = styled.th`
  padding: 2px;
  border-spacing: 2px;
  font-family: "Fredericka the Great", cursive;
  text-align: center;
  color: #538e73;
`;

const TD = styled.td`
  padding: 1px;
  border-spacing: 2px;
  // border: 0.5px solid #538e73ba;
  text-align: center;
  font-family: "Fredericka the Great", cursive;
`;

const FindChildren = () => {
  const { Parent } = useParentContext();
  console.log(Parent);
  const [disable, setDisable] = useState(false);

  const {
    loading: childload,
    error: childerror,
    data: child,
  } = useQuery(QUERY_ALL_CHILDREN, {
    variables: { parentId: Parent._id },
  });
  const {
    loading: choreload,
    error: choreerror,
    data: chores,
  } = useQuery(QUERY_ALL_PARENT_CHORES, {
    variables: { parentId: Parent._id },
  });
  const [
    delChore,
    { loading: remchoreload, error: remchoreerr, data: remchore },
  ] = useMutation(REM_CHORE);
  const [
    delChild,
    { loading: remchildload, error: remchilderr, data: remchild },
  ] = useMutation(REM_SINGLE_CHILD);
  // const [chorestate, setChoreState] = useState(chores);
  
  const [newChore, setChore] = useState(chores);
  
  const addChore = () => {
    setChore((chore) => [...chore,]);
  }
  // useEffect(() => {
  // },[child, chores]
  // );

  

  function filterChores(currentChild) {
    console.log(currentChild);
    if (!currentChild) {
      return chores.parentchores;
    }
    return chores.parentchores.filter(
      ( chores ) => chores.child_Id === currentChild
   
     );
  }


  // const [newChild, setChild] = useState(child);
  // const [newChores, setChores] = useState(chores);
  // useEffect(() => {
  //   if(!choreload && chores) {
  //     setChores(chores);
  //   }
  //   }, [choreload, chores])

  if (childload) return null;
  if (childerror) return `Error! ${childerror}`;
  console.log("data", child);
  if (choreload) return null;
  if (choreerror) return `Err! ${choreerror}`;
  console.log("data", chores);

  return (
    <div>
      {child && (
        <div>
          <Tabs>
            {child.children.map((child) => (
              <div className="label" key={child._id} label={child.name}>
               
                <div>

                  <span
                    role="img"
                    aria-label="trash"
                    onClick={(e) => {
                      e.preventDefault();
                      delChild({ variables: { childId: child._id } });
                      setDisable(true);
                    }}
                  >
                    🗑️
                  </span>
                  <FlexBox>
                    <div>
                      <Text>
                        {child.creditsearned} {child.credittype}
                      </Text>
                    </div>
                    <Progress
                      max={child.totalcredits}
                      value={child.creditsearned}
                    ></Progress>
                    <div>
                      <Text>
                        {child.totalcredits} {child.credittype}
                      </Text>
                    </div>
                    <Regbtn onClick={e => {
                      setChore()
                    }>
                      <Link
                        type="button"
                        className="button"
                        to={`/Add/Chore/${child.name}`}
                      >
                        Add Chore
                      </Link>
                    </Regbtn>
                  </FlexBox>
                  {chores && filterChores(child._id).map((chore) => (
                  <div key={chore._id}>
                  <Card>
                    <Table>
                      <ColumnA></ColumnA>
                      <ColumnB></ColumnB>
                      <ColumnC></ColumnC>
                      <ColumnD></ColumnD>
                      <ColumnE></ColumnE>
                      <ColumnF></ColumnF>
                      <ColumnG></ColumnG>
                      <thead>
                        <tr>
                          <TH>Chore</TH>
                          <TH>What needs to be done</TH>
                          <TH>Date</TH>
                          <TH>Repeat</TH>
                          <TH>{child.credittype}</TH>
                          <TH>Completed</TH>
                          <TH>Status?</TH>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <TD>{chore.name}</TD>
                          <TD>{chore.description}</TD>
                          <TD>{!chore.datecreated ? (
                          <Text> </Text> 
                          ) : (dayjs(chore.datecreated/1).format("DD-MM-YYYY"))} 
                          </TD>                         
                          <TD>{chore.repeat}</TD>
                          <TD>{chore.numcredits}</TD>
                          <TD>{!chore.datecompleted ? (<Text> </Text>) 
                          : (dayjs(chore.datecompleted/1).format("DD-MM-YYYY"))}</TD>
                          <TD>
                            {!chore.status ? (
                              <Text>To Do</Text>
                            ) : (
                              <Text>Chore Done</Text>
                            )}
                          </TD>
                          <TD>
                            <span
                              role="img"
                              aria-label="trash"
                              onClick={(e) => {
                                e.preventDefault();
                                delChore({
                                  variables: { choreId: chore._id },
                                });
                                setDisable(true);
                              }}
                            >
                              🗑️
                            </span>
                          </TD>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </div>
              ))}
            </div>
            </div>
          ))}
        </Tabs>
        </div>
      )}
    </div>
  );
};
export default FindChildren;
