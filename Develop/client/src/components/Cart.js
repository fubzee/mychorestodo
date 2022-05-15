import React, { useEffect } from 'react';
// import { styled } from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from './CartItem';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


// const Wrapper = styled.section`
// padding: 4em;
// background: #FFF8DC;
// `;
// const Savebtn = styled.button`
// display: inline-block;
// font-family: 'Fredericka the Great', cursive;
// border-radius: 3px;
// padding: 0.25em 1em;
// margin: 1rem 1rem;
// width: 6rem;
// background: White;
// color: #2F4F4F;
// border: 3px solid #538e73ba;
// font-size: 1em;
// `;
// const Input = styled.input`
// display: inline-block;
// border-radius: 3px;
// padding: 0.25em 1em;
// margin: 0.5rem 1rem;
// width: 8rem;
// background: White;
// color: #2F4F4F;
// border: 3px solid #538e73ba;
// font-size: 1em;
// `;
// const Card = styled.div`
// max-width: 200px;
// border: 1px solid rgba(0, 0, 0, 0.1);
// border-radius: 5px;
// overflow: hidden;
// box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
// margin: 30px auto;
// @media (max-width: 1000px) {
// background-color: #FFF8DC;
// `;

// const Text = styled.p`
// font-family: 'Fredericka the Great', cursive;
// padding: 0.5em 1em;
// color: #2F4F4F;
// font-size: 1em;
// `;

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }


  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
