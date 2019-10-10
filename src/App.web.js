import React from "react";
import CheckoutForm from "./web/CheckoutForm";
import { StripeProvider, Elements } from "react-stripe-elements";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  h1, h2, h3, h4, h5, h6, p {
    color: #3E444B;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  body, html {
    overflow: ${props => (props.cartIsVisible ? "hidden" : "auto")};
    background-color: #FAF8F4;
    touch-action: none;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <StripeProvider apiKey="pk_test_dxJRiJo1wDpI8NWpKyTy9WII00GF5Wl5rQ">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  </React.Fragment>
);

export default App;
