import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Regbtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0.5rem 1rem;
  width: 8rem;
  background: #fffff0;
  color: #2f4f4f;
  border: 3px solid #538e73ba;
  font-size: 1em;
`;
function Addchorebtn() {
  return (
    <div>
      <Regbtn>
        <Link type="button" className="button" to={`/Add/Chore`}>
          Add Chore
        </Link>
      </Regbtn>
    </div>
  );
};

export default Addchorebtn;
