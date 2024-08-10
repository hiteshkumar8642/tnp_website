import { fetchForgetPassword } from "../../api/forgetPassword";
import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import "./ForgotPasswordPage.css";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLoading } from "../../Components/LoadingContext/LoadingContext";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoading } = useLoading();

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    fetchForgetPassword(email)
      .then((response) => {
        setIsLoading(false);
        toast.success("We have sent a reset password link to your mail !",{autoClose : 10000});
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong",);
        setMessage("An error occurred. Please try again.");
      });
  }

  return (
    <>
      <Header />
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
                onChange={(e) => setEmail(e.target.value)}
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
