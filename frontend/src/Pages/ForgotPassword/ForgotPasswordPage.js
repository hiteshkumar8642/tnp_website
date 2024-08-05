import { fetchForgetPassword } from '../../api/forgetPassword';
import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import "./ForgotPasswordPage.css";
import { Link } from "react-router-dom";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetchForgetPassword(email)
      .then(response => {
        setMessage(response.success);
      })
      .catch(error => {
        setMessage("An error occurred. Please try again.");
      });
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
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          {message && <p className="message">{message}</p>}
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