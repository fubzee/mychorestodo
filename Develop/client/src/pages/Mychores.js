import React from "react";
import Baseline from "../components/baseline";
// import ResultList  from '../components/resultlist';
import Headline from "../components/headline";
import Chorelist from "../components/searchchorelist";
import styled from "styled-components";

// background: #fff8dc;
const Picture = styled.picture`
  display: inline-block;
  background: white;
  padding: 1em;
`;

const MyChores = () => {
  return (
    <div>
      <Headline {...Headline} />
      <Picture>
        <source srcSet="/childpage_kid.png" type="image/svg+xml"></source>
        <img
          src="/public/childpage_kid.png"
          className=" img-homepage"
          alt="cleaning_chores"
        ></img>
      </Picture>
      {/* <Chorelist
        {...Chorelist}
        /> */}
      <Baseline {...Baseline} />
    </div>
  );
};

export default MyChores;
