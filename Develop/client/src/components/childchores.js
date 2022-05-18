import React from "react";
import styled from "styled-components";
import Baseline from "./baseline";
import Headline from "./headline";
// import { Childchores } from './searchchorelist'

const Wrapper = styled.section`
  padding: 2em;
  background: #fff8dc;
`;

const Card = styled.div`
max-width: 200px;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 5px;
overflow: hidden;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
margin: 30px auto;
@media (max-width: 1000px) {
background-color: #FFF8DC;
`;

// Use Title and Wrapper like any other React component – except they're styled!
export default function Childchorelists() {
  return (
    <div>
      {Headline}
      <Wrapper>
        <Card></Card>
      </Wrapper>
      {Baseline}
    </div>
  );
}
