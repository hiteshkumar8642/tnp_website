import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FirstLogIn.css";

export default function FirstLogIn() {
  const [branches, setBranches] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [files, setFiles] = useState({
    tenthMarksheet: null,
    twelfthMarksheet: null,
    graduationMarksheet: null,
    resume: null,
  });
  const [formData, setFormData] = useState({
    branch: "",
    department: "",
    registrationNumber: "",
    mobile: "",
    tenthMarksPercentage: "",
    twelfthMarksPercentage: "",
    graduationCGPA: "",
    currentCGPA: "",
    backlogs: "",
    gapAfter12th: "",
    gapAfterGraduation: "",
    portfolio: "",
    linkedIn: "",
    github: "",
    codeChef: "",
    codeforces: "",
    leetcode: "",
    website: "",
  });
  const [name, setName] = useState("Jhon");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/Course/"
        );
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBranches();

    // Extract user name from localStorage
    const userProfile = JSON.parse(localStorage.getItem("user_Profile"));
    if (userProfile && userProfile.length > 0) {
      const userName = userProfile[0].user.first_name;
      setName(userName);
    }
  }, []);

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };

  const uniqueDegrees = getUniqueValues(branches, "degree");
  const uniqueDepartments = getUniqueValues(branches, "specialization");

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        setPhoto(URL.createObjectURL(file));
      } else {
        alert("Please upload a .jpg or .jpeg file.");
      }
    }
  };

  const handleFileChange = (event) => {
    const { id, files } = event.target;
    if (files[0].type === "application/pdf") {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: files[0],
      }));
    } else {
      alert("Please upload a .pdf file.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      files,
      photo,
    };
    console.log(finalData);
    // Reset the form
    setFormData({
      branch: "",
      department: "",
      registrationNumber: "",
      mobile: "",
      tenthMarksPercentage: "",
      twelfthMarksPercentage: "",
      graduationCGPA: "",
      currentCGPA: "",
      backlogs: "",
      gapAfter12th: "",
      gapAfterGraduation: "",
      portfolio: "",
      linkedIn: "",
      github: "",
      codeChef: "",
      codeforces: "",
      leetcode: "",
      website: "",
    });
    setFiles({
      tenthMarksheet: null,
      twelfthMarksheet: null,
      graduationMarksheet: null,
      resume: null,
    });
    setPhoto(null);
    navigate("/401");
  };

  return (
    <>
      <div className="first-login-page">
        <div className="first-login-container">
          <div className="first-login-profile-section">
            <div className="first-login-photo-upload">
              <input
                type="file"
                id="photo-upload"
                accept=".jpg, .jpeg"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo-upload">
                {photo ? (
                  <img src={photo} alt="Profile" />
                ) : (
                  <i className="fas fa-camera"></i>
                )}
              </label>
            </div>
            <div className="first-login-user-name">
              <h2>{name}</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-university"></i>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                >
                  <option value="">---Select Degree---</option>
                  {uniqueDegrees.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              <div className="first-login-input-group required">
                <i className="fas fa-building"></i>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">---Select Department---</option>
                  {uniqueDepartments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-id-badge"></i>
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Registration Number"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fas fa-phone"></i>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-percentage"></i>
                <input
                  type="text"
                  name="tenthMarksPercentage"
                  placeholder="10th Marks Percentage"
                  value={formData.tenthMarksPercentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="tenthMarksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="tenthMarksheet">
                  {files.tenthMarksheet
                    ? files.tenthMarksheet.name
                    : "10th Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-percentage"></i>
                <input
                  type="text"
                  name="twelfthMarksPercentage"
                  placeholder="12th Marks Percentage"
                  value={formData.twelfthMarksPercentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="twelfthMarksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="twelfthMarksheet">
                  {files.twelfthMarksheet
                    ? files.twelfthMarksheet.name
                    : "12th Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-graduation-cap"></i>
                <input
                  type="text"
                  name="graduationCGPA"
                  placeholder="Graduation CGPA"
                  value={formData.graduationCGPA}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="graduationMarksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="graduationMarksheet">
                  {files.graduationMarksheet
                    ? files.graduationMarksheet.name
                    : "Graduation Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-chart-line"></i>
                <input
                  type="text"
                  name="currentCGPA"
                  placeholder="Current CGPA"
                  value={formData.currentCGPA}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="resume">
                  {files.resume ? files.resume.name : "Resume"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-exclamation-triangle"></i>
                <input
                  type="text"
                  name="backlogs"
                  placeholder="Backlogs"
                  value={formData.backlogs}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fas fa-calendar-day"></i>
                <input
                  type="text"
                  name="gapAfter12th"
                  placeholder="Gap After 12th"
                  value={formData.gapAfter12th}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-calendar-day"></i>
                <input
                  type="text"
                  name="gapAfterGraduation"
                  placeholder="Gap After Graduation"
                  value={formData.gapAfterGraduation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fas fa-link"></i>
                <input
                  type="text"
                  name="portfolio"
                  placeholder="Portfolio URL"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fab fa-linkedin"></i>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="LinkedIn URL"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fab fa-github"></i>
                <input
                  type="text"
                  name="github"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fab fa-codechef"></i>
                <input
                  type="text"
                  name="codeChef"
                  placeholder="CodeChef URL"
                  value={formData.codeChef}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fab fa-codeforces"></i>
                <input
                  type="text"
                  name="codeforces"
                  placeholder="Codeforces URL"
                  value={formData.codeforces}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fab fa-leetcode"></i>
                <input
                  type="text"
                  name="leetcode"
                  placeholder="LeetCode URL"
                  value={formData.leetcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group required">
                <i className="fas fa-globe"></i>
                <input
                  type="text"
                  name="website"
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
