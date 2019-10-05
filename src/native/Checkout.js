import React from 'react';
import { useSelector,  } from 'react-redux';
import { StyleSheet, Text, View,  ScrollView } from 'react-native';
import {CartStatuses} from '../common/actions';
import Cart from './Cart';
import CheckoutFormWebView from './CheckoutFormWebView';
import styled from 'styled-components/native';

const Checkout = ({cartIsVisible}) => {
  
  // used for resetting scroll position on checkout complete
  // const checkoutRef = useRef(null);
  
  const cartItems = useSelector(state => ({...state.cart}));
  const totalPrice = Object.keys(cartItems).reduce(
    (total, itemId) => (
      ((cartItems[itemId].itemPrice * 100 * cartItems[itemId].qty) + (total * 100)) / 100
    ),
    0
  )
  const checkoutPending = (cartStatus !== CartStatuses.SUCCESS && totalPrice > 0)
  const cartStatus = useSelector(state => state.cartStatus);
  // const resetScroll = () => checkoutRef.current.scrollTo(0, 0);
  
  return (
      <ScrollView 
        bounces={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
          backgroundColor: "#FAF8F4",
          display: cartIsVisible ? 'flex' : 'none'
        }}
        // alwaysBounceHorizontal={false}
      >
     {/* <View style={{paddingTop: 90, flex: 1}}> */}
        <Heading2>Checkout</Heading2>
        <Cart cartItems={cartItems} />
        {/* <View className="total"> */}
        <TotalView>
            <Text>Total ${totalPrice.toFixed(2)}</Text>
        </TotalView>
        <Text>
          *Meals are delivered every Sunday. The next delivery date is Sunday, 
          July 28. Order by 11:59pm Friday, July 26 to receive your delivery this 
          Sunday.
        </Text>
        {checkoutPending && (
          <CheckoutFormWebView 
            cartStatus={cartStatus} 
            totalPrice={totalPrice} 
            cartItems={cartItems} />
        )}
      {/* </View> */}
    </ScrollView>
  );
}

const TotalView = styled.View`
  background-color: #FFF;
  border-radius: 5px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  margin: 10px 0;
  max-width: 100%;
  height: 50px;
`

const Heading2 = styled.Text`
  color: #3E444B;
  font-size: 30px;
  font-weight: bold;
  max-width: 100%;
`

export default Checkout;