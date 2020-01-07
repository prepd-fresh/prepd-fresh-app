import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { View, Text } from "react-native";
import Checkout from "./Checkout";
import NavBar from "./NavBar";
import Menu from "./Menu";
import CartLinkPopup from "./CartLinkPopup";
import { toggleCartVisibility, fetchProducts } from "../actions";
import { AppLoading } from "expo";

const Main = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
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
  const nextWeekdayDate = day_in_week => {
    var ret = new Date();
    ret.setDate(ret.getDate() + ((day_in_week - 1 - ret.getDay() + 7) % 7) + 1);

    ret = ret.toLocaleString("default", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    var dateData = ret.toString().split(" ");
    var dateString = dateData[0] + " " + dateData[1] + " " + dateData[2];

    return dateString;
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log(state);
      setNetworkAvailable(state.isConnected);
    });
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => dispatch(fetchProducts())}
        onFinish={() => setIsReady(true)}
        onError={console.error}
      />
    );
  }

  return networkAvailable ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FAF8F4",
        alignItems: "stretch",
        justifyContent: "flex-start"
      }}
    >
      <NavBar cartIsVisible={cartIsVisible} />
      <Checkout
        cartIsVisible={cartIsVisible}
        nextWeekdayDate={nextWeekdayDate}
      />
      <Menu
        {...{
          products,
          productSizeVariants,
          cartIsNotVisible,
          nextWeekdayDate
        }}
      />
      <CartLinkPopup
        cartIsNotVisible={cartIsNotVisible}
        cartItemsExist={cartItemsExist}
        qtyOfItems={qtyOfCartItems}
        total={totalPrice}
        openCart={openCart}
      />
    </View>
  ) : (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Unable to connect to the internet. Please try again later.</Text>
    </View>
  );
};

export default Main;
