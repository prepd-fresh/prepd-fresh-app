import React from "react";
import { CheckBox } from "react-native-elements";

const CopyAddressCheckbox = ({ values, setFieldValue }) => (
  <CheckBox
    onPress={() => {
      if (!values.useBillingAddressForDelivery) {
        setFieldValue("deliveryAddressLine1", values.billingAddressLine1);
        setFieldValue("deliveryAddressLine2", values.billingAddressLine2);
        setFieldValue("deliveryAddressCity", values.billingAddressCity);
        setFieldValue("useBillingAddressForDelivery", true, false);
      } else {
        setFieldValue("deliveryAddressLine1", "", false);
        setFieldValue("deliveryAddressLine2", "", false);
        setFieldValue("deliveryAddressCity", "", false);
        setFieldValue("useBillingAddressForDelivery", false, false);
      }
    }}
    title="Use billing address for delivery"
    checked={values.useBillingAddressForDelivery}
  />
);

export default CopyAddressCheckbox;
