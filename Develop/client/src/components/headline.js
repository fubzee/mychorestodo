import React from 'react';
import styled from 'styled-components';


// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #FFFFF0;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: #FFF8DC;
`;

const Notice = styled.section`
  padding: 6em;
  background: #2F4F4F;
`;
// Use Title and Wrapper like any other React component – except they're styled!
export default function Headline() {
    return (
      <Wrapper>
          <Notice>
            <Title>
                 Chores To Do
            </Title>
          </Notice>
      </Wrapper>
    )
}