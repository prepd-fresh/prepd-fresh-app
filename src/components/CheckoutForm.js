import React, { useState } from "react";
import checkoutValidationSchema from "../checkoutValidationSchema";
import { View } from "react-native";
import { Formik } from "formik";
import CheckoutFormInner from "./CheckoutFormInner";
import styled from "styled-components";

const CheckoutForm = props => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => setSubmitting(true);

  const initialValues = {
    // firstName: "",
    // lastName: "",
    // billingAddressLine1: "",
    // billingAddressLine2: "",
    // billingAddressCity: "",
    // useBillingAddressForDelivery: true,
    // deliveryAddressLine1: "",
    // deliveryAddressLine2: "",
    // deliveryAddressCity: "",
    // phoneNumber: "",
    // email: "",
    // orderNotes: ""
    firstName: "Test",
    lastName: "test",
    billingAddressLine1: "test",
    billingAddressLine2: "",
    billingAddressCity: "test",
    useBillingAddressForDelivery: true,
    deliveryAddressLine1: "test",
    deliveryAddressLine2: "",
    deliveryAddressCity: "test",
    phoneNumber: "4242424242",
    email: "test@test.com",
    orderNotes: "ignore"
  };

  return (
    <StyledCheckoutFormView>
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutValidationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <CheckoutFormInner
            cartDetails={props}
            submitting={submitting}
            setSubmitting={setSubmitting}
            formik={formik}
          />
        )}
      </Formik>
    </StyledCheckoutFormView>
  );
};

export default CheckoutForm;

const StyledCheckoutFormView = styled.View`
  position: relative;
  width: 100%;
  background-color: #faf8f4;
`;
