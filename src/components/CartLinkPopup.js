import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const CartLinkPopup = ({
  qtyOfItems,
  total,
  openCart,
  cartIsNotVisible,
  cartItemsExist
}) => (
  <StyledTouchableOpacity
    {...{ cartIsNotVisible, cartItemsExist }}
    onPress={openCart}
  >
    <View>
      <WhiteText>{`${qtyOfItems} ${
        qtyOfItems > 1 ? "items" : "item"
      } | $${total}`}</WhiteText>
    </View>
    <View>
      <WhiteText>View Cart </WhiteText>
    </View>
  </StyledTouchableOpacity>
);

const WhiteText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  flex-direction: row;
  background-color: orange;
  bottom: 40px;
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  border-radius: 1000px;
  padding: 20px;
  color: #fff;
  width: 320px;
  max-width: 100%;
  display: ${({ cartIsNotVisible, cartItemsExist }) =>
    cartIsNotVisible && cartItemsExist ? "flex" : "none"};
  justify-content: space-between;
  align-self: center;
  z-index: 999;
`;

export default CartLinkPopup;
