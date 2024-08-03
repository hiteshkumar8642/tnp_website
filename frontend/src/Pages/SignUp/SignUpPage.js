import React, { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";
import { useLoading }  from "../../Components/LoadingContext/LoadingContext";
import Header from "../../Components/Header/Header";
import "./SignUpPage.css";

const host = "http://127.0.0.1:8000";

export default function SignUpPage() {
  const { setIsLoading } = useLoading();
  const [college, setCollege] = useState([]);
  const [formData, setFormData] = useState({
    college: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  useEffect(function () {
    async function fetchColleges() {
      try {
        const response = await axios.get(`${host}/dashboard/api/College/`);
        setCollege(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post(`${host}/user/api/register/`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        window.location.href = "/login";
        alert("Registered successfully ! Confirm email to login .");
        //return;
      }
    } catch (error) {
      if (error.response) {
        console.error("Error registering user:", error.response.data);
      } else {
        console.error("Error registering user:", error.message);
      }
    }
    finally{
      setIsLoading(false);
    }
  };


  return (
    <>
      <Header isLoginPage>
        <Link to="/">
          <button className="nav-button">Back To Home</button>
        </Link>
      </Header>
      <div className="signup-page">
        <div className="signup-form">
          <h2>Register Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group">
              <i className="fas fa-university"></i>
              <select
                name="college"
                required
                value={formData.college}
                onChange={handleChange}
              >
                <option value="">---Select your college---</option>
                {college.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="first_name"
                placeholder="First name..."
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="last_name"
                placeholder="Last name..."
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                name="username"
                placeholder="RegistrationNO..."
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email..."
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password1"
                placeholder="Enter password..."
                required
                value={formData.password1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password2"
                placeholder="Re-enter Password..."
                required
                value={formData.password2}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Register Account</button>
          </form>
          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">
              <span className="login-link-button">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
