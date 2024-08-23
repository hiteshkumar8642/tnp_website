import React, { useState } from "react";
import "./ShareCompanyContact.css";
import MultiSelectComponent from "./MultiSelectComponent";
import { toast } from "react-hot-toast";
import { useLoading } from "../../Components/LoadingContext/LoadingContext";
import { sendSharedCompany } from "../../api/sendSharedCompany";

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
    location: "",
  });
  const { setIsLoading } = useLoading();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      const response = await sendSharedCompany(formData);

      if (response.status === 201) {
        // Handle success response
        console.log("Form submitted successfully!");
        setIsLoading(false);
        // Optionally, reset the form or provide user feedback
        toast.success("Company added !");
        setFormData({
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
          location: "",
        });
      } else {
        // Handle error response
        setIsLoading(false);
        console.log("Failed to submit the form.");
        toast.error("Something went wrong.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong.");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="company-form-container h-fit">
      <h2 className="text-3xl text-center pb-6">Company Contacts</h2>
      <form
        onSubmit={handleSubmit}
        className="company-contact-form flex flex-col w-10/12 mx-auto"
      >
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
            <MultiSelectComponent />
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
        <div className="pb-24">
          <button
            type="submit"
            className="mt-6 text-xl text-white bg-black py-3 px-8 rounded-full w-fit object-center justify-items-center md:relative md:left-[45%] hover:scale-105 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
