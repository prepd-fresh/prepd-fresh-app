import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import Checkout from "./Checkout";
import NavBar from "./NavBar";
import Menu from "./Menu";
import CartLinkPopup from "./CartLinkPopup";
import { toggleCartVisibility, fetchProducts } from "../actions";
import { AppLoading } from "expo";

const Main = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const cartIsVisible = useSelector(state => state.cartIsVisible);
  const cartIsNotVisible = !cartIsVisible;
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);

  const productSizeVariants = useSelector(state => ({
    ...state.productSizeVariants
  }));

  const cartArr = Object.values(cart);
  const qtyOfCartItems = cartArr.reduce((total, item) => total + item.qty, 0);
  const totalPrice =
    cartArr.reduce(
      (total, item) => total + item.itemPrice * item.qty * 100,
      0
    ) / 100;
  const cartItemsExist = !!cartArr.length;

  const openCart = () => {
    if (cartIsNotVisible) dispatch(toggleCartVisibility());
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => dispatch(fetchProducts())}
        onFinish={() => setIsReady(true)}
        onError={console.error}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FAF8F4",
        alignItems: "stretch",
        justifyContent: "flex-start"
      }}
    >
      <NavBar cartIsVisible={cartIsVisible} />
      <Checkout cartIsVisible={cartIsVisible} />
      <Menu {...{ products, productSizeVariants, cartIsNotVisible }} />
      <CartLinkPopup
        cartIsNotVisible={cartIsNotVisible}
        cartItemsExist={cartItemsExist}
        qtyOfItems={qtyOfCartItems}
        total={totalPrice}
        openCart={openCart}
      />
    </View>
  );
};

export default Main;
