import React, { useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import prepdApp from "./src/reducers";
import preloadedState from "./src/preloadedState";
import Main from "./src/components/Main";
import * as Font from "expo-font";

const store = createStore(prepdApp, preloadedState, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    Font.loadAsync({
      Roboto: require("./assets/fonts/Roboto-Regular.ttf")
    });
  });
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

// swap in this export to preview storybook components
// export {default} from '../storybook';
