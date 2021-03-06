import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "./theme/Provider";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { api } from "./services/api";

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
