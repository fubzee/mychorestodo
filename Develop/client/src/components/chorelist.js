import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CHILDREN_CHORES } from '../utils/queries';
import { Link } from 'react-router-dom';


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
const Chorelist = () => {
 
    const [getChore, { error, data }] = useQuery(QUERY_ALL_CHILDREN_CHORES);

    return (
      <Wrapper>
        <p>
         [{data.Childchores}]
        </p>
      </Wrapper>
    );
  };
  
  export default Chorelist;
  
