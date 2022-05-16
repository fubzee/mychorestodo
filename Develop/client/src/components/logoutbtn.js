import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Regbtn = styled.button`

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
function Logoutbtn() {
   
return (
    <div>
    <Regbtn>
        <Link 
            type="button"
            className="button"
            to={`/`}>Logout
        </Link>
    </Regbtn>
    </div>
  );
}

export default Logoutbtn;