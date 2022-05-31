import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

function Addchildbtn() {
  return (
    <div>
      <Regbtn>
        <Link type="button" className="button" to={`/Add/Child`}>
          Add Child
        </Link>
      </Regbtn>
    </div>
  )
}

export default Addchildbtn;
