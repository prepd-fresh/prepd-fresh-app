import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import styled, { css } from 'styled-components/native';

const CheckoutFormWebView = ({cartItems, totalPrice, cartStatus}) => {
  const dispatch = useDispatch();
  const webView = useRef();
  const webViewHeight = useSelector(state => state.webViewHeight);

  useEffect(
    () => {
      if (webView.hasOwnProperty('current')) {
        sendStateToWebView()
      }
    }
  )
  const sendStateToWebView = () => webView.current.postMessage(
    JSON.stringify({
      type: 'PREPD_CART',
      data: {
        cartItems,
        cartStatus,
        totalPrice
      }
    })
  );
  return (
    <WebView   
      ref={webView}
      bounces={false}
      onLoad={sendStateToWebView}
      style={{height: 1000}}
      onMessage={event => dispatch(JSON.parse(event.nativeEvent.data))}
      // using local URIs until we get a server up online
      source={{
        uri: (Platform.OS === 'ios')
          ? 'http://localhost:9000'
          : 'http://10.0.2.2:9000'}} 
    />
  )
}

// const styles = StyleSheet.create({
//   webView: {
//     flex: 0
//   }
// })

export default CheckoutFormWebView;