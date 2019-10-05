import React, { Fragment, useState, useEffect } from 'react';
import checkoutValidationSchema from './checkoutValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateCartStatus, CartStatuses, resizeWebView } from '../common/actions';
import styled from 'styled-components';
import { 
  CardElement, 
  injectStripe 
} from 'react-stripe-elements';

const CheckoutForm = ({className, stripe}) => {
  // this should come from RN
  const [cartItems, setCartItems] = useState({})
  const [cartStatus, setCartStatus] = useState(CartStatuses.DEFAULT);
  const [totalPrice, setTotalPrice] = useState(1.00);
  
  const sendMessageToRN = action => {
    if (window.hasOwnProperty('ReactNativeWebView')) {

      window.ReactNativeWebView.postMessage(JSON.stringify(action));
    } else {
      console.log('page not loaded in WebView. Action posted:\n', action);
    }
  }

  useEffect(() => {
    sendMessageToRN(resizeWebView(document.body.clientHeight + 'px'));

    const handleMessageFromRN = data => {
      let parsedData = typeof data.data === 'string' 
        ? JSON.parse(data.data) 
        : data.data
      switch(parsedData.type) {
        case 'PREPD_CART':
          // we capture entire Cart to send for pre-charge server-side validation
          setCartItems(parsedData.data.cartItems);
          setCartStatus(parsedData.data.cartStatus);
          setTotalPrice(parsedData.data.totalPrice);
          break;
        default:
          break;
      }
    }

    // we add to document and window because of android / ios differences
    document.addEventListener("message", handleMessageFromRN);
    window.addEventListener("message", handleMessageFromRN);

    return () => {
      // we remove from document and window because of android / ios differences
      document.removeEventListener("message", handleMessageFromRN);
      window.removeEventListener("message", handleMessageFromRN);
    }
  })

  // data additional to Stripe details are sent for pre-charge validation
  const postStripeToken = details => fetch(
    "/charge", 
    {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: details.token.id,
        fullCustomerDetails: {
          ...details.stripeCustomerDetails,
          email: details.email,
          deliveryAddressLine1: details.deliveryAddressLine1,
          deliveryAddressLine2: details.deliveryAddressLine2,
          deliveryAddressCity: details.deliveryAddressCity,
          phoneNumber: details.phoneNumber,
          orderNotes: details.orderNotes,
        },
        cartItems,
        totalPrice
      })
    }
  );

  const handleSubmit = async (details, stripe) => {
    let stripeCustomerDetails = {
      name: `${details.firstName} ${details.lastName}`,
      address_line1: details.billingAddressLine1,
      address_line2: details.billingAddressLine2,
      address_city: details.billingAddressCity,
    }
    let {token} = await stripe.createToken(stripeCustomerDetails);
    if (token) {
      sendMessageToRN(updateCartStatus(CartStatuses.PROCESSING));
      let response = await postStripeToken({
        token,
        stripeCustomerDetails,
        deliveryAddressLine1: details.deliveryAddressLine1,
        deliveryAddressLine2: details.deliveryAddressLine2,
        deliveryAddressCity: details.deliveryAddressCity,
        phoneNumber: details.phoneNumber,
        orderNotes: details.orderNotes,
      });
      
      if (response.ok) {
        console.log(response.json())
        sendMessageToRN(updateCartStatus(CartStatuses.SUCCESS));
        setTimeout(
          () => {
            sendMessageToRN(updateCartStatus(CartStatuses.DEFAULT));
          },
          3000
        );
      }
    }
  }

  const billingAddressWasProvided = (values) => 
    (!!values.billingAddressLine1.length && !!values.billingAddressCity)

  const CopyAddressCheckbox = ({values, setFieldValue}) => (
    <Fragment>
      <Field 
      type="checkbox" 
      onClick={() => {
        if (!values.useBillingAddressForDelivery) {
          setFieldValue( 'deliveryAddressLine1', values.billingAddressLine1 );
          setFieldValue( 'deliveryAddressLine2', values.billingAddressLine2 );
          setFieldValue( 'deliveryAddressCity', values.billingAddressCity );
        } else {
          setFieldValue( 'deliveryAddressLine1', '', false );
          setFieldValue( 'deliveryAddressLine2', '', false );
          setFieldValue( 'deliveryAddressCity', '', false );
        }
      }} 
      name="useBillingAddressForDelivery" 
      label="Use billing address for delivery" 
      checked={values.useBillingAddressForDelivery} /> 
      Use billing address for delivery
    </Fragment>
  )

  const initialValues = {
    firstName: "",
    lastName: "",
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingAddressCity: "",
    useBillingAddressForDelivery: false,
    deliveryAddressLine1: "",
    deliveryAddressLine2: "",
    deliveryAddressCity: "",
    phoneNumber: "",
    email: "",
    orderNotes: ""
  }

  return (
    <div className={`checkout ${cartStatus} ${className}`}>
      <div className="processing-message">
        <h2>Processing order...</h2>
      </div>
      <div className="success-message">
        <h2>Payment successful</h2>
        <p>Thank you for ordering from Prep'd Fresh!</p>
      </div>
        <div className="checkout-form">
          <Formik 
            initialValues={initialValues}
            validationSchema={checkoutValidationSchema}
            onSubmit={details => handleSubmit(details, stripe)}
          >  
            {({ values, setFieldValue }) => (
              <Fragment>
                <p>Would you like to finish your purchase?</p>
                <Form>
                  <CardElement 
                    className="card-element"
                    style={{ base: { "::placeholder": { color: "#AAA", fontSize: "16px", fontWeight: 100 } } }} 
                  />
                  <Field name="firstName" placeholder="First name" />
                  <ErrorMessage name="firstName" />
                  <Field name="lastName" placeholder="Last name" />
                  <ErrorMessage name="lastName" />
                  <fieldset><legend>Billing Address</legend>
                    <Field name="billingAddressLine1" placeholder="Billing address line 1" />
                    <ErrorMessage name="billingAddressLine1" />
                    <Field name="billingAddressLine2" placeholder="Billing address line 2 (Optional)" />
                    <ErrorMessage name="billingAddressLine2" />
                    <Field name="billingAddressCity" placeholder="Billing address city" />
                    <ErrorMessage name="billingAddressCity" />
                  </fieldset>
                  { billingAddressWasProvided(values) 
                    && <CopyAddressCheckbox {...{values, setFieldValue}} /> }
                  <fieldset><legend>Delivery Address</legend>
                    <Field name="deliveryAddressLine1" placeholder="Delivery address line 1" />
                    <ErrorMessage name="deliveryAddressLine1" />
                    <Field name="deliveryAddressLine2" placeholder="Delivery address line 2 (Optional)" />
                    <ErrorMessage name="deliveryAddressLine2" />
                    <Field name="deliveryAddressCity" placeholder="Delivery address city" />
                    <ErrorMessage name="deliveryAddressCity" />
                  </fieldset>
                  <Field name="phoneNumber" placeholder="Phone number" />
                  <ErrorMessage name="phoneNumber" />
                  <Field name="email" placeholder="Email" />
                  <ErrorMessage name="email" />
                  <Field name="orderNotes" placeholder="Order notes (Optional)" />
                  <ErrorMessage name="orderNotes" />
                  <br/><button type="submit">Pay ${totalPrice}</button>
                </Form>
                </Fragment>
              )}
          </Formik>
        </div>
    </div>
  );
}

