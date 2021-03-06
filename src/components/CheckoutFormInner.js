import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FormikTextInput from "./FormikTextInput";
import styled, { css } from "styled-components";
import CheckoutFormWebView from "./CheckoutFormWebView";
import CopyAddressCheckbox from "./CopyAddressCheckbox";
import { CartStatuses } from "../actions";
import FormProcessing from "./FormProcessing";
import FormSuccess from "./FormSuccess";
import FormFailure from "./FormFailure";

const CheckoutFormInner = ({
  submitting,
  setSubmitting,
  cartDetails,
  formik
}) => (
  <React.Fragment>
    <DefaultView status={cartDetails.cartStatus}>
      <CheckoutFormWebView
        formValues={formik.values}
        submitting={submitting}
        setSubmitting={setSubmitting}
        cartDetails={cartDetails}
      />
      <FormikTextInput
        formik={formik}
        name="firstName"
        placeholder="First name"
      />
      <FormikTextInput
        formik={formik}
        name="lastName"
        placeholder="Last name"
      />
      <StyledFieldset>
        <StyledLegend>Billing Address</StyledLegend>
        <FormikTextInput
          formik={formik}
          name="billingAddressLine1"
          placeholder="Billing address line 1"
        />
        <FormikTextInput
          formik={formik}
          name="billingAddressLine2"
          placeholder="Billing address line 2 (Optional)"
        />
        <FormikTextInput
          formik={formik}
          name="billingAddressCity"
          placeholder="Billing address city"
        />
      </StyledFieldset>
      <CopyAddressCheckbox
        {...{ values: formik.values, setFieldValue: formik.setFieldValue }}
      />
      {!formik.values.useBillingAddressForDelivery && (
        <StyledFieldset>
          <StyledLegend>Delivery Address</StyledLegend>
          <FormikTextInput
            formik={formik}
            name="deliveryAddressLine1"
            placeholder="Delivery address line 1"
          />
          <FormikTextInput
            formik={formik}
            name="deliveryAddressLine2"
            placeholder="Delivery address line 2 (Optional)"
          />
          <FormikTextInput
            formik={formik}
            name="deliveryAddressCity"
            placeholder="Delivery address city"
          />
        </StyledFieldset>
      )}
      <FormikTextInput
        formik={formik}
        name="phoneNumber"
        placeholder="Phone number"
      />
      <FormikTextInput formik={formik} name="email" placeholder="Email" />
      <FormikTextInput
        formik={formik}
        name="orderNotes"
        placeholder="Order notes (Optional)"
      />
      <StyledTouchableOpacity
        onPress={formik.handleSubmit}
        style={{ position: "relative" }}
      >
        <Text
          style={{ color: "white", alignSelf: "center", fontWeight: "bold" }}
        >{`Pay $${cartDetails.totalPrice}`}</Text>
      </StyledTouchableOpacity>
    </DefaultView>
    <ProcessingView status={cartDetails.cartStatus}>
      <FormProcessing />
    </ProcessingView>
    <SuccessView status={cartDetails.cartStatus}>
      <FormSuccess />
    </SuccessView>
    <FailureView status={cartDetails.cartStatus}>
      <FormFailure />
    </FailureView>
  </React.Fragment>
);

const DefaultView = styled.View`
  display: ${({ status }) =>
    status === CartStatuses.DEFAULT ? "flex" : "none"};
`;
const ProcessingView = styled.View`
  display: ${({ status }) =>
    status === CartStatuses.PROCESSING ? "flex" : "none"};
  height: 500px;
  justify-content: center;
  align-items: center;
`;
const SuccessView = styled.View`
  display: ${({ status }) =>
    status === CartStatuses.SUCCESS ? "flex" : "none"};
  height: 500px;
  justify-content: center;
  align-items: center;
`;
const FailureView = styled.View`
  display: ${({ status }) =>
    status === CartStatuses.FAILED ? "flex" : "none"};
  height: 500px;
  justify-content: center;
  align-items: center;
`;
const StyledP = styled.Text`
  color: #666;
  font-size: 17px;
  font-style: italic;
  margin-top: 10px;
`;
const StyledFieldset = styled.View`
  border-radius: 10px;
  margin: 20px 0 10px 0;
  padding: 0 10px 10px 10px;
  border: 1px solid #ccc;
`;
const StyledLegend = styled.Text`
  color: #aaa;
  background-color: #faf8f4;
  top: -10px;
  align-self: flex-start;
  padding: 0 10px;
`;
const StyledTouchableOpacity = styled.TouchableOpacity`
  background: #23b47e;
  border: none;
  color: white;
  border-radius: 2px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 100px;
  padding: 10px 0;
  align-items: center;
  align-self: stretch;
  height: 40px;
`;

export default CheckoutFormInner;
