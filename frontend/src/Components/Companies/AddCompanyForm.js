import React, { useState, useEffect } from "react";
import "./AddCompanyForm.css";
import { fetchBranches } from "../../api/branches";

function AddCompanyForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
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
      console.log(branches);
      setBranches(data);
    }
    fetchBranchData();
  }, [branches]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>Last Date:</label>
          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleInputChange}
          />

          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
          />

          <label>Predicted Visit Date:</label>
          <input
            type="date"
            name="predictedVisitDate"
            value={formData.predictedVisitDate}
            onChange={handleInputChange}
          />

          <label>Twelfth Marks Eligibility:</label>
          <input
            type="number"
            name="twelfthMarksEligibility"
            value={formData.twelfthMarksEligibility}
            onChange={handleInputChange}
          />

          <label>Tenth Marks Eligibility:</label>
          <input
            type="number"
            name="tenthMarksEligibility"
            value={formData.tenthMarksEligibility}
            onChange={handleInputChange}
          />

          <label>POC Branch:</label>
          <input
            type="text"
            name="pocBranch"
            value={formData.pocBranch}
            onChange={handleInputChange}
          />

          <label>Job Description:</label>
          <input
            type="file"
            name="jobDescription"
            onChange={handleFileChange}
          />

          <label>
            Intern:
            <input
              type="checkbox"
              name="intern"
              checked={formData.intern}
              onChange={handleInputChange}
            />
          </label>

          <label>
            FTE:
            <input
              type="checkbox"
              name="fte"
              checked={formData.fte}
              onChange={handleInputChange}
            />
          </label>

          <label>
            PPO:
            <input
              type="checkbox"
              name="ppo"
              checked={formData.ppo}
              onChange={handleInputChange}
            />
          </label>

          <label>
            SPP:
            <input
              type="checkbox"
              name="spp"
              checked={formData.spp}
              onChange={handleInputChange}
            />
          </label>

          <label>
            SIP:
            <input
              type="checkbox"
              name="sip"
              checked={formData.sip}
              onChange={handleInputChange}
            />
          </label>

          <label>Allowed Gap After 12:</label>
          <input
            type="number"
            name="allowedGapAfter12"
            value={formData.allowedGapAfter12}
            onChange={handleInputChange}
          />

          <label>Allowed Gap After Graduation:</label>
          <input
            type="number"
            name="allowedGapAfterGraduation"
            value={formData.allowedGapAfterGraduation}
            onChange={handleInputChange}
          />

          <label>Allowed Backlog:</label>
          <input
            type="number"
            name="allowedBacklog"
            value={formData.allowedBacklog}
            onChange={handleInputChange}
          />

          <label>Min Graduation Marks:</label>
          <input
            type="number"
            name="minGraduationMarks"
            value={formData.minGraduationMarks}
            onChange={handleInputChange}
          />

          <label>Min CGPA:</label>
          <input
            type="number"
            name="minCgpa"
            value={formData.minCgpa}
            onChange={handleInputChange}
          />

          <label>Allowed Branches:</label>
          <select
            name="allowedBranches"
            multiple
            value={formData.allowedBranches}
            onChange={(e) =>
              setFormData({
                ...formData,
                allowedBranches: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
          >
            {branches.map((branch) => (
              <option key={branch} value={branch.specializations}>
                {branch.degree}
                {`(${branch.specialization})`}
              </option>
            ))}
          </select>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyForm;
