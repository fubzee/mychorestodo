import React from 'react';
import styled from 'styled-components';
import Addchildbtn from './addchildbtn';
import Addchorebtn from './addchorebtn';
import Headline from './headline';
// import Choreslist from './searchchorelist';


// Create a Title component that'll render an <h1> tag with some styles
const Wrapper = styled.section`
padding: 4em;
background: #FFF8DC;
`;

// Use Title and Wrapper like any other React component – except they're styled!
export default function Parentchores() {
    return (
      <div>
        <Wrapper>
            <Headline />
            <Addchildbtn />
            <Addchorebtn />
            {/* <Choreslist /> */}
        </Wrapper> 
      </div>
    )
}