import React from "react";
import Headline from "../components/headline";
import LoginForm from "../components/login";
import Registerbtn from "../components/registerbutton";
import styled from "styled-components";

const Picture = styled.picture`
display: inline-block;
background: #fff8dc;
padding: none;
max-width: 300px;
max-height 300px:
`;
const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border: none;
  justify-content: space-evenly;
  
`;
const Home = () => {
  return (
    <Wrapper>
      <div>
        <Headline {...Headline} />
      </div>
      <Registerbtn />
      <LoginForm />
      <FlexBox>
      <Picture>
        <source srcSet="/main_page_bg01.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg01.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
      <Picture>
        <source srcSet="/main_page_bg02.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg02.png"
          className=" img-homepage"
          alt="bin_chores"
        ></img>
      </Picture>
      <Picture>
        <source srcSet="/main_page_bg03.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg03.png"
          className=" img-homepage"
          alt="bin_chores"
        ></img>
      </Picture>
      <Picture>
        <source srcSet="/main_page_bg04.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg04.png"
          className=" img-homepage"
          alt="bin_chores"
        ></img>
      </Picture>
      </FlexBox>
    </Wrapper>
  );
};

export default Home;
