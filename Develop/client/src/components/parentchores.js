import React from 'react';
import styled from 'styled-components';
import Addchildbtn from './addchildbtn';
import Addchorebtn from './addchorebtn';
import Headline from './headline';
import Choreslist from './searchchorelist';


// Create a Title component that'll render an <h1> tag with some styles
const Wrapper = styled.section`
padding: 4em;
background: #FFF8DC;
`;
const Savebtn = styled.button`
display: inline-block;
font-family: 'Fredericka the Great', cursive;
border-radius: 3px;
padding: 0.25em 1em;
margin: 1rem 1rem;
width: 6rem;
background: White;
color: #2F4F4F;
border: 3px solid #538e73ba;
font-size: 1em;
`;
const Input = styled.input`
display: inline-block;
border-radius: 3px;
padding: 0.25em 1em;
margin: 0.5rem 1rem;
width: 8rem;
background: White;
color: #2F4F4F;
border: 3px solid #538e73ba;
font-size: 1em;
`;
const Card = styled.div`
max-width: 200px;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 5px;
overflow: hidden;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
margin: 30px auto;
@media (max-width: 1000px) {
background-color: #FFF8DC;
}
`;
const Text = styled.p`
font-family: 'Fredericka the Great', cursive;
padding: 0.5em 1em;
color: #2F4F4F;
font-size: 1em;
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