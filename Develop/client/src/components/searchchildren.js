import React, { useState, useEffect, useContext, Children } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Tabs from "./tabs";
import Tab from "./tab";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CHILDREN, QUERY_ALL_PARENT_CHORES } from "../utils/queries";
import { REM_CHORE, REM_SINGLE_CHILD } from "../utils/mutations";
import { useParentContext } from "../utils/GlobalState";
// import { useAccountContext, useParentContext, useChildContext } from '../utils/GlobalState';
import Auth from "../utils/auth";
import styled from "styled-components";
import Addchorebtn from "../components/addchorebtn";
import { Link, useParams } from "react-router-dom";


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
  font-size: 1.0em;
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

width:100%;
`;
const ColumnA = styled.col`

width:15%
`;
const ColumnB = styled.col`

width:45%
`;
const ColumnC = styled.col`

width:15%
`;
const ColumnD = styled.col`

width:15%
`;
const ColumnE = styled.col`

width:10%
`;
const TH = styled.th`
padding: 2px;
border-spacing: 2px;
font-family: "Fredericka the Great", cursive;
text-align:center;
color: #538e73;
`;

const TD = styled.td`
padding: 1px;
border-spacing: 2px;
// border: 0.5px solid #538e73ba;
text-align:center;
font-family: "Fredericka the Great", cursive;
`;
const Icon = styled.i`
padding: 5px;
height: 10px;
width 10px; 
`;
const FindChildren = () => {
  
  const { Parent } = useParentContext();
  console.log(Parent);
  const [disable, setDisable] = useState(false);

  const { loading: childload, error: childerror, data: child } = useQuery(QUERY_ALL_CHILDREN, {
    variables: { parentId: Parent._id },
    });
  const { loading: choreload, error: choreerror, data: chores } = useQuery(QUERY_ALL_PARENT_CHORES, {
    variables: { parentId: Parent._id },
    });
  const [delChore, {loading: remchoreload, error: remchoreerr, data: remchore}] = useMutation(REM_CHORE);
  const [delChild, {loading: remchildload, error:remchilderr, data: remchild}] = useMutation(REM_SINGLE_CHILD);

    // const [newChild, setChild] = useState(child);
    // const [newChores, setChores] = useState(chores);
    // useEffect(() => {
    //   if(!choreload && chores) {
    //     setChores(chores);
    //   }
    //   }, [choreload, chores])
    
  if (childload) return null;
  if (childerror) return `Error! ${childerror}`;
  console.log("data",child);
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
                  onClick={e => 
                    {e.preventDefault();
                    delChild({variables: {childId: child._id}})
                    setDisable(true);
                  }}>
                  🗑️
                </span>
                </div>
              <FlexBox>
                
                <div><Text>{child.creditsearned} {child.credittype}</Text></div>
                  <Progress max={child.totalcredits} value={child.creditsearned}></Progress>
                <div><Text>{child.totalcredits} {child.credittype}</Text></div>
                <Regbtn> 
                  <Link type="button" className="button" to={`/Add/Chore/${child.name}`}>
                    Add Chore
                  </Link>
                </Regbtn>
              </FlexBox>
                {chores && (chores.parentchores.map((chore) => (
                <div key = { chore._id }>
                  <Card>
                    <Table>
                      <ColumnA></ColumnA>
                      <ColumnB></ColumnB>
                      <ColumnC></ColumnC>
                      <ColumnD></ColumnD>
                      <ColumnE></ColumnE>
                      <thead>
                        <tr>
                          <TH>Chore</TH>
                          <TH>What needs to be done</TH>
                          <TH>{child.credittype}</TH>
                          <TH>Status?</TH>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <TD>{chore.name}</TD>
                          <TD>{chore.description}</TD>
                          <TD>{chore.numcredits}</TD>
                          <TD>{!chore.status ? (
                              <Text>To Do</Text>
                              ) : (
                              <Text>Chore Done</Text>
                              )} </TD>
                          <TD>
                             <span
                                role="img"
                                aria-label="trash"
                                onClick={e => 
                                  {e.preventDefault();
                                  delChore({variables: {choreId: chore._id}})
                                  setDisable(true);
                                }}>
                                🗑️
                              </span>
                          </TD>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </div>
              )))}
          </div>
            ))}
        </Tabs> 
      </div>
    )}
  </div>
  );
};
export default FindChildren;
