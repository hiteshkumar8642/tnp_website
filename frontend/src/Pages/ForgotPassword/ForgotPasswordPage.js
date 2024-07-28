import React from "react";
import Header from "../../Components/Header/Header";
import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  function handleSubmit(event) {
    event.preventDefault();
    // Add functionality to handle password reset
  }

  return (
    <>
      <Header isLoginPage>
        <Link to="/">
          <button className="nav-button">Back To Home</button>
        </Link>
      </Header>
      <div className="forgot-password-page">
        <div className="forgot-password-form">
          <h2>Forgot Password?</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Enter email" required />
            </div>
            <button type="submit">Submit</button>
          </form>
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="register-link-button">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
