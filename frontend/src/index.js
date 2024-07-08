import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
//import Company from "./Components/companypage";
//import FirstLogIn from "./Components/FirstLogIn";
import AppRouting from "./AppRouting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouting />
    {/* <App /> */}
    {/* <Company /> */}
    {/* <FirstLogIn /> */}
  </React.StrictMode>
);
