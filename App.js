import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import prepdApp from "./src/reducers";
import preloadedState from "./src/preloadedState";
import Main from "./src/components/Main";

const store = createStore(prepdApp, preloadedState, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;

// swap in this export to preview storybook components
// export {default} from '../storybook';
