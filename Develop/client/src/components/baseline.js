import React from 'react';
import styled from 'styled-components';
import Logoutbtn from './logoutbtn';
import Donatebtn from './donatebtn';

const Wrapper = styled.section`
  padding: 1em;
  background: #FFF8DC;
`;

function Baseline() {
   
return (
    <Wrapper>
      <Logoutbtn />
      <Donatebtn />
    </Wrapper>
  );
}

export default Baseline;