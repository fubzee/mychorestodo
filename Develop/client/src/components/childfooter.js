import React from "react";
import styled from "styled-components";
import Logoutbtn from "./logoutbtn";


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
function Childfooter() {
  return (
    <Wrapper>
      <FlexBox>
        <div>
          <Logoutbtn />
        </div>
        <div>
        
        
        </div>
        <div>
        
        </div>
      </FlexBox>
    </Wrapper>
  );
}

export default Childfooter;
