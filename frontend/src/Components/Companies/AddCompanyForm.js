import React, { useState, useEffect } from "react";
import "./AddCompanyForm.css";
import { fetchBranches } from "../../api/branches";
import { fetchCompanyList } from "../../api/fetchCompanyList";

function AddCompanyForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    company_id: "",
    last_date: "",
    position: "",
    predicted_visit_date: "",
    twelfth_marks_eligibility: "",
    tenth_marks_eligibility: "",
    job_description: null,
    is_intern: false,
    is_fte: false,
    is_ppo: false,
    is_spp: false,
    is_sip: false,
    twelfth_gap: "",
    graduation_gap: "",
    backlogs: "",
    graduation_marks: "",
    current_cgpa: "",
    college_branch_id: [],
  });

  const [branches, setBranches] = useState([]);
  const [listedCompanies, setListedCompanies] = useState([]);

  useEffect(() => {
    async function fetchBranchData() {
      const data = await fetchBranches();
      setBranches(data);
    }

    fetchBranchData();
  }, []);

  useEffect(() => {
    async function fetchCompany() {
      const data = await fetchCompanyList();
      setListedCompanies(data);
    }
    fetchCompany();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, job_description: e.target.files[0] });
  };

  const handleBranchChange = (branch) => {
    const updatedBranches = formData.college_branch_id.includes(branch)
      ? formData.college_branch_id.filter((b) => b !== branch)
      : [...formData.college_branch_id, branch];
    setFormData({ ...formData, college_branch_id: updatedBranches });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
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
              <select
                name="company_id"
                required
                value={formData.company_id}
                onChange={handleInputChange}
              >
                <option value="">Select Company</option>
                {listedCompanies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Last Date:</label>
              <input
                type="date"
                name=" last_date"
                value={formData.last_date}
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
                name=" predicted_visit_date"
                value={formData.predicted_visit_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Twelfth Marks Eligibility:</label>
              <input
                type="number"
                name="twelfth_marks_eligibility"
                value={formData.twelfth_marks_eligibility}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Tenth Marks Eligibility:</label>
              <input
                type="number"
                name="tenth_marks_eligibility"
                value={formData.tenth_marks_eligibility}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Job Description:</label>
              <input
                type="file"
                name="job_description"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-field checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="is_intern"
                  checked={formData.is_intern}
                  onChange={handleInputChange}
                />
                Intern
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_fte"
                  checked={formData.is_fte}
                  onChange={handleInputChange}
                />
                FTE
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_ppo"
                  checked={formData.is_ppo}
                  onChange={handleInputChange}
                />
                PPO
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_spp"
                  checked={formData.is_spp}
                  onChange={handleInputChange}
                />
                SPP
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_sip"
                  checked={formData.is_sip}
                  onChange={handleInputChange}
                />
                SIP
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Allowed Gap Ais_fter 12:</label>
              <input
                type="number"
                name="twelfth_gap"
                value={formData.twelfth_gap}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Allowed Gap Ais_fter Graduation:</label>
              <input
                type="number"
                name="graduation_gap"
                value={formData.graduation_gap}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Allowed Backlog:</label>
              <input
                type="number"
                name="backlogs"
                value={formData.backlogs}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Min Graduation Marks:</label>
              <input
                type="number"
                name="graduation_marks"
                value={formData.graduation_marks}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label>Min CGPA:</label>
              <input
                type="number"
                name="current_cgpa"
                value={formData.current_cgpa}
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
                      checked={formData.college_branch_id.includes(branch.id)}
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
