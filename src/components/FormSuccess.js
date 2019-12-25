import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const FormSuccess = () => (
  <View
    className="success-message"
    style={{ justifyContent: "center", alignItems: "center" }}
  >
    <Heading2Green>Payment successful</Heading2Green>
    <Text style={{ color: "#23b47e" }}>
      Thank you for ordering from Prep'd Fresh!
    </Text>
  </View>
);

const Heading2Green = styled.Text`
  color: #23b47e;
  font-size: 20px;
  font-weight: bold;
  max-width: 100%;
`;

export default FormSuccess;
