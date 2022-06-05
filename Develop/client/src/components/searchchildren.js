import React, { useState, useEffect, useContext, Children } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CHILDREN } from "../utils/queries";
import { useParentContext } from "../utils/GlobalState";
// import { useAccountContext, useParentContext, useChildContext } from '../utils/GlobalState';
import Auth from "../utils/auth";
import styled from "styled-components";

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
const FindChildren = () => {
  
  const { Parent } = useParentContext();
  console.log(Parent);
  // const [getChildren, { error, data }] = useQuery(QUERY_ALL_CHILDREN);
  const { loading, error, data } = useQuery(QUERY_ALL_CHILDREN, {
    variables: { parentId: Parent._id },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("data",data);
  // const { data } = Auth.getUser();
  // console.log("data", data);

  // console.log("ParentContext", Parent);
 
  // const children = getChildren({ variables: { parentId: Parent._id } });
  // console.log(children.data);

  // console.log("children", data.children);
  // console.log(data.children.length);

  return (
    <div>
       <p>Children</p>
            {data && (
              <div>
                {data.children.map((child) => (
                  <div key={child._id}>
                 <Regbtn>{child.name}</Regbtn> 
                  </div>
                ))}
              </div>
            ) 
          }
      </div>
  );
};
export default FindChildren;
