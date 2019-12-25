import React from "react";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CartStatuses } from "../actions";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components/native";

const Checkout = ({ cartIsVisible, nextWeekdayDate }) => {
  const cartItems = useSelector(state => ({ ...state.cart }));
  const totalPrice = Object.keys(cartItems)
    .reduce(
      (total, itemId) =>
        (cartItems[itemId].itemPrice * 100 * cartItems[itemId].qty +
          total * 100) /
        100,
      0
    )
    .toFixed(2);
  const showCheckoutWebView = () =>
    !(cartStatus === CartStatuses.DEFAULT && totalPrice == 0);
  const showCheckoutInfo = () =>
    showCheckoutWebView() &&
    ![CartStatuses.SUCCESS, CartStatuses.PROCESSING].includes(cartStatus);
  const cartStatus = useSelector(state => state.cartStatus);
  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        backgroundColor: "#FAF8F4",
        display: cartIsVisible ? "flex" : "none"
      }}
    >
      <Heading2>Checkout</Heading2>
      {showCheckoutInfo() && (
        <React.Fragment>
          <Cart cartItems={cartItems} />
          <TotalView>
            <Text>Total ${totalPrice}</Text>
          </TotalView>
          <Text>
            *Meals are delivered every Sunday. The next delivery date is{" "}
            {nextWeekdayDate(7)}.
          </Text>
        </React.Fragment>
      )}
      {showCheckoutWebView() ? (
        <CheckoutForm
          cartStatus={cartStatus}
          totalPrice={totalPrice}
          cartItems={cartItems}
        />
      ) : (
        <Text>No items in your cart.</Text>
      )}
    </KeyboardAwareScrollView>
  );
};

const TotalView = styled.View`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  margin: 10px 0;
  max-width: 100%;
  height: 50px;
`;

const Heading2 = styled.Text`
  color: #3e444b;
  font-size: 30px;
  font-weight: bold;
  max-width: 100%;
`;

export default Checkout;
