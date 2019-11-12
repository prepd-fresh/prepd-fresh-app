import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components/native";

const Cart = ({ cartItems }) => (
  <CartView>
    {Object.keys(cartItems)
      .sort()
      .map(itemId => (
        <CartItem key={itemId} cartItem={cartItems[itemId]} />
      ))}
  </CartView>
);

const CartView = styled.View`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  margin: 10px 0;
`;

export default Cart;
