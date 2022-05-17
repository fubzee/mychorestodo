import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

import styled from 'styled-components';


const Savebtn = styled.button`
display: inline-block;
font-family: 'Fredericka the Great', cursive;
border-radius: 5px;
padding: 1em 1em;
margin: 1rem 1rem;
min-width: 6rem;
background: White;
color: #c46137ba;
border: 3px solid White;
font-size: 1em;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
&: hover
background: White;
color: #c46137ba;
border: 3px solid White;
font-size: 1em;
box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
&: click
background: White;
color: #c46137ba;
border: 3px solid White;
font-size: 1em;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
`;
const Card = styled.div`
max-width: 650px;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius: 5px;
overflow: hidden;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
margin: 25px auto;
@media (max-width: 1000px) {
background-color: #FFF8DC;
@media (min-width:220px;
  background-color: white;)
}
`;
const Text = styled.p`
font-family: 'Fredericka the Great', cursive;
padding: 0.5em 1em;
color: #c46137ba;
font-size: 1em;
`;
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  console.log(categoryData);
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
   <Card>
      <Text>What type of cause are you looking to donate to:</Text>
      {console.log('>>',categories)}
        {categories.map((item) => (
            <Savebtn
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}
          >{item.name}
        </Savebtn>
      ))}
    </Card>
  );
}

export default CategoryMenu;
