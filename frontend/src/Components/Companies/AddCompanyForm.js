import React, { useState, useEffect } from "react";
import "./AddCompanyForm.css";
import { fetchBranches } from "../../api/branches";
import { fetchCompanyList } from "../../api/fetchCompanyList";
import MultiSelect from "./MultiSelect";

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
    <div className="add-company-modal overflow-auto">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-field">
              <label>Company Name:</label>
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
                name="last_date"
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

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-field">
              <label>Predicted Visit Date:</label>
              <input
                type="date"
                name="predicted_visit_date"
                value={formData.predicted_visit_date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>12th Marks Eligibility:</label>
              <input
                type="number"
                name="twelfth_marks_eligibility"
                value={formData.twelfth_marks_eligibility}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>10th Marks Eligibility:</label>
              <input
                type="number"
                name="tenth_marks_eligibility"
                value={formData.tenth_marks_eligibility}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-field">
              <label>Job Description:</label>
              <input
                type="file"
                name="job_description"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-field">
              <MultiSelect formData={formData} setFormData={setFormData} handleInputChange={handleInputChange}/>
            </div>

            <div className="form-field">
              <label>12th Gap:</label>
              <input
                type="text"
                name="twelfth_gap"
                value={formData.twelfth_gap}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="form-row">

            <div className="form-field">
              <label>Graduation Gap:</label>
              <input
                type="text"
                name="graduation_gap"
                value={formData.graduation_gap}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Backlogs:</label>
              <input
                type="text"
                name="backlogs"
                value={formData.backlogs}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Graduation Marks:</label>
              <input
                type="text"
                name="graduation_marks"
                value={formData.graduation_marks}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 6 */}
          <div className="form-row">
            

            <div className="form-field">
              <label>Current CGPA:</label>
              <input
                type="text"
                name="current_cgpa"
                value={formData.current_cgpa}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 7 */}
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
