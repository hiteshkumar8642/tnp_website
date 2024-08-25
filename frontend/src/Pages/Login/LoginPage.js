import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { useLoading } from "../../Components/LoadingContext/LoadingContext";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { login } from "../../api/loginApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useLoading();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await login(user);

      const { access_token, refresh_token, user_detail, user_profile } =
        response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user_detail", JSON.stringify(user_detail));
      localStorage.setItem("user_Profile", JSON.stringify(user_profile));
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      if (user_profile?.role === 4 || user_detail !== null) {
        navigate("/dashboard");
      } else {
        navigate("/firstlogin");
      }

      toast.success("Login successful", { autoClose: 5000 });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/401");
        toast.error("Unauthorized");
      } else {
        console.error("Login failed", error);
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="User Name"
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
