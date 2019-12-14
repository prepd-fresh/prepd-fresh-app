import React from "react";
import { TextInput, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCartItemQty } from "../actions";
import styled from "styled-components/native";

const CartItem = ({ cartItem: { name, ...cartItem } }) => {
  const dispatch = useDispatch();
  console.log(cartItem);
  const removeFromCart = () => dispatch(removeItemFromCart(cartItem.id));
  const updateItemQty = e => dispatch(updateCartItemQty(cartItem.id, e));
  return (
    <CartItemView>
      <MealImageWrapper
        resizeMode="cover"
        resizeMethod="scale"
        source={{ uri: cartItem.imageUrl }}
      />
      <CartItemDetailsView>
        <CartItemName>
          {name.substr(0, 27)}
          {name.length > 27 && " ..."}
        </CartItemName>
        <CartItemSizeVegDetails>
          {cartItem.size}
          {cartItem.veggie && ", vegetarian"}
        </CartItemSizeVegDetails>
      </CartItemDetailsView>
      <CartItemEditorView>
        <CartItemQtyPriceView>
          <TextInput
            selectTextOnFocus
            pattern="[0-9]*"
            keyboardType="numeric"
            type="text"
            style={{
              borderColor: "#AAA",
              paddingLeft: 5,
              borderWidth: 1,
              height: 20,
              width: 25,
              alignSelf: "flex-end"
            }}
            value={String(cartItem.qty)}
            onChangeText={updateItemQty}
          />
          <Text>X ${cartItem.itemPrice}</Text>
        </CartItemQtyPriceView>
        <Button title="X" onPress={removeFromCart} />
      </CartItemEditorView>
    </CartItemView>
  );
};

const CartItemView = styled.View`
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  ${"" /* padding: 20px; */}
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 60px;
  margin-bottom: 5px;
`;

const MealImageWrapper = styled.Image`
  border-radius: 5px;
  ${"" /* flex: 1; */}
  align-self: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-bottom: 5px;
`;

const CartItemName = styled.Text`
  font-size: 11px;
  color: #3e444b;
  font-weight: bold;
`;

const CartItemSizeVegDetails = styled.Text`
  font-size: 11px;
  color: #3e444b;
`;

const CartItemDetailsView = styled.View``;

const CartItemEditorView = styled.View`
  flex-direction: row;
`;

const CartItemQtyPriceView = styled.View`
  padding-right: 20px;
`;

export default CartItem;
