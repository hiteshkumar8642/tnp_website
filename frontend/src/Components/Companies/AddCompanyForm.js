import React, { useState, useEffect } from "react";
import "./AddCompanyForm.css";
import { fetchBranches } from "../../api/branches";

function AddCompanyForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    lastDate: "",
    position: "",
    predictedVisitDate: "",
    twelfthMarksEligibility: "",
    tenthMarksEligibility: "",
    pocBranch: "",
    jobDescription: null,
    intern: false,
    fte: false,
    ppo: false,
    spp: false,
    sip: false,
    allowedGapAfter12: "",
    allowedGapAfterGraduation: "",
    allowedBacklog: "",
    minGraduationMarks: "",
    minCgpa: "",
    allowedBranches: [],
  });

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchBranchData() {
      const data = await fetchBranches();
      setBranches(data);
    }
    fetchBranchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, jobDescription: e.target.files[0] });
  };

  const handleBranchChange = (branch) => {
    const updatedBranches = formData.allowedBranches.includes(branch)
      ? formData.allowedBranches.filter((b) => b !== branch)
      : [...formData.allowedBranches, branch];
    setFormData({ ...formData, allowedBranches: updatedBranches });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData);
    onClose();
  };

  return (
    <div className="add-company-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Last Date:</label>
              <input
                type="date"
                name="lastDate"
                value={formData.lastDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Predicted Visit Date:</label>
              <input
                type="date"
                name="predictedVisitDate"
                value={formData.predictedVisitDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Twelfth Marks Eligibility:</label>
              <input
                type="number"
                name="twelfthMarksEligibility"
                value={formData.twelfthMarksEligibility}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Tenth Marks Eligibility:</label>
              <input
                type="number"
                name="tenthMarksEligibility"
                value={formData.tenthMarksEligibility}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>POC Branch:</label>
              <input
                type="text"
                name="pocBranch"
                value={formData.pocBranch}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Job Description:</label>
              <input
                type="file"
                name="jobDescription"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-field checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="intern"
                  checked={formData.intern}
                  onChange={handleInputChange}
                />
                Intern
              </label>
              <label>
                <input
                  type="checkbox"
                  name="fte"
                  checked={formData.fte}
                  onChange={handleInputChange}
                />
                FTE
              </label>
              <label>
                <input
                  type="checkbox"
                  name="ppo"
                  checked={formData.ppo}
                  onChange={handleInputChange}
                />
                PPO
              </label>
              <label>
                <input
                  type="checkbox"
                  name="spp"
                  checked={formData.spp}
                  onChange={handleInputChange}
                />
                SPP
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sip"
                  checked={formData.sip}
                  onChange={handleInputChange}
                />
                SIP
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Allowed Gap After 12:</label>
              <input
                type="number"
                name="allowedGapAfter12"
                value={formData.allowedGapAfter12}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Allowed Gap After Graduation:</label>
              <input
                type="number"
                name="allowedGapAfterGraduation"
                value={formData.allowedGapAfterGraduation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Allowed Backlog:</label>
              <input
                type="number"
                name="allowedBacklog"
                value={formData.allowedBacklog}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Min Graduation Marks:</label>
              <input
                type="number"
                name="minGraduationMarks"
                value={formData.minGraduationMarks}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Min CGPA:</label>
              <input
                type="number"
                name="minCgpa"
                value={formData.minCgpa}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full-width">
              <label>Allowed Branches:</label>
              <div className="branch-checkboxes">
                {branches.map((branch) => (
                  <label key={branch.id}>
                    <input
                      type="checkbox"
                      checked={formData.allowedBranches.includes(branch.id)}
                      onChange={() => handleBranchChange(branch.id)}
                    />
                    {branch.degree} ({branch.specialization})
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyForm;
