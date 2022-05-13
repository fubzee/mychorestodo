import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
  padding: 4em;
  background: #FFF8DC;
`;

const Regbtn = styled.button`

  /* Adapt the colors based on state */
  background:  #FFF8DC;
  color: # 000;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #000;
  border-radius: 3px;
`;
function Registerbtn() {
   
return (
    <div>
      <Wrapper>
        <Regbtn>
        <Link 
            type="button"
            className="button"
            to={`/Register`}>Register
        </Link>
        
        </Regbtn>
      </Wrapper>
    </div>
  );
}

export default Registerbtn;