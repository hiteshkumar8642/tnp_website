import React, { useState } from "react";
import Modal from "react-modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "./CompanyDetailsModal.css";
import { IoArrowBack } from "react-icons/io5";

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

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Closed";
  } else {
    return `${diffDays} days`;
  }
}

const CompanyDetails = ({ company, onBack }) => {
  const { company_id, position, is_spp, is_sip, last_date, job_description } =
    company || {};
  const companyName = company_id?.name || "Unknown Company";
  const generalCTC = company_id?.general_ctc || "N/A";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Correctly format the job_description URL
  const jobDescriptionUrl = job_description
    ? `http://localhost:8000${job_description}`
    : "";

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
      <button
        onClick={onBack}
        className="mb-4 bg-black text-white p-2 rounded-full hover:bg-gray-500 transition-colors"
        aria-label="Go back"
      >
        <IoArrowBack size={24} />
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
      </div>
      <p className="JD mt-4 text-gray-600 cursor-pointer" onClick={openModal}>
        Job Description
      </p>

      {/* Modal for PDF Viewer */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Job Description PDF"
        className="full-screen-modal"
      >
        <button onClick={closeModal} className="close-modal-button">
          Close
        </button>
        <div className="pdf-viewer-container">
          {job_description ? (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={jobDescriptionUrl} />
            </Worker>
          ) : (
            <p>No Job Description available</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CompanyDetails;

// import React, { useEffect, useState } from "react";
// import { timeanddate } from "../../utils/timeanddate";
// import { fetchComingCompanyDetails } from "../../api/comingCompany";
// import CompanyItem from "../CompanyItem/CompanyItem";

// function CompanyDetails() {
//   const [comingCompanies, setComingCompanies] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function getComingCompanies() {
//       try {
//         // Check if data is already in local storage
//         const storedCompanies = localStorage.getItem("comingCompanies");
//         if (storedCompanies) {
//           setComingCompanies(JSON.parse(storedCompanies));
//         } else {
//           // Fetch data if not found in local storage
//           const data = await fetchComingCompanyDetails();
//           console.log(data);
//           setComingCompanies(data);
//           // Save the fetched data to local storage
//           localStorage.setItem("comingCompanies", JSON.stringify(data));
//         }
//       } catch (err) {
//         setError("Failed to load Upcoming Companies");
//         console.log(err);
//       }
//     }
//     getComingCompanies();
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
//             <span className="status-type"></span>
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
//           {comingCompanies.map((company) => (
//             <CompanyItem company={company} key={company.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CompanyDetails;
