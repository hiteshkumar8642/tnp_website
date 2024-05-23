import React, { useState } from "react";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";

export default function App() {
  const [logIn, setLogIn] = useState(false);

  function handleLogInPageOpening() {
    setLogIn((logIn) => !logIn);
  }

  return (
    <>
      {!logIn && <LandingPage onLogInPageOpening={handleLogInPageOpening} />}
      {logIn && <LoginPage onLogInPageClosing={handleLogInPageOpening} />}
    </>
  );
}
