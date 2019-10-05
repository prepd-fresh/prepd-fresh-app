import React from 'react';
import { Text, View, Button, Platform, TouchableOpacity } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/native';

const CartLinkPopup = ({qtyOfItems, total, openCart, ...props}) => (
  <StyledTouchableOpacity onPress={openCart}>
    <View>
        <WhiteText>{`${qtyOfItems} ${(qtyOfItems > 1) ? 'items' : 'item'} | $${total}`}</WhiteText>
    </View>
    <View>
        <WhiteText>View Cart  </WhiteText>
        {/* <FontAwesomeIcon icon={faShoppingCart} size="1x" color="#FFF"/> */}
        {/* <Button 
          title="CART" 
          color={
            (Platform.OS === 'ios') 
              ? '#FFF' 
              : '#23B47E'
          }/> */}
    </View>
  </StyledTouchableOpacity>
);

const WhiteText = styled.Text`
  color: white;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  flex-direction: row;
  background-color: #23B47E;
  bottom: 40px;
  elevation: 6;
  shadow-color: #000;
  shadow-offset: 0 3px;
  shadow-opacity: 0.4;
  shadow-radius: 6px;
  border-radius: 5px;
  padding: 20px;
  color: #FFF;
  width: 320px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-self: center;
  z-index: 999;
`;

export default styled(CartLinkPopup)`
    
`;