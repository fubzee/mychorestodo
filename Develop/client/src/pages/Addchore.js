import React from "react";
import Baseline from "../components/baseline";
import AddChore from "../components/addchores";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;

const Picture = styled.picture`
  display: inline-block;
  background:#fff8dc;
  padding: none;
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

const AddchorePage = () => {
  return (
    <div>
      <Wrapper>
      <FlexBox>
      <AddChore />
      <Picture>
        <source srcSet="/main_page_bg05.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg05.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
      </FlexBox>
      <Baseline {...Baseline} />
      </Wrapper>
    </div>
  );
};

export default AddchorePage;
