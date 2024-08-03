// HRContactForm.js
import React, { useState } from "react";
import "./HRContactForm.css";

function SharedHrContact() {
  return <HRContactForm />;
}

export default SharedHrContact;
const HRContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    gender: "",
    email: "",
    linkedinId: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>HR Contact</h2>
      <form onSubmit={handleSubmit} className="hr-contactinfo-form">
        <label>
          Company Name
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          LinkedIn ID
          <input
            type="text"
            name="linkedinId"
            value={formData.linkedinId}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact Number
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
