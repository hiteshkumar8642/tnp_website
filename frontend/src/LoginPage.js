import React from "react";
import Header from "./Header";

export default function LoginPage({ onLogInPageClosing }) {
  return (
    <>
      <Header onLogInPageOpening={onLogInPageClosing} isLoginPage>
        Back to Home
      </Header>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
            <span className="register-link-button">Forgot Password?</span>
          </p>
          <p className="register-link">
            Don't have an account?{" "}
            <span className="register-link-button">Register</span>
          </p>
        </div>
      </div>
    </>
  );
}
