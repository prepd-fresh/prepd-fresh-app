import React, { useRef, useEffect } from "react";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { Platform, View } from "react-native";
import WebView from "react-native-webview";

const CheckoutFormWebView = ({
  cartDetails,
  submitting,
  setSubmitting,
  formValues
}) => {
  const dispatch = useDispatch();
  const webView = useRef();

  useEffect(() => {
    if (webView.hasOwnProperty("current") && submitting === true) {
      sendDataToWebView(formValues);
      setSubmitting(false);
    }
  });

  const sendDataToWebView = ({
    firstName: first_name,
    lastName: last_name,
    useBillingAddressForDelivery: useBilling,
    billingAddressLine1: address_line1,
    billingAddressLine2: address_line2,
    billingAddressCity: address_city,
    deliveryAddressLine1: deliveryLine1,
    deliveryAddressLine2: deliveryLine2,
    deliveryAddressCity: deliveryCity,
    phoneNumber,
    email,
    orderNotes
  }) => {
    const stripeDetails = {
      name: `${first_name} ${last_name}`,
      first_name,
      last_name,
      address_line1,
      address_line2,
      address_city
    };

    const customer = {
      stripeDetails,
      deliveryAddressLine1: useBilling ? address_line1 : deliveryLine1,
      deliveryAddressLine2: useBilling ? address_line2 : deliveryLine2,
      deliveryAddressCity: useBilling ? address_city : deliveryCity,
      phoneNumber,
      email,
      orderNotes
    };
    webView.current.postMessage(
      JSON.stringify({
        type: "FORM_SUBMITTED",
        details: {
          cartDetails,
          customer
        }
      })
    );
  };

  const handleMessageFromWV = event => {
    dispatch(JSON.parse(event.nativeEvent.data));
    console.log("data from webview:", JSON.parse(event.nativeEvent.data));
  };
  const getWebViewSource = () => {
    if (!Constants.isDevice) {
      return Platform.OS === "ios"
        ? "https://prepd-fresh-checkout-server.herokuapp.com/"
        : "https://prepd-fresh-checkout-server.herokuapp.com//";
      //   "http://localhost:9000"
      // : "http://10.0.2.2:9000";
    }
    return "https://prepd-fresh-checkout-server.herokuapp.com//";
  };

  return (
    <View
      style={{
        height: 40,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 2.5,
        backgroundColor: "#FFF",
        overflow: "hidden"
      }}
    >
      <WebView
        ref={webView}
        bounces={false}
        scrollEnabled={false}
        style={{ height: 50 }}
        onMessage={handleMessageFromWV}
        source={{ uri: getWebViewSource() }}
      />
    </View>
  );
};

export default CheckoutFormWebView;
