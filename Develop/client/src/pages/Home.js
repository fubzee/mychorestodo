import React from "react";
import Headline from "../components/headline";
import LoginForm from "../components/login";
import Registerbtn from "../components/registerbutton";
import styled from "styled-components";

const Picture = styled.picture`
display: inline-block;
padding: 1.0em;
max-width: 300px;
max-height 300px:
`;

const Home = () => {
  return (
    <div>
      <div>
        <Headline {...Headline} />
      </div>
      <Registerbtn />
      <LoginForm />
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
    </div>
  );
};

export default Home;
