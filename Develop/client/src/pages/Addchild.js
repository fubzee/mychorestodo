import React from "react";
import Baseline from "../components/baseline";
import AddChild from "../components/addchild";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: none;
  background: #fff8dc;
`;
const Picture = styled.picture`
  display: inline-block;
  background: white;
  padding: none;
`;
const FlexBox = styled.div`
padding: none;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
border: none;
justify-content: space-evenly;
align-itmes: stretch;
`;

const AddchildPage = () => {
  return (
    <div>
    <Wrapper>
       <FlexBox>
      <Picture>
        <source srcSet="/main_page_bg03.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg03.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
       <div>
          <AddChild />
          <Baseline {...Baseline} />
        </div>
        </FlexBox>
    </Wrapper>
    </div>
  );
};

export default AddchildPage;
