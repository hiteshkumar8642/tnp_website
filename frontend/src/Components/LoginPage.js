import React from "react";
import Header from "./Header";

export default function LoginPage({ onLogInPageClosing, onSignUpPageOpening }) {
  return (
    <>
      <Header onLogInPageOpening={onLogInPageClosing} isLoginPage>
        Back to Home
      </Header>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
            <span className="register-link-button">Forgot Password?</span>
          </p>
          <p className="register-link">
            Don't have an account?{" "}
            <span
              className="register-link-button"
              onClick={onSignUpPageOpening}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
