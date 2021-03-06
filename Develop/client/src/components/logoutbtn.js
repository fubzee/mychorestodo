import React from "react";
import styled from "styled-components";
import Auth from "../utils/auth";

const Regbtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5rem 1rem;
  width: 8rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  background: #fffff0;
  color: #2f4f4f;
  border: 3px solid #538e73ba;
  font-size: 1em;
  position: static;
  bottom: 0;
  lect: 0;
`;

function Logoutbtn() {
    
  return (
    <div>
      <Regbtn onClick={e => 
      {
        e.preventDefault()
        Auth.logout()
      }} >
        Logout
    </Regbtn>
    </div>
  );
}

export default Logoutbtn;
