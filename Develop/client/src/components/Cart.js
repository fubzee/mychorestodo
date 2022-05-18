import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "./CartItem";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";

import styled from "styled-components";

const Wrapper = styled.section`
  padding: 4em;
  background: #fff8dc;
`;
const Savebtn = styled.button`
  display: inline-block;
  font-family: "Fredericka the Great", cursive;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 1rem 1rem;
  width: 6rem;
  background: White;
  color: #2f4f4f;
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
  color: #2f4f4f;
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
    background-color: #fff8dc;
  }
`;
const Text = styled.p`
  font-family: "Fredericka the Great", cursive;
  padding: 0.5em 1em;
  color: #2f4f4f;
  font-size: 1em;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: left;
  border: none;
`;
const stripePromise = loadStripe(
  "pk_test_51L0PLVBkde7Q0covUcgYGHana8AkzvvcMZ0VcZIj5QYxi4GG4LeQWM36wZUsxmVKPgZht0uRbYe3bAZ85eK9AnxW0004uFWYTx"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ id: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
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
    console.log(state.cart);
    console.log(productIds);

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
    <Wrapper>
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <Text>Shopping Cart</Text>
      {state.cart.length ? (
        <FlexBox>
          {state.cart.map((item) => (
            // <Card>
            <FlexBox>
              <CartItem key={item._id} item={item} />
            </FlexBox>
            // </Card>
          ))}

          <Card>
            <Text>
              <strong>Total: ${calculateTotal()}</strong>
            </Text>

            {Auth.loggedIn() ? (
              <Savebtn type="Submit" onClick={submitCheckout}>
                Checkout
              </Savebtn>
            ) : (
              <span>(log in to check out)</span>
            )}
          </Card>
        </FlexBox>
      ) : (
        <Text>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </Text>
      )}
    </Wrapper>
  );
};

export default Cart;
