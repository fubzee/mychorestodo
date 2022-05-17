import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import styled from 'styled-components';

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
min-width: 6rem;
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
font-family: 'Fredericka the Great', cursive
padding: 0.5em 1em;
color: #2F4F4F;
font-size: 1em;
`;

const FlexBox = styled.div`
display: flex;
align-items: center;
border:none;
`;

const H1 = styled.h1`
font-family: 'Fredericka the Great', cursive
padding: 0.5em 1em;
color:  #538e73ba;
font-size: 3em;
`;

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <Wrapper>
     
      <H1>Deserving Charities:</H1>
     
     
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <Text>You haven't selected a charity yet!</Text>
      )}
      {loading ? <img src="./spinner.gif" alt="loading" /> : null}
    </Wrapper>
  );
}

export default ProductList;
