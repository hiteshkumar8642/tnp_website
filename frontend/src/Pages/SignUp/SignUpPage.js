import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../Components/LoadingContext/LoadingContext";
import Header from "../../Components/Header/Header";
import "./SignUpPage.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchCollegeList } from "../../api/fetchCollgeList";
import { Signup } from "../../api/signInApi";
import { fetchExistingUsers } from "../../api/existingUser";

export default function SignUpPage() {
  const Navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [college, setCollege] = useState([]);
  const [userList, setUserList] = useState([]);
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
        const response = await fetchCollegeList();
        setCollege(response);
      } catch (error) {
        console.error("Error fetching Colleges", error);
      }
    }
    fetchColleges();
  }, []);

  useEffect(function () {
    async function fetchUsers() {
      try {
        const response = await fetchExistingUsers();
        setUserList(response);
      } catch (error) {
        console.error("Error fetching Users", error);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const isUserEmailExists = () => {
    return userList.length === 0
      ? false
      : userList.some((user) => user.email === formData.email);
  };

  const isUserNameExists = () => {
    return userList.length === 0
      ? false
      : userList.some((user) => user.username === formData.username);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!validateUsername(formData.username)) {
      toast.error("Username can only contain alphanumeric characters!");
      setIsLoading(false);
      return;
    }

    if (!validateName(formData.first_name)) {
      toast.error("First name can only contain alphabetic characters!");
      setIsLoading(false);
      return;
    }

    if (!validateName(formData.last_name)) {
      toast.error("Last name can only contain alphabetic characters!");
      setIsLoading(false);
      return;
    }

    if (isUserNameExists()) {
      toast.error("Username already exists!");
      setIsLoading(false);
      return;
    }

    if (isUserEmailExists()) {
      toast.error("Email already exists!");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password1)) {
      toast.error(
        "Password must be at least 6 characters long, include an uppercase letter, a number, and a special character!"
      );
      setIsLoading(false);
      return;
    }

    if (formData.password1 !== formData.password2) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await Signup(formData);
      if (response.status === 201) {
        Navigate("/login");
        toast.success("Registered successfully! Confirm email to login.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error registering user:", error.response.data);
        toast.error("Error signing up!");
      } else {
        console.error("Error registering user:", error.message);
        toast.error("Error signing up!");
      }
    } finally {
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
                {college.length === 0
                  ? null
                  : college.map((col) => (
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