export default injectStripe(styled(CheckoutForm)`
    position: relative;
    height: 500px;
    width: 100%;
    background-color: #FAF8F4;
    form {
        fieldset {
            border-radius: 10px;
            margin: 10px 0;
            border: 1px solid #CCC;
        }
        legend {
            color: #AAA;
        }
        & input, & .card-element {
            background-color: white;
            font-family: 'Roboto', sans-serif;
            border: none;
            color: #3E444B;
            font-size: 16px;
            font-weight: 300;
            border-radius: 3px;
            margin: 5px 5px 0 0;
            padding: 5px;
            width: 100%;
            &[type="checkbox"]{
                width: 30px;
            }
        }
        & input, & .card-element {
            ${'' /* &::placeholder {
                color: grey;
                font-weight: 100;
            } */}
            &::-webkit-input-placeholder { /* Edge */
               color: #AAA;
               font-weight: 100;
            }

            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #AAA;
                font-weight: 100;
            }

            &::placeholder {
                color: #AAA;
                font-weight: 100;
            }
        }
        p {
            color: #666;
            ${'' /* font-size: 12px; */}
            font-size: 17px;
            font-style: italic;
        }
        &> button {
            background: #23B47E;
            border: none;
            color: white;
            border-radius: 2px;
            width: 100%;
            height: 30px;
            margin-top: 10px;
        }
    }
    
    &.DEFAULT {
        .checkout-form {
            visibility: visible;
            position: relative;
            opacity: 1;
            transition: opacity 0.2s linear;
        }
        .processing-message {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .success-message {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
    }
    
    &.PROCESSING {
        .checkout-form {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .processing-message {
            visibility: visible;
            position: relative;
            opacity: 1;
            transition: opacity 0.2s linear;
        }
        .success-message {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
    }
    
    &.SUCCESS {
        .checkout-form {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .processing-message {
            visibility: hidden;
            position: absolute;
            opacity: 0;
            transition: visibility 0s 0.2s, opacity 0.2s linear;
        }
        .success-message {
            visibility: visible;
            position: relative;
            opacity: 1;
            transition: opacity 0.2s linear;
            h2, p {
                color: #23B47E;
            }
        }
    }
`);