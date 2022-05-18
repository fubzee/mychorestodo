import React from "react";
import styled from "styled-components";
import Logoutbtn from "./logoutbtn";
import Donatebtn from "./donatebtn";
import Backbtn from "./backbtn";

const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: none;
`;
// const
function Baseline() {
  return (
    <Wrapper>
      <FlexBox>
        <div>
          <Logoutbtn />
        </div>
        <div>
          <Backbtn />
        </div>
        <div>
          <Donatebtn />
        </div>
      </FlexBox>
    </Wrapper>
  );
}

export default Baseline;
