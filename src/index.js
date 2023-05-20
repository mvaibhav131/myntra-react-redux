import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Style from "./index.css";
import { store } from "./ReduxStore/store"
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
