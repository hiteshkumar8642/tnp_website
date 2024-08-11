import React, { useState, useEffect } from "react";
import { fetchAppliedCompanies } from "../../api/appliedCompanies";

function formatDate(inputDate) {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];

  // Determine the appropriate suffix for the day
  const suffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${monthName}, ${year}`;
}

function daysLeft(lastDate) {
  const today = new Date();
  const endDate = new Date(lastDate);

  if (isNaN(endDate.getTime())) {
    return "Invalid Date";
  }

  const diffTime = endDate - today; // Difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (diffDays < 0) {
    return "Closed";
  } else {
    return `${diffDays} days`;
  }
}

const AppliedCompanyCard = ({ company, onClick, isActive }) => {
  const { company_id, position, is_fte, is_ppo, is_intern } = company || {};
  const companyName = company_id?.name || "Unknown Company";

  return (
    <div
      onClick={() => onClick(company)}
      className={`p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mt-2">{companyName}</h2>
      <p className="text-gray-600">{position}</p>
      <div className="flex justify-between items-center mt-2">
        {is_fte && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            FTE
          </span>
        )}
        {is_ppo && (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            PPO
          </span>
        )}
        {is_intern && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Intern
          </span>
        )}
      </div>
    </div>
  );
};

const AppliedCompanyDetails = ({ company, onBack }) => {
  console.log(company);
  const { company_id, position, is_spp, is_sip, last_date } = company || {};
  const companyName = company_id?.name || "Unknown Company";
  const generalCTC = company_id?.general_ctc || "N/A";

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Back
      </button>
      <div className="flex items-center">
        <div>
          <h2 className="text-2xl font-bold">{companyName}</h2>
          <p className="text-blue-500">{position}</p>
          <p className="text-gray-500">
            {is_spp ? `SPP` : ``}
            {is_spp && is_sip ? ` | ` : ``}
            {is_sip ? `SIP` : ``}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Last Date: {formatDate(last_date)}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Time Left: {daysLeft(last_date)}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          CTC: {generalCTC} LPA
        </span>
        {/* <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Offer Salary: {position}
        </span> */}
      </div>
      {/* <p className="mt-4 text-gray-600">{generalCTC}</p> */}
      {/* <p className="mt-2 text-gray-600">Posted {position} ago</p> */}
    </div>
  );
};

const AppliedCompanyList = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applied, setApplied] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAppliedCompanies() {
      try {
        const storedAppliedCompanies = localStorage.getItem("appliedCompanies");
        if (storedAppliedCompanies) {
          setApplied(JSON.parse(storedAppliedCompanies));
        } else {
          const data = await fetchAppliedCompanies();
          setApplied(data);
          localStorage.setItem("appliedCompanies", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Applied Companies");
        console.error(err);
      }
    }
    getAppliedCompanies();
  }, []);

  const handleBack = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div className="flex">
        <div
          className={`${
            selectedCompany ? "w-1/3 hidden sm:block" : "w-fit"
          } transition-all duration-300 bg-gray-100 p-4 h-screen overflow-y-auto`}
        >
          <div
            className={`grid ${
              selectedCompany
                ? "grid-cols-1"
                : "lg:grid-cols-5 h-fit md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
            } gap-x-4`}
          >
            {applied.map((company, index) => (
              <AppliedCompanyCard
                key={index}
                company={company.application_id}
                onClick={setSelectedCompany}
                isActive={
                  selectedCompany &&
                  selectedCompany.id === company.application_id?.id
                }
              />
            ))}
          </div>
        </div>
        {selectedCompany && (
          <div className="sm:w-2/3 bg-gray-50 p-6 transition-all duration-300 w-full">
            <AppliedCompanyDetails
              company={selectedCompany}
              onBack={handleBack}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedCompanyList;

// import React, { useEffect, useState } from "react";
// import { timeanddate } from "../../utils/timeanddate";
// import { fetchAppliedCompanies } from "../../api/appliedCompanies";
// import CompanyItem from "../CompanyItem/CompanyItem";

// function AppliedCompanies() {
//   const [applied, setApplied] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function getAppliedCompanies() {
//       try {
//         // Check if data is already in local storage
//         const storedAppliedCompanies = localStorage.getItem("appliedCompanies");
//         if (storedAppliedCompanies) {
//           setApplied(JSON.parse(storedAppliedCompanies));
//         } else {
//           // Fetch data if not found in local storage
//           const data = await fetchAppliedCompanies();
//           console.log(data);
//           setApplied(data);
//           // Save the fetched data to local storage
//           localStorage.setItem("appliedCompanies", JSON.stringify(data));
//         }
//       } catch (err) {
//         setError("Failed to load Applied Companies");
//         console.log(err);
//       }
//     }
//     getAppliedCompanies();
//   }, []);

//   const currentDate = new Date();
//   const formattedDate = timeanddate(currentDate);

//   return (
//     <div className="projects-section">
//       <div className="projects-section-header">
//         <p>Companies</p>
//         <p className="time">{formattedDate}</p>
//       </div>
//       <div className="projects-section-line">
//         {error && <p className="error-message">{error}</p>}
//         <div className="projects-status">
//           <div className="item-status">
//             <span className="status-number">5</span>
//             <span className="status-type">Applied</span>
//           </div>
//           <div className="item-status">
//             <span className="status-number">4</span>
//             <span className="status-type">Upcoming</span>
//           </div>
//           <div className="item-status">
//             <span className="status-number">9</span>
//             <span className="status-type">Total Companies</span>
//           </div>
//         </div>
//       </div>
//       <div className="project-boxes jsGridView">
//         <div className="project-box-wrapper">
//           {applied.map((company) => (
//             <CompanyItem company={company.application_id} key={company.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppliedCompanies;
