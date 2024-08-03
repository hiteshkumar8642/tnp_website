import React, { useState } from "react";
import "./ShareCompanyContact.css";

function SharedCompanyContact() {
  return <CompanyContactForm />;
}

export default SharedCompanyContact;

const CompanyContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    contactNumber: "",
    ctc: "",
    type: {
      intern: false,
      summerIntern: false,
      fte: false,
    },
    collegeVisited: "",
    companyType: "FTE",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        type: {
          ...prevData.type,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="company-form-container">
      <h2>Company Contacts</h2>
      <form onSubmit={handleSubmit} className="company-contact-form">
        <label className="grid-item">
          Company Name
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </label>
        <label className="grid-item">
          Company Email
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
          />
        </label>
        <label className="grid-item">
          Contact Number
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>
        <label className="grid-item">
          CTC
          <input
            type="text"
            name="ctc"
            value={formData.ctc}
            onChange={handleChange}
          />
        </label>
        <div className="checkbox-group grid-item">
          <span>Type</span>
          <label>
            <input
              type="checkbox"
              name="intern"
              checked={formData.type.intern}
              onChange={handleChange}
            />
            Intern
          </label>
          <label>
            <input
              type="checkbox"
              name="summerIntern"
              checked={formData.type.summerIntern}
              onChange={handleChange}
            />
            SummerIntern
          </label>
          <label>
            <input
              type="checkbox"
              name="fte"
              checked={formData.type.fte}
              onChange={handleChange}
            />
            FTE
          </label>
        </div>
        <label className="grid-item">
          College Visited
          <input
            type="text"
            name="collegeVisited"
            value={formData.collegeVisited}
            onChange={handleChange}
          />
        </label>
        <label className="grid-item">
          If Company is for FTE
          <select
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
          >
            <option value="FTE">FTE</option>
            <option value="Intern">Intern</option>
            <option value="Intern+PPO">Intern + PPO</option>
          </select>
        </label>
        <label className="grid-item">
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <div className="grid-item grid-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
