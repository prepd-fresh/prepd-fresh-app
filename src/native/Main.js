import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  useSelector } from 'react-redux';
import Checkout from './Checkout';
import NavBar from './NavBar';


const Main = () => {
  const cartIsVisible = useSelector(state => state.cartIsVisible);
  return (
    <View style={styles.container} >
      <NavBar cartIsVisible={cartIsVisible} />
      {cartIsVisible && <Checkout />}
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

export default Main;