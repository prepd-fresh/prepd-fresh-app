import * as yup from "yup";

const checkoutValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  lastName: yup
    .string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  billingAddressLine1: yup
    .string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  billingAddressLine2: yup
    .string()
    .min(1, "Too Short!")
    .max(50, "Too Long!"),
  billingAddressCity: yup
    .string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  deliveryAddressLine1: yup
    .string()
    // .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  deliveryAddressLine2: yup
    .string()
    .min(1, "Too Short!")
    .max(50, "Too Long!"),
  deliveryAddressCity: yup
    .string()
    // .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches( /hamilton/i,
    "Currently only deliver to the city of Hamilton. Please email contact@prepdfresh.com for more information."),
  phoneNumber: yup
    .string()
    .required("Required")
    .min(10, "Phone number must be at least 10 digits")
    .max(14, "Phone number cannot be longer than 14 digits")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number format, try ###-###-####"
    ),
  email: yup
    .string()
    .email("Invalid email")
    .required("Required"),
  orderNotes: yup.string().max(150, "Too Long!")
});

export default checkoutValidationSchema;
