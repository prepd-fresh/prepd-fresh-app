import React from 'react';
import { StyleSheet, ScrollView, TextInput, Text, View, Button } from 'react-native';
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
        <CartItemView>
            {/* <View className="item-name-and-size"> */}
            <CartItemDetailsView>
                <CartItemName>{name.substr(0, 27)}{name.length > 27 && ' ...'}</CartItemName>
                <CartItemSizeVegDetails>{cartItem.size}{cartItem.veggie && ', vegetarian'}</CartItemSizeVegDetails>
            </CartItemDetailsView>
            {/* <View className="qty-price"> */}
            <CartItemEditorView>
              <CartItemQtyPriceView>
                <TextInput 
                  selectTextOnFocus
                  pattern="[0-9]*" 
                  keyboardType="numeric"
                  type="text" 
                  style={{borderColor: '#AAA', paddingLeft: 5, borderWidth: 1, height: 20}}
                  // value={cartItem.qty} 
                  value={String(cartItem.qty)}
                  onChangeText={updateItemQty}/>
                <Text>X ${cartItem.itemPrice}</Text>
              </CartItemQtyPriceView>
              <Button title="X" onPress={removeFromCart}/>
            </CartItemEditorView>
            {/* <FontAwesome 
                icon={faTrashAlt} 
                size="1x" 
                onClick={removeFromCart} /> */}
        </CartItemView>
    );
}

const CartItemView = styled.View`
  flex-direction: row;
  background-color: #FFF;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #DDD;
  height: 60px;
  
`
const CartItemName = styled.Text`
  font-size: 11px;
  color: #3E444B;
  font-weight: bold;
`

const CartItemSizeVegDetails = styled.Text`
  font-size: 11px;
  color: #3E444B;
`

const CartItemDetailsView = styled.View``

const CartItemEditorView = styled.View`
  flex-direction: row;
`

const CartItemQtyPriceView = styled.View`
  padding-right: 20px;
`

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