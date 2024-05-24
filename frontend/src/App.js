import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import CollegeRegistrationPage from "./components/CollegeRegistrationPage";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCollegeRegistrationOpen, setIsCollegeRegistrationOpen] =
    useState(false);

  function handleLogInPageOpening() {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
    setIsCollegeRegistrationOpen(false);
  }

  function handleLogInPageClosing() {
    setIsLoginOpen(false);
  }

  function handleSignUpPageOpening() {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
    setIsCollegeRegistrationOpen(false);
  }

  function handleLandingPageOpening() {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
    setIsCollegeRegistrationOpen(false);
  }

  function handleCollegeRegistrationPageOpening() {
    setIsCollegeRegistrationOpen(true);
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  }

  return (
    <>
      {!isLoginOpen && !isSignUpOpen && !isCollegeRegistrationOpen && (
        <LandingPage
          onLogInPageOpening={handleLogInPageOpening}
          onCollegeRegistrationPageOpening={
            handleCollegeRegistrationPageOpening
          }
        />
      )}
      {isLoginOpen && (
        <LoginPage
          onLogInPageClosing={handleLogInPageClosing}
          onSignUpPageOpening={handleSignUpPageOpening}
        />
      )}
      {isSignUpOpen && (
        <SignUpPage
          onLandingPageOpening={handleLandingPageOpening}
          onLogInPageOpening={handleLogInPageOpening}
        />
      )}
      {isCollegeRegistrationOpen && (
        <CollegeRegistrationPage
          onLandingPageOpening={handleLandingPageOpening}
        />
      )}
    </>
  );
}
