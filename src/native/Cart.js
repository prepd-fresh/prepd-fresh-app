import React from 'react';
import CartItem from './CartItem';
import { View } from 'react-native';
import styled from 'styled-components/native';
// import styled from 'styled-components';

const Cart = ({cartItems}) => (
    // <View className={"Cart " + className}>
    <CartView>
        {Object.keys(cartItems)
                .sort()
                .map(itemId => (
                    <CartItem 
                        key={itemId} 
                        cartItem={cartItems[itemId]} />
                ))}
    </CartView>
);

const CartView = styled.View`
  background-color: #FFF;
  border-radius: 5px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.16;
  shadow-radius: 6px;
  elevation: 6;
  margin: 10px 0;
`

export default Cart;
// export default styled(Cart)`
//   & {
//     border: 1px solid green;
//     padding: 0 10px;
//     background-color: #FFF;
//     border-radius: 5px;
//     border: none;
//     box-shadow: 0 3px 6px rgba(0,0,0,0.16);
//   }
// `;