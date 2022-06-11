import React, { useState, useEffect, useReducer } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_CHILDREN_CHORES } from "../utils/queries";
import { UPDATE_CHORE, UPD_CHILD_CRD, ADD_CHORE } from "../utils/mutations";
import { useChildContext} from "../utils/GlobalState";
import styled from "styled-components";

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
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0.5em 0.5em;
  color: #538e73;
  font-size: 1.5em;
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
  cursor: pointer;
  
  &:hover {
    background-color: #3e8e41;
    color: #fff
  }

 &:active {
   
    background-color: #3e8e41;
    transform: translateY(4px);
  }

  &:after {
 
    cursor: not-allowed;
    box-shadow: none;
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

width:20%
`;
const ColumnD = styled.col`

width:20%
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

const Progress = styled.progress`
height: 30px;
width: 400px;
colour: #538e73ba;
`;
 
const Choreslist = () => {
 
      const { Child } = useChildContext();
      console.log(Child);
      const [creditsearnedcount, setProgress] = useState(Child.creditsearned);
      const [childstate, SetChildState] = useState(Child);
      const { loading: choreloading, error: choreerror, data } = useQuery(QUERY_ALL_CHILDREN_CHORES, {
        variables: { childId: Child._id },
        });

      // const [chorestate, setChoreState] = useState(data);
      console.log(data);
      // useEffect(() => {console.log(chorestate)},[chorestate]);
      const [finChore, { loading: load, error: err, data: chore }] = useMutation(UPDATE_CHORE,{
        refetchQueries: [
          useQuery(QUERY_ALL_CHILDREN_CHORES, {
            variables: { childId: Child._id },
            })
        ]
      });
      const [readdChore, {loading: newaddload, error: newadderror, data: newaddchore}] = useMutation(ADD_CHORE); 
      
      function chkRepeat(chore) {
        if (chore.repeat === "Yes") {
          const datecreated = new Date();
          datecreated.setDate(datecreated.getDate() + 1);
          console.log("Date" , datecreated);
          readdChore({ variables: {
              name: chore.name,
              description: chore.description,
              status: false,
              numcredits: chore.numcredits,
              parentId: chore.parent_Id,
              childId: chore.child_Id,
              repeat: chore.repeat,
              datecreated: datecreated,
              datecompleted: "",
             }})
        }
      }

      const reducer = (state, action) => {
        switch (action.type) {
          case "COMPLETE":
            return state.map((data) => {
              if (data.id === action.id) {
                return {...data, true: !data.status };
              } else {
                return data;
              }
              });
            default:
              return state;
            }
      };

     
      const [, dispatch ] = useReducer(reducer, data);
      const handleComplete = (chore) => {
        dispatch({ status: "True", id: data.id});
      }
    

      function filterChores(choredata) {
        console.log(choredata);
        const dateNow = Date.now();
        console.log(dateNow);
        if (!choredata) {
          return data.childchores;
        }
        return data.childchores.filter(
          ( choredata ) => choredata.datecreated <= dateNow)
      };
       
      const [updChild, { loading: loads, error: errs, data: child}] = useMutation(UPD_CHILD_CRD);
      console.log("creditsearnedcount", creditsearnedcount);
      console.log(child);
      // useEffect(() => {console.log("UseEffect")},[chore, child])
      if (load) return null;
      if (err) return `Error! ${errs}`;
      if (choreloading) return null;
      if (choreerror) return `Error! ${choreerror}`;
      if (loads) return null;
      if (errs) return `Error! ${errs}`;
      if (newaddload) return null;
      if (newadderror) return `Error! ${errs}`;
      console.log("data", data);
      console.log("newaddchore", newaddchore);
      return (
      <div>
        <Text>Hello {Child.name}</Text>
        <FlexBox>
        <div><Text>{creditsearnedcount} {Child.credittype}</Text></div>
        <Progress max={Child.totalcredits} value={creditsearnedcount}></Progress>
        <div><Text>{Child.totalcredits} {Child.credittype}</Text></div>
        </FlexBox>

        {data && filterChores(data).map((chore) => (
        <div key={chore._Id}>
       <Card>
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
                <TD>{!chore.status ? (
                <Regbtn onClick={e => 
                  {
                  chkRepeat(chore)
                  finChore({ variables: {choreId: chore._id, status: true, datecompleted: Date()}})
                  // 
                  handleComplete(chore);
                  setProgress(creditsearnedcount + chore.numcredits);
                  updChild({ variables: {childId: Child._id, creditsearned: creditsearnedcount }})
                  SetChildState(child);
                  }}>
                  {chore.status}Complete
                </Regbtn>
                ) : (
                  <Icon> 
                  <img src="/check.png" alt="task done" ></img></Icon>
                )}</TD>
              </tr>
              </tbody>
           </Table>
        </Card>
        </div>
         ))}
      </div>
    );
};
export default Choreslist;
