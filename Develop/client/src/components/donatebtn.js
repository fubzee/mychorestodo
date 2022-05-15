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
  margin: 1rem 1rem;
  width: 6rem;
  background: White;
  color: #2F4F4F;
  border: 3px solid #538e73ba;
  font-size: 1em;
`;
function Donatebtn() {
   
return (
    <div>
      <Wrapper>
        <Regbtn>
        <Link 
            type="button"
            // className="button"
            to={`/Donate`}>Donate
        </Link>
        
        </Regbtn>
      </Wrapper>
    </div>
  );
}

export default Donatebtn;