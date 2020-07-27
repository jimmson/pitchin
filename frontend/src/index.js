import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import history from "./utils/history";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector("body main")
);
