import React from "react";
import { Input } from "react-native-elements";
import styled from "styled-components";

const FormikTextInput = ({
  formik: { errors, touched, ...formik },
  name,
  placeholder,
  style
}) => (
  <Input
    inputStyle={style}
    inputContainerStyle={{
      borderBottomWidth: 0,
      paddingLeft: 5,
      backgroundColor: "white",
      marginTop: 5,
      borderRadius: 2.5
    }}
    autoCorrect={false}
    onChangeText={formik.handleChange(name)}
    onBlur={formik.handleBlur(name)}
    value={formik.values[name]}
    placeholder={placeholder}
    errorMessage={touched[name] && errors[name] ? errors[name] : undefined}
  />
);

export default styled(FormikTextInput)`
  background-color: white;
  font-family: "Roboto";
  border: none;
  color: #3e444b;
  font-size: 16px;
  font-weight: 300;
  padding: 5px;
  width: 100%;
`;
