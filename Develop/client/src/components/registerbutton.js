import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
  padding: 4em;
  background: #FFF8DC;
`;

const Regbtn = styled.button`

  /* Adapt the colors based on state */
    display: inline-block;
    font-family: 'Fredericka the Great', cursive;
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 0.5rem 1rem;
    width: 8rem;
    background: #FFFFF0;
    color: #2F4F4F;
    border: 3px solid #538e73ba;
    font-size: 1em;
`;
function Registerbtn() {
   
return (
    <div>
      <Wrapper>
        <Regbtn>
        <Link 
            type="button"
            // className="button"
            to={`/Register`}>Register
        </Link>
        
        </Regbtn>
      </Wrapper>
    </div>
  );
}

export default Registerbtn;