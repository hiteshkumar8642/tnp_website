import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { useLoading }  from "../../Components/LoadingContext/LoadingContext";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useLoading(); 


  const submit = async (e) => {
    setIsLoading(true); 
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/api/login/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      window.location.href = "/dashboard";
      
    } catch (error) {
      console.error("Login failed", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header/>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
            <Link to="/forgotPassword">
              <span className="register-link-button">Forgot Password?</span>
            </Link>
          </p>
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
