import React from "react";
import styled from "styled-components";
import Addchildbtn from "../components/addchildbtn";
import Addchorebtn from "../components/addchorebtn";
import Headline from "../components/headline";

// import Choreslist from './searchchorelist';
import FindChildren from "../components/searchchildren";

// Create a Title component that'll render an <h1> tag with some styles
const Wrapper = styled.section`
  padding: 0.5em;
  background: #fff8dc;
`;

const Picture = styled.picture`
  display: inline-block;
  background: white;
  padding: 1em;
`;

// Use Title and Wrapper like any other React component – except they're styled!
export default function Parentchores() {
  return (
    <div>
      <Headline />
      <Picture>
        <source srcSet="/main_page_bg01.png" type="image/svg+xml"></source>
        <img
          src="/public/main_page_bg01.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
      <Addchildbtn />
      <Addchorebtn />
      {/* <FindChildren /> */}
    </div>
  );
}
