import React, { useRef, useEffect } from "react";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { Platform } from "react-native";
import WebView from "react-native-webview";

const CheckoutFormWebView = ({ cartItems, totalPrice, cartStatus }) => {
  const dispatch = useDispatch();
  const webView = useRef();

  useEffect(() => {
    if (webView.hasOwnProperty("current")) {
      sendStateToWebView();
    }
  });
  const sendStateToWebView = () =>
    webView.current.postMessage(
      JSON.stringify({
        type: "PREPD_CART",
        data: {
          cartItems,
          cartStatus,
          totalPrice
        }
      })
    );

  const handleMessageFromWV = event =>
    dispatch(JSON.parse(event.nativeEvent.data));

  const getWebViewSource = () => {
    if (!Constants.isDevice) {
      return Platform.OS === "ios"
        ? "http://localhost:9000"
        : "http://10.0.2.2:9000";
    }
    return "https://staging-prepdfresh.herokuapp.com";
  };
  return (
    <WebView
      ref={webView}
      bounces={false}
      scrollEnabled={false}
      onLoad={sendStateToWebView}
      style={{ height: 1000 }}
      onMessage={handleMessageFromWV}
      source={{ uri: getWebViewSource() }}
    />
  );
};

export default CheckoutFormWebView;
