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
    <div className="form-container w-11/12 mx-auto ">
      <h2 className="text-3xl text-center pb-6">HR Contact</h2>
      <form onSubmit={handleSubmit} className="hr-contactinfo-form w-10/12 mx-auto flex flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 gap-x-36">
            <label className="flex flex-col text-xl w-fit">
              Company Name
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col mr-12 text-xl w-fit">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col mr-12 text-xl w-fit">
              Gender
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col mr-12 text-xl w-fit">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col mr-12 text-xl w-fit">
              LinkedIn ID
              <input
                type="text"
                name="linkedinId"
                value={formData.linkedinId}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col mr-12 text-xl w-fit">
              Contact Number
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
        </div>
        <button type="submit" className="mt-6 text-xl text-white bg-black py-3 px-8 rounded-full w-fit object-center justify-items-center md:relative md:left-[45%] hover:scale-105 transition-all">Submit</button>
      </form>
    </div>
  );
};
