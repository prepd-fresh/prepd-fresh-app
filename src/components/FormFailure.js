import React from "react";
import { View, Text } from "react-native";

const FormFailure = () => (
  <View className="failed-message">
    <Text>Payment failed</Text>
    <Text>Oops! Something went wrong, please try again later.</Text>
  </View>
);

export default FormFailure;
