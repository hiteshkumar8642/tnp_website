import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import "./SetNewPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
//import AxiosInstance from "./AxiosInstance"

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

export default function SetNewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = useParams();
  console.log(token);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    const detail = {
      password: newPassword,
      token: token.token,
    };
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
    } else if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)."
      );
    } else {
      axios.post(`http://127.0.0.1:8000/user/api/password_reset/confirm/`,{
        password: newPassword,
        token: token.token,
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      .then((response) => {
        setMessage(response.success);
        alert("Password changed successfully!");
        navigate("/login");
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
      });
      
    }
  }

  return (
    <>
      <Header />
      <div className="set-new-password-page">
        <div className="set-new-password-form">
          <h2>Set New Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
