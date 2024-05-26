import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../Styles/CollegeRegistrationPage.css";

export default function CollegeRegistrationPage({
  onLandingPageOpening,
  branches,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(branches);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    college: "",
    confirmCollege: "",
    subdomain: "",
    password: "",
    confirmPassword: "",
  });

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
    if (allFieldsFilled) {
      setShowModal(true);
    } else {
      alert("Please fill in all fields before proceeding.");
    }
  };

  const handleBranchClick = (branchId) => {
    setSelectedBranches((prevSelectedBranches) =>
      prevSelectedBranches.includes(branchId)
        ? prevSelectedBranches.filter((b) => b !== branchId)
        : [...prevSelectedBranches, branchId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected branches:", selectedBranches);
    setShowModal(false);
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
      <Header onLogInPageOpening={onLandingPageOpening} isLoginPage>
        Back to Home
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
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
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
