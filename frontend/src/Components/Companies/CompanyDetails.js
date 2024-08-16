import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "./CompanyDetailsModal.css";
import { fetchDownloadAppliedStudents} from "../../api/downloadAppliedStudents";
import { applyToCompany } from "../../api/applyToCompany";
import { IoArrowBack } from "react-icons/io5";
import { fetchAppliedCompanies } from "../../api/appliedCompanies";
import { AiOutlineDownload } from 'react-icons/ai';

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

// Fetch user details from local storage
const getUserDetailsFromLocalStorage = () => {
  const data = localStorage.getItem('user_detail');
  return data ? JSON.parse(data) : {};
};

const CompanyDetails = ({ company, onBack }) => {
  const { company_id, position, is_spp, is_sip, last_date, job_description } =
    company || {};
  const companyName = company_id?.name || "Unknown Company";
  const generalCTC = company_id?.general_ctc || "N/A";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [userData, setUserData] = useState(getUserDetailsFromLocalStorage());
  const [eligibilityError, setEligibilityError] = useState("");
  const [appliedCompanies, setAppliedCompanies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getAppliedCompanies() {
      setIsLoading(true);
      try {
        const storedAppliedCompanies = localStorage.getItem("appliedCompanies");
        let data;
        if (storedAppliedCompanies) {
          data = JSON.parse(storedAppliedCompanies);
        } else {
          data = await fetchAppliedCompanies();
          localStorage.setItem("appliedCompanies", JSON.stringify(data));
        }
        setAppliedCompanies(data);
        // Check if the user has applied to the current company
        const isUserApplied = data.some(
          (appliedCompany) => appliedCompany.application_id.id=== company_id.id
        );
        setIsApplied(isUserApplied);
      } catch (err) {
        setError("Failed to load Applied Companies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAppliedCompanies();
  }, []);

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

  // Function to handle download
  const handleDownload = async () => {
    try {
      const response = await fetchDownloadAppliedStudents(company_id.id);  // Pass company ID
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${companyName}_applied_students.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Failed to download file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Function to handle apply
  const handleApply = async () => {
    try {
      const response = await applyToCompany(company_id.id, userData.id); // Pass company ID and user ID
      if (response.status === 201) {
        setIsApplied(true);
        alert("You have successfully applied for this position!");
        // Update applied companies in state and local storage
        setAppliedCompanies((prevAppliedCompanies) => [
          ...prevAppliedCompanies,
          { id: company_id.id },
        ]);
        localStorage.setItem(
          "appliedCompanies",
          JSON.stringify([
            ...appliedCompanies,
            { id: company_id.id },
          ])
        );
      } else {
        console.error("Failed to apply:", response.data);
        alert("Failed to apply. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while applying. Please try again.");
    }
  };

  // Check eligibility
  useEffect(() => {
    if (
      userData.twelfth_percentage < company.twelfth_marks_eligibility ||
      userData.tenth_percentage < company.tenth_marks_eligibility ||
      userData.gap_after_twelfth > company.twelfth_gap ||
      userData.gap_after_graduation > company.graduation_gap ||
      userData.graduation_cgpa < company.graduation_marks ||
      userData.current_cgpa < company.current_cgpa ||
      userData.backlogs > company.backlogs
    ) {
      let error = "You are not eligible to apply due to:";
      if (userData.twelfth_percentage < company.twelfth_marks_eligibility) {
        error += `\n- Your 12th Marks ${userData.twelfth_percentage} and required ${company.twelfth_marks_eligibility}`;
      }
      if (userData.tenth_percentage < company.tenth_marks_eligibility) {
        error += `\n- Your 10th Marks ${userData.tenth_percentage} and required ${company.tenth_marks_eligibility}`;
      }
      if (userData.graduation_cgpa < company.graduation_marks) {
        error += `\n- Your Graduation Marks ${userData.graduation_cgpa} and required ${company.graduation_marks}`;
      }
      if (userData.current_cgpa < company.current_cgpa) {
        error += `\n- Your Current CGPA ${userData.current_cgpa} and required ${company.current_cgpa}`;
      }
      if (userData.gap_after_graduation > company.graduation_gap) {
        error += `\n- Your Gap after Graduation ${userData.gap_after_graduation} and required ${company.graduation_gap}`;
      }
      if (userData.gap_after_twelfth > company.twelfth_gap) {
        error += `\n- Your Gap after 12th ${userData.gap_after_twelfth} and required ${company.twelfth_gap}`;
      }
      if (userData.backlogs > company.backlogs) {
        error += `\n- Your Active Backlogs ${userData.backlogs} and required ${company.backlogs}`;
      }
      setEligibilityError(error);
    } else {
      setEligibilityError("");
    }
  }, [userData, company]);

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="mb-4 bg-black text-white p-2 rounded-full hover:bg-gray-500 transition-colors"
            aria-label="Go back"
          >
            <IoArrowBack size={24} />
          </button>
        
          {/* Download Button at Top Right Corner */}
          <button
            onClick={handleDownload}
            className="mb-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <AiOutlineDownload size={24} />
          </button>    
        </div>             
        
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
      {eligibilityError && (
          <p className="text-red-500 mt-4">{eligibilityError}</p>
        )}
      {isApplied ? (
          <button
            className="bg-gray-500 text-white p-2 rounded-full cursor-not-allowed"
            disabled
          >
            Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-green-500 text-white  rounded-full  px-14 py-2 hover:bg-green-700 transition-colors absolute left-[50%]"
            disabled={!!eligibilityError || isLoading}
          >
            Apply
          </button>
        )}
        

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
