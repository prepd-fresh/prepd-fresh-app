import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import prepdApp from './native/reducers';
import preloadedState from './preloadedState';
import Checkout from './native/Checkout';

const store = createStore(
  prepdApp,
  preloadedState
);

const App = () => {
  return (
    <Provider store={store}>
      <Checkout />
    </Provider>
  );
}

export default App;