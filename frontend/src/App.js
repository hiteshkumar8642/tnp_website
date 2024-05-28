import React, { useState, useEffect } from "react";
import axios from "axios";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import CollegeRegistrationPage from "./Components/CollegeRegistrationPage";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCollegeRegistrationOpen, setIsCollegeRegistrationOpen] =
    useState(false);
  const [colleges, setColleges] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(
    function () {
      async function fetchColleges() {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/dashboard/api/College/"
          );
          setColleges(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchColleges();
    },
    [isSignUpOpen]
  );

  useEffect(
    function () {
      async function fetchBranches() {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/dashboard/api/Course/"
          );
          setBranches(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchBranches();
    },
    [isCollegeRegistrationOpen]
  );

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
          college={colleges}
        />
      )}
      {isCollegeRegistrationOpen && (
        <CollegeRegistrationPage
          onLandingPageOpening={handleLandingPageOpening}
          branches={branches}
        />
      )}
    </>
  );
}
