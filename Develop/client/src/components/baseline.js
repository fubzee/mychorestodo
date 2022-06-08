import React from "react";
import styled from "styled-components";
import Logoutbtn from "./logoutbtn";
import Donatebtn from "./donatebtn";
import Backbtn from "./backbtn";
import Addchildbtn from "../components/addchildbtn";

const Wrapper = styled.section`
  padding: none;
  background: #fff8dc;
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
          <Addchildbtn />
      </div>
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
