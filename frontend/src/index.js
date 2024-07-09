import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import Company from "./Components/companypage";
//import FirstLogIn from "./Components/FirstLogIn";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Company /> */}
    {/* <FirstLogIn /> */}
  </React.StrictMode>
);
