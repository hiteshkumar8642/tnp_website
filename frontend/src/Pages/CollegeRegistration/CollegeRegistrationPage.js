import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../../Components/LoadingContext/LoadingContext";
import Header from "../../Components/Header/Header";
import "./CollegeRegistrationPage.css";

const host = "http://127.0.0.1:8000";

export default function CollegeRegistrationPage() {
  const { setIsLoading } = useLoading();
  const [branches, setBranches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(branches);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    college: "",
    confirmCollege: "",
    subdomain: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(function () {
    async function fetchBranches() {
      try {
        const response = await axios.get(`${host}/dashboard/api/Course/`);
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBranches();
  }, []);

  useEffect(
    function () {
      if (showModal) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
      return () => {
        document.body.classList.remove("no-scroll");
      };
    },
    [showModal]
  );

  useEffect(
    function () {
      setFilteredBranches(
        branches.filter(
          (branch) =>
            branch.degree.toLowerCase().includes(searchInput.toLowerCase()) ||
            branch.specialization
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
      );
    },
    [searchInput, branches]
  );

  const handleProceed = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    if (formData.college !== formData.confirmCollege) {
      alert("College and Confirm College fields do not match.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password fields do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const nameRegex = /^[a-zA-Z]+$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number."
      );
      return;
    }

    if (!usernameRegex.test(formData.username)) {
      alert("Username can only contain alphanumeric characters.");
      return;
    }

    if (!nameRegex.test(formData.first_name)) {
      alert("First Name can only contain alphabetic characters.");
      return;
    }

    if (!nameRegex.test(formData.last_name)) {
      alert("Last Name can only contain alphabetic characters.");
      return;
    }

    setShowModal(true);
  };

  const handleBranchClick = (branchId) => {
    setSelectedBranches((prevSelectedBranches) =>
      prevSelectedBranches.includes(branchId)
        ? prevSelectedBranches.filter((b) => b !== branchId)
        : [...prevSelectedBranches, branchId]
    );
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const { confirmCollege, confirmPassword, ...dataToStore } = formData;
    const data = {
      ...dataToStore,
      college1: formData.college,
      college2: formData.confirmCollege,
      password1: formData.password,
      password2: formData.confirmPassword,
      branches: selectedBranches,
    };

    try {
      const response = await axios.post(
        `${host}/user/api/CollegeRegister/`,
        data
      );
      console.log("Registration successful:", response.data);
      setShowModal(false);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        college: "",
        confirmCollege: "",
        subdomain: "",
        password: "",
        confirmPassword: "",
      });
      setSelectedBranches([]);
      if (response.status === 200) {
        console.log(response);
        window.location.href = "/login";
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was an error with the registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Header isLoginPage>
        <Link to="/">
          <button className="nav-button">Back To Home</button>
        </Link>
      </Header>
      <div className="college-registration-page">
        <div className="college-registration-form">
          <h2>College Registration Form</h2>
          <form>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                required
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-university"></i>
              <input
                type="text"
                name="college"
                placeholder="College"
                required
                value={formData.college}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-university"></i>
              <input
                type="text"
                name="confirmCollege"
                placeholder="Confirm College"
                required
                value={formData.confirmCollege}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-globe"></i>
              <input
                type="text"
                name="subdomain"
                placeholder="Subdomain"
                required
                value={formData.subdomain}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={handleProceed}>
              Proceed
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h3>Select the branches in your college:</h3>
            <input
              type="text"
              className="modal-search-bar"
              placeholder="Search branches..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <form onSubmit={handleSubmit}>
              <div
                className={`branches-grid ${
                  filteredBranches.length > 25 ? "scrollable" : ""
                }`}
              >
                {filteredBranches.map((branch) => (
                  <div
                    key={branch.id}
                    className={`branch-item ${
                      selectedBranches.includes(branch.id) ? "selected" : ""
                    }`}
                    onClick={() => handleBranchClick(branch.id)}
                  >
                    {branch.degree}
                    {`(${branch.specialization})`}
                  </div>
                ))}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
