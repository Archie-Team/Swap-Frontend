import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import store from "./store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
=======
import { HashRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
      <App />
  </HashRouter>
>>>>>>> 503f2d25845383952fc3dd2ace465a49daa24ed6
);
