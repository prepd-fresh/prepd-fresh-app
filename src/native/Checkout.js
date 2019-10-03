import React from 'react';
import { useSelector,  } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import {CartStatuses} from '../common/actions';
import Cart from './Cart';
import CheckoutFormWebView from './CheckoutFormWebView';
// import styled from 'styled-components';

const Checkout = ({className}) => {
  
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
    <View style={styles.container}>
      <Text>Checkout</Text>
      <Cart cartItems={cartItems} />
      {/* <View className="total"> */}
      <View>
          <Text>Total ${totalPrice.toFixed(2)}</Text>
      </View>
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
// export default styled(Checkout)`
//     && {
//         width: 320px;
//         box-sizing: border-box;
//         padding: 60px 20px 200px 20px;
//         position: fixed;
//         overflow-y: scroll;
//         pointer-events: auto;
//         transform: translateX(100%);
//         top: 0;
//         right: 0;
//         background-color: #FAF8F4;
//         height: 100%;
//         box-shadow: 0 3px 6px rgba(0,0,0,0.16);
//         z-index: 1;
//     }
//     &.slide-in {
//         animation: slide-in 0.25s forwards;
//     }
//     &.slide-out {
//         animation: slide-out 0.25s forwards;
//     }
//     @keyframes slide-in {
//         100% {
//             transform: translateX(0%)
//         }
//     }
//     @keyframes slide-out {
//         0% {
//             transform: translateX(0%)
//         }
//         100% {
//             transform: translateX(100%)
//         }
//     }
//     & h2 {
//         margin-top: 0;
//     }
//     .total {
//         margin-top: 15px;
//         padding: 10px;
//         background-color: #FFF;
//         border-radius: 5px;
//         border: none;
//         box-shadow: 0 3px 6px rgba(0,0,0,0.16);
//     }
//     @media screen and (min-width: 1024px) {
//         /* show delete buttons instead of slideable cart items */
//     }
// `;