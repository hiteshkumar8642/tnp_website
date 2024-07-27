import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onLogInPageClosing, onSignUpPageOpening }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/api/login/', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      window.location.href = '/';
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Header onLogInPageOpening={onLogInPageClosing} isLoginPage>
        <Link to="/">
          <button className="nav-button">Back To Home</button>
        </Link>
      </Header>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" required 
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
            <span className="register-link-button">Forgot Password?</span>
          </p>
          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/signup">
              <span
                className="register-link-button"
                onClick={onSignUpPageOpening}
              >
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
