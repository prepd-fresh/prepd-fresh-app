import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const FormFailure = () => (
  <View
    className="failed-message"
    style={{ justifyContent: "center", alignItems: "center" }}
  >
    <Heading2Red>Payment failed</Heading2Red>
    <Text style={{ color: "#D11A26" }}>
      Oops! Something went wrong, please try again later.
    </Text>
  </View>
);

const Heading2Red = styled.Text`
  color: #d11a26;
  font-size: 20px;
  font-weight: bold;
  max-width: 100%;
`;

export default FormFailure;
