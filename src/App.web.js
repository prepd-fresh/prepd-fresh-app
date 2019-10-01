import React from 'react';
import CheckoutForm from './web/CheckoutForm';
import { 
  StripeProvider, 
  Elements, 
} from 'react-stripe-elements';

const App = () => (
  <StripeProvider apiKey="pk_test_dxJRiJo1wDpI8NWpKyTy9WII00GF5Wl5rQ">
    <Elements>
      <CheckoutForm />
    </Elements>
  </StripeProvider>
);

export default App;