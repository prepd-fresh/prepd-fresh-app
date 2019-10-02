import React, {useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import WebView from 'react-native-webview';

const Checkout = () => {
  const webView = useRef();
  const dispatch = useDispatch();
  const cartStatus = useSelector(state => state.cartStatus);
  const cartItems = useSelector(state => state.cart);

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
        totalPrice: Object.values(cartItems).reduce(
          (ttl, item) => ttl + (item.itemPrice * item.qty), 
          0
        )
      }
    })
  );
  
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#FAF8F4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Checkout;