import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import WebView from 'react-native-webview';

const Checkout = () => {
  const webView = useRef();
  const dispatch = useDispatch();
  const cartStatus = useSelector(state => state.cartStatus);
  const cartItems = useSelector(state => state.cart);
  const postToWebView = action => webView.current.postMessage(
    JSON.stringify({
      type: 'PREPD_CART', 
      data: {
        cartItems,
        cartStatus,
        totalPrice: 9.99 
      }
    })
  );
  return (
    <View style={styles.container}>
      <Text>{cartStatus}</Text>
      {cartStatus !== 'SUCCESS' && <WebView   
        ref={webView}
        style={{flex: 1, width: 320, borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da'}} 
        onMessage={event => dispatch(JSON.parse(event.nativeEvent.data))}
        // using local URIs until we get a server up online
        source={{
          uri: (Platform.OS === 'ios')
            ? 'http://localhost:9000'
            : 'http://10.0.2.2:9000'}} 
      />}
      <Button onPress={postToWebView} title="test from RN" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#FAF8F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Checkout;