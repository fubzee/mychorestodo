import React, { useState, useEffect, useContext } from "react";
// import ResultList  from './resultlist';
import { useMutation } from "@apollo/client";
import { QUERY_ALL_CHILDREN } from "../utils/mutations";
import { useParentContext } from "../utils/GlobalState";
// import { useAccountContext, useParentContext, useChildContext } from '../utils/GlobalState';
import Auth from "../utils/auth";

const FindChildren = () => {
  const { Parent } = useParentContext();
  const { data } = Auth.getUser();
  console.log("data", data);

  console.log("ParentContext", Parent);
  // const { loading, error, data } = useQuery(QUERY_ALL_CHILDREN)
  const [getChildren, { error, c_data }] = useMutation(QUERY_ALL_CHILDREN);
  const { children } = getChildren({ variables: { parentId: Parent._id } });
  console.log({ children });

  return (
    <div className="App">
      <header className="App-header">
        {children ? (
          <p>Children</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {c_data.children.map((children) => {
              return (
                <p>
                  {children._.id} {children.name}
                </p>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
};
export default FindChildren;
