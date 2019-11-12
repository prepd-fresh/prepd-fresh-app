import React from "react";
import { Text, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { toggleCartVisibility } from "../actions";
import styled from "styled-components/native";

const NavMenu = () => {
  const dispatch = useDispatch();
  const handleCheckoutPanelToggle = () => {
    dispatch(toggleCartVisibility());
    Keyboard.dismiss();
  };

  return (
    <NavBarView>
      <Text>Prep'd Fresh</Text>
      <CartButton title="CART" onPress={handleCheckoutPanelToggle} />
    </NavBarView>
  );
};

const NavBarView = styled.View`
  background-color: #fff;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  padding-top: 40px;
  z-index: 9999;
`;

const CartButton = styled.Button`
  flex: 0 0 20px;
`;

export default NavMenu;
