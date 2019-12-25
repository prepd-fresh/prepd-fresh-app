import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components";

const FormProcessing = () => (
  <View
    className="processing-message"
    style={{ justifyContent: "center", alignItems: "center" }}
  >
    <Heading2>Processing order...</Heading2>
    <Image
      source={require("../../assets/img/loading-spinner.gif")}
      style={{ height: 50, width: 50 }}
    />
  </View>
);

const Heading2 = styled.Text`
  color: #3e444b;
  font-size: 20px;
  font-weight: bold;
  max-width: 100%;
`;

export default FormProcessing;
