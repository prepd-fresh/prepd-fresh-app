import React from "react";
import { Image, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { toggleCartVisibility } from "../actions";
import styled from "styled-components/native";

const NavMenu = ({ cartIsVisible }) => {
  const dispatch = useDispatch();
  const handleCheckoutPanelToggle = () => {
    dispatch(toggleCartVisibility());
    Keyboard.dismiss();
  };

  return (
    <NavBarView>
      <LogoWrapper
        resizeMode="contain"
        resizeMethod="scale"
        source={require("../../assets/cropped-logo-small.png")}
      />
      <CartButton
        title={cartIsVisible ? "BACK" : "CART"}
        onPress={handleCheckoutPanelToggle}
        color="#fa9600"
      />
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

const LogoWrapper = styled.Image`
  border-radius: 5px;
  ${"" /* flex: 1; */}
  align-self: flex-end;
  width: 150px;
  height: 25px;
  margin-bottom: 5px;
`;

const CartButton = styled.Button`
  flex: 0 0 20px;
`;

export default NavMenu;
