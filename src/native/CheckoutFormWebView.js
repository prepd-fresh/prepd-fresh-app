import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

const CheckoutFormWebView = ({cartItems, totalPrice, cartStatus}) => {
  const dispatch = useDispatch();
  const webView = useRef();
  
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
      style={{flex: 1, width: 320}} 
      onMessage={event => dispatch(JSON.parse(event.nativeEvent.data))}
      // using local URIs until we get a server up online
      source={{
        uri: (Platform.OS === 'ios')
          ? 'http://localhost:9000'
          : 'http://10.0.2.2:9000'}} 
    />
  )
}

export default CheckoutFormWebView;