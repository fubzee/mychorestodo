import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
  padding: 0.5em;
  background: #FFF8DC;
`;

const ImgCard = styled.div`
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
max-width: 200px;
background-color: #FFF8DC;
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
        <Card>
          <Regbtn>  
            <Link 
              type="button"
              // className="button"
              to={`/Register`}>Register
            </Link>
          </Regbtn>
        </Card>
      </Wrapper>
    </div>
  );
}

export default Registerbtn;