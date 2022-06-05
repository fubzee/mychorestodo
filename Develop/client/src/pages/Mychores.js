import React from "react";
import Childfooter from "../components/childfooter";
// import ResultList  from '../components/resultlist';
import Headline from "../components/headline";
import Choreslist from "../components/searchchorelist";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: none;
  background: #fff8dc;
`;
const Picture = styled.picture`
  display: inline-block;
  background: #fff8dc;
  padding: 1em;
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
const MyChores = () => {
  return (
    <div>
      <Wrapper>
        <Headline {...Headline}></Headline>

        <FlexBox>
          <Picture>
            <source srcSet="/childpage_kid.png" type="image/svg+xml"></source>
            <img
              src="/public/childpage_kid.png"
              className=" img-homepage"
              alt="cleaning_chores"
            ></img>
          </Picture>
         
          <div>
             <Choreslist />
         </div>
         </FlexBox>

        <Childfooter {...Childfooter} />
      </Wrapper>
    </div>
  );
};

export default MyChores;
