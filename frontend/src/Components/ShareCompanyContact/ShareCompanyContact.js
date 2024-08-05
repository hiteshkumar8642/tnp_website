import React, { useState } from "react";
import "./ShareCompanyContact.css";
import MultiSelectComponent from "./MultiSelectComponent";

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
      ppo: false,
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
      <h2 className="text-3xl text-center pb-6">Company Contacts</h2>
      <form onSubmit={handleSubmit} className="company-contact-form flex flex-col w-10/12 mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 gap-x-36 ">
            <label className="flex flex-col text-lg w-fit">
              Company Name
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col text-lg w-fit">
              Company Email
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col text-lg w-fit">
              Contact Number
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col text-lg w-fit">
              CTC
              <input
                type="text"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <label className="flex flex-col w-fit text-lg">
              College Visited
              <input
                type="text"
                name="collegeVisited"
                value={formData.collegeVisited}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
            <div>
              <MultiSelectComponent/>
            </div>
            <label className="flex flex-col text-lg w-fit">
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="outline outline-1 hover:outline-2 rounded-sm py-2 pr-10 pl-1"
              />
            </label>
        </div>
        <div className="grid-item grid-submit">
          <button type="submit" className="mt-6 text-xl text-white bg-black py-3 px-8 rounded-full w-fit object-center justify-items-center md:relative md:left-[45%] hover:scale-105 transition-all">Submit</button>
        </div>
      </form>
    </div>
  );
};
