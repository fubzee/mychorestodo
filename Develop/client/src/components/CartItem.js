import React from 'react';
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
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
const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
   <Wrapper>
      <div>
        <img
          src={`/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <Text>{item.name}, ${item.price}</Text>
        <div>
        <Text>
          <span>Qty:</span>
          <Input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          </Text>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
     
    </Wrapper>
  );
}

export default CartItem;
