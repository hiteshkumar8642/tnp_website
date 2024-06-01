import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../Styles/FirstLogIn.css";

export default function FirstLogIn({ onLandingPageOpening }) {
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

  const Name = "Jhon";

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/dashboard/api/Course/"
        );
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBranches();
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
  };

  return (
    <>
      <Header onLogInPageOpening={onLandingPageOpening} isLoginPage>
        Back to Home
      </Header>
      <div className="form-page">
        <div className="form-container">
          <div className="profile-section">
            <div className="photo-upload">
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
            <div className="user-name">
              <h2>{Name}</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-group required">
                <i className="fas fa-university"></i>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">---Select Degree---</option>
                  {uniqueDegrees.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group required">
                <i className="fas fa-building"></i>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
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
            <div className="form-group">
              <div className="input-group required">
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
              <div className="input-group required">
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
            <div className="form-group">
              <div className="input-group required">
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
              <div className="input-group file-input required">
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
            <div className="form-group">
              <div className="input-group required">
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
              <div className="input-group file-input required">
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
            <div className="form-group">
              <div className="input-group required">
                <i className="fas fa-graduation-cap"></i>
                <input
                  type="text"
                  name="graduationCGPA"
                  placeholder=" Graduation CGPA"
                  value={formData.graduationCGPA}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group file-input required">
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
            <div className="form-group">
              <div className="input-group required">
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
              <div className="input-group file-input required">
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
            <div className="form-group">
              <div className="input-group required">
                <i className="fas fa-tasks"></i>
                <input
                  type="text"
                  name="backlogs"
                  placeholder="No of Backlogs"
                  value={formData.backlogs}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group required">
                <i className="fas fa-clock"></i>
                <input
                  type="text"
                  name="gapAfter12th"
                  placeholder="Gap after 12th"
                  value={formData.gapAfter12th}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group required">
                <i className="fas fa-clock"></i>
                <input
                  type="text"
                  name="gapAfterGraduation"
                  placeholder="Gap after graduation"
                  value={formData.gapAfterGraduation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-briefcase"></i>
                <input
                  type="text"
                  name="portfolio"
                  placeholder="Portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group required">
                <i className="fab fa-linkedin"></i>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="LinkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group required">
                <i className="fab fa-github"></i>
                <input
                  type="text"
                  name="github"
                  placeholder="Github"
                  value={formData.github}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-code"></i>
                <input
                  type="text"
                  name="codeChef"
                  placeholder=" CodeChef"
                  value={formData.codeChef}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-code"></i>
                <input
                  type="text"
                  name="codeforces"
                  placeholder=" Codeforces"
                  value={formData.codeforces}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <i className="fas fa-code"></i>
                <input
                  type="text"
                  name="leetcode"
                  placeholder=" Leetcode"
                  value={formData.leetcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-globe"></i>
                <input
                  type="text"
                  name="website"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleInputChange}
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
