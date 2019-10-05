import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/native';

const CartLinkPopup = ({qtyOfItems, total, styles, openCart, ...props}) => (
    <View style={styles} onPress={openCart}>
        <View>
            <Text>{`${qtyOfItems} ${(qtyOfItems > 1) ? 'items' : 'item'} | $${total}`}</Text>
        </View>
        <View>
            <Text>View Cart  </Text>
            {/* <FontAwesomeIcon icon={faShoppingCart} size="1x" color="#FFF"/> */}
            <Button 
              title="CART" 
              color={
                (Platform.OS === 'ios') 
                  ? '#FFF' 
                  : '#23B47E'
              }/>
        </View>
    </View>
);

export default styled(CartLinkPopup)`
    background-color: #23B47E;
    border-radius: 5px;
    padding: 20px 30px;
    color: #FFF;
    width: 400px;
    max-width: 90%;
    ${'' /* left: 0;
    right: 0;
    position: fixed;
    bottom: 20px; */}
    display: flex;
    justify-content: space-between;
`;