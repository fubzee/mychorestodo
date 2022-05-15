import React from 'react';
import styled from 'styled-components';



// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
font-family: 'Fredericka the Great', cursive; 
font-size: 75px;
font-weight:900;
color: #FFFFF0;
border: 3px solid #538e73ba;
background-color: #2F4F4F;
border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px;
width: 90%;
height: 110%;
text-align: center;
text-shadow: 3px 3px #d48011d7;
margin: auto;

`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 2em;
  background: #FFF8DC;
`;

// Use Title and Wrapper like any other React component – except they're styled!
export default function Headline() {
    return (
      <div>
        <Wrapper>
          <Title>
            Chores To Do
          </Title>
        </Wrapper>
      </div>
    )
}