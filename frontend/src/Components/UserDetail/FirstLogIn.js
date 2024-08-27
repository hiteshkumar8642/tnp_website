import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FirstLogIn.css";
import { fetchBranches } from "../../api/branches";
import { sendNewUserData } from "../../api/sendUserInfo";
import { toast } from "react-hot-toast";

export default function FirstLogIn() {
  const userProfile = JSON.parse(localStorage.getItem("user_Profile"));
  const name = userProfile.user.first_name;

  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [files, setFiles] = useState({
    photo: null,
    tenth_marksheet: null,
    twelfth_marksheet: null,
    graduation_marksheet: null,
    resume: null,
  });
  const [formData, setFormData] = useState({
    branch: "",
    department: "",
    registrationNumber: "",
    mobile: "",
    tenth_percentage: "",
    twelfth_percentage: "",
    graduation_cgpa: "",
    current_cgpa: "",
    backlogs: "",
    gap_after_twelfth: "",
    gap_after_graduation: "",
    portfolio_link: "",
    linkedin_profile: "",
    github_profile: "",
    codechef_profile: "",
    codeforces_profile: "",
    leetcode_profile: "",
    other_website_link: "",
  });

  useEffect(() => {
    async function getBranches() {
      try {
        const response = await fetchBranches();
        setBranches(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getBranches();
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
        setFiles((prevFiles) => ({
          ...prevFiles,
          photo: file,
        }));
      } else {
        toast.error("Please upload a .jpg or .jpeg file.");
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
      toast.error("Please upload a .pdf file.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalData = {
      ...formData,
      ...files,
    };

    try {
      const response = await sendNewUserData(finalData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Data Sent !! Wait till you are verified");
        // Reset the form
        setFormData({
          branch: "",
          department: "",
          registrationNumber: "",
          mobile: "",
          tenth_percentage: "",
          twelfth_percentage: "",
          graduation_cgpa: "",
          current_cgpa: "",
          backlogs: "",
          gap_after_twelfth: "",
          gap_after_graduation: "",
          portfolio_link: "",
          linkedin_profile: "",
          github_profile: "",
          codechef_profile: "",
          codeforces_profile: "",
          leetcode_profile: "",
          other_website_link: "",
        });
        setFiles({
          photo: null,
          tenth_marksheet: null,
          twelfth_marksheet: null,
          graduation_marksheet: null,
          resume: null,
        });
        navigate("/not-verified");
      } else {
        toast.error("Failed to send the user data.");
      }
    } catch (error) {
      toast.error("Error sending the user data");
    }
  };

  return (
    <>
      <div className="first-login-page">
        <div className="first-login-container">
          <div className="first-login-profile-section">
            <div className="first-login-photo-upload">
              <input
                type="file"
                id="photo"
                accept=".jpg, .jpeg"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo">
                {files.photo ? (
                  <img src={URL.createObjectURL(files.photo)} alt="Profile" />
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
                  name="tenth_percentage"
                  placeholder="10th Marks Percentage"
                  value={formData.tenth_percentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="tenth_marksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="tenth_marksheet">
                  {files.tenth_marksheet
                    ? files.tenth_marksheet.name
                    : "10th Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-percentage"></i>
                <input
                  type="text"
                  name="twelfth_percentage"
                  placeholder="12th Marks Percentage"
                  value={formData.twelfth_percentage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="twelfth_marksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="twelfth_marksheet">
                  {files.twelfth_marksheet
                    ? files.twelfth_marksheet.name
                    : "12th Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-graduation-cap"></i>
                <input
                  type="text"
                  name="graduation_cgpa"
                  placeholder="Graduation CGPA"
                  value={formData.graduation_cgpa}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group file-input required">
                <i className="fas fa-file-alt"></i>
                <input
                  type="file"
                  id="graduation_marksheet"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="graduation_marksheet">
                  {files.graduation_marksheet
                    ? files.graduation_marksheet.name
                    : "Graduation Marksheet"}
                </label>
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group required">
                <i className="fas fa-percentage"></i>
                <input
                  type="text"
                  name="current_cgpa"
                  placeholder="Current CGPA"
                  value={formData.current_cgpa}
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
              <div className="first-login-input-group">
                <i className="fas fa-clipboard-check"></i>
                <input
                  type="text"
                  name="backlogs"
                  placeholder="Backlogs (if any)"
                  value={formData.backlogs}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group">
                <i className="fas fa-user-clock"></i>
                <input
                  type="text"
                  name="gap_after_twelfth"
                  placeholder="Gap After 12th (in years)"
                  value={formData.gap_after_twelfth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group">
                <i className="fas fa-user-clock"></i>
                <input
                  type="text"
                  name="gap_after_graduation"
                  placeholder="Gap After Graduation (in years)"
                  value={formData.gap_after_graduation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group">
                <i className="fas fa-link"></i>
                <input
                  type="url"
                  name="portfolio_link"
                  placeholder="Portfolio Link"
                  value={formData.portfolio_link}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group">
                <i className="fab fa-linkedin"></i>
                <input
                  type="url"
                  name="linkedin_profile"
                  placeholder="LinkedIn Profile"
                  value={formData.linkedin_profile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group">
                <i className="fab fa-github"></i>
                <input
                  type="url"
                  name="github_profile"
                  placeholder="GitHub Profile"
                  value={formData.github_profile}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group">
                <i className="fas fa-link"></i>
                <input
                  type="url"
                  name="codechef_profile"
                  placeholder="CodeChef Profile"
                  value={formData.codechef_profile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group">
                <i className="fas fa-link"></i>
                <input
                  type="url"
                  name="codeforces_profile"
                  placeholder="CodeForces Profile"
                  value={formData.codeforces_profile}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="first-login-form-group">
              <div className="first-login-input-group">
                <i className="fas fa-link"></i>
                <input
                  type="url"
                  name="leetcode_profile"
                  placeholder="LeetCode Profile"
                  value={formData.leetcode_profile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="first-login-input-group">
                <i className="fas fa-link"></i>
                <input
                  type="url"
                  name="other_website_link"
                  placeholder="Other Website Link"
                  value={formData.other_website_link}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="first-login-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
