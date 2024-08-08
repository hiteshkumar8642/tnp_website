import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Toaster} from "react-hot-toast"
import { LoadingProvider } from "./Components/LoadingContext/LoadingContext"; 
import { NavigationProvider } from './utils/NavigationContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <LoadingProvider>
          <App />
          <Toaster />
        </LoadingProvider>
      </NavigationProvider>
      </BrowserRouter>
  </React.StrictMode>
);
