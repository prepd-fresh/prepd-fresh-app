import React from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateCartItemQty } from '../common/actions';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const CartItem = ({cartItem: {name, ...cartItem}}) => {
    const dispatch = useDispatch();
    const removeFromCart = () => dispatch(removeItemFromCart(cartItem.id));
    const updateItemQty = e => dispatch(updateCartItemQty(
        cartItem.id, 
        e
    ));
    return (
        // <View className={"CartItem " + className}>
        <StyledCartItem>
            {/* <View className="item-name-and-size"> */}
            <View style={styles.cartItemDetails}>
                <Text>{name.substr(0, 27)}{name.length > 27 && ' ...'}</Text>
                <Text>{cartItem.size}{cartItem.veggie && ', vegetarian'}</Text>
            </View>
            {/* <View className="qty-price"> */}
            <View style={styles.cartItemEditor}>
              <View style={styles.cartItemQtyPrice}>
                <TextInput 
                    pattern="[0-9]*" 
                    keyboardType="numeric"
                    type="text" 
                    // value={cartItem.qty} 
                    value={String(cartItem.qty)}
                    onChangeText={updateItemQty}/>
                <Text>X ${cartItem.itemPrice}</Text>
              </View>
              <Button title="X" onPress={removeFromCart}/>
            </View>
            {/* <FontAwesome 
                icon={faTrashAlt} 
                size="1x" 
                onClick={removeFromCart} /> */}
        </StyledCartItem>
    );
}

const StyledCartItem = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #FFF;
  align-item: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px;
`
const styles = {}
// const styles = StyleSheet.create({
//   cartItem: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     margin: 20
//   },
  // cartItemDetails: {
  //   flex: 1,
  //   paddingTop: 100,
  //   backgroundColor: '#FAF8F4',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  // },
  // cartItemEditor: {
  //   flex: 1,
  //   paddingTop: 100,
  //   backgroundColor: '#FAF8F4',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  // },
  // cartItemQtyPrice: {
  //   flex: 1,
  //   paddingTop: 100,
  //   backgroundColor: '#FAF8F4',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  // },
  
// });

export default CartItem;
// export default styled(CartItem)`
//     & {
//         display: flex;
//         align-items: center;
//         justify-content: flex-end;
//         padding: 10px;
//         border-bottom: 1px solid gray;
//     }

//     &:last-child {
//         border-bottom: none;
//     }

//     & .item-name-and-size {
//         margin-right: auto;
//     }

//     & h4,
//     & p {
//         font-size: 11px;
//         margin: 0;
//     }

//     & .item-name-and-size h4 {
//         margin: 0;
//     }

//     & .qty-price {
//         text-align: right;
//     }

//     & .item-name-and-size p {
//         font-size: 11px;
//     }

//     & input {
//         width: 30px;
//         border: 1px solid black;
//         text-align: right;
//     }

//     & .fa-trash-alt {
//         margin: 10px 0px 10px 15px;
//     }
// `;