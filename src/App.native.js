import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import prepdApp from "./native/reducers";
import preloadedState from "./preloadedState";
import Main from "./native/Main";

const store = createStore(prepdApp, preloadedState);

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;

// swap in this export to preview storybook components
// export {default} from '../storybook';
