import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "react-range-slider-input/dist/style.css";
import "./Assets/Style/style.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./ReactToolkit/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
