import React from "react";
import Registration from "../components/register";
import Baseline from "../components/baseline";
import Headline from "../components/headline";
import styled from "styled-components";


const Wrapper = styled.section`
  padding: none;
  background: #fff8dc;
`;
const Picture = styled.picture`
  display: inline-block;
  background: #fff8dc;
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

const Register = () => {
  return (
    <div>
    <Wrapper>
      <Headline {...Headline} />
      <FlexBox>
      <Picture>
        <source srcSet="/main_page_bg02.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg02.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
      <div>
      <Registration {...Registration} />
      </div>
      <Picture>
        <source srcSet="/main_page_bg04.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg04.png"
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

export default Register;
