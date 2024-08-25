import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "./CompanyDetailsModal.css";
import { fetchDownloadAppliedStudents } from "../../api/downloadAppliedStudents";
import { applyToCompany } from "../../api/applyToCompany";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-hot-toast";

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

const getUserDetailsFromLocalStorage = () => {
  const data = localStorage.getItem("user_detail");
  return data ? JSON.parse(data) : {};
};

const CompanyDetails = ({ appliedCompanies, comingCompany, onBack }) => {
  const { company_id, position, is_spp, is_sip, last_date, job_description } =
    comingCompany || {};
  const company = company_id;
  const companyName = company?.name || "Unknown Company";
  const generalCTC = company?.general_ctc || "N/A";
  const userData = getUserDetailsFromLocalStorage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eligibilityError, setEligibilityError] = useState("");

  const isApplied = appliedCompanies.some(
    (appliedCompany) => appliedCompany.application_id.id === comingCompany.id
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const jobDescriptionUrl = job_description
    ? `${process.env.REACT_APP_API_HOST}${job_description}`
    : "";

  const handleDownload = async () => {
    try {
      const response = await fetchDownloadAppliedStudents(company.id);
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${companyName}_applied_students.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("File downloaded successfully!");
      } else {
        toast.error("Failed to download file");
      }
    } catch (error) {
      toast.error("Error occurred while downloading the file");
    }
  };

  const handleApply = async () => {
    try {
      const response = await applyToCompany({ application: comingCompany.id });
      if (response.status === 201) {
        toast.success("You have successfully applied for this position!");
      } else {
        toast.error("Failed to apply for the position");
      }
    } catch (error) {
      toast.error("Error occurred while applying to the company");
    }
  };

  useEffect(() => {
    if (
      userData.twelfth_percentage < comingCompany.twelfth_marks_eligibility ||
      userData.tenth_percentage < comingCompany.tenth_marks_eligibility ||
      userData.gap_after_twelfth > comingCompany.twelfth_gap ||
      userData.gap_after_graduation > comingCompany.graduation_gap ||
      userData.graduation_cgpa < comingCompany.graduation_marks ||
      userData.current_cgpa < comingCompany.current_cgpa ||
      userData.backlogs > comingCompany.backlogs
    ) {
      let error = "You are not eligible to apply due to:";
      if (
        userData.twelfth_percentage < comingCompany.twelfth_marks_eligibility
      ) {
        error += `\n- Your 12th Marks ${userData.twelfth_percentage} and required ${company.twelfth_marks_eligibility}`;
      }
      if (userData.tenth_percentage < comingCompany.tenth_marks_eligibility) {
        error += `\n- Your 10th Marks ${userData.tenth_percentage} and required ${company.tenth_marks_eligibility}`;
      }
      if (userData.graduation_cgpa < comingCompany.graduation_marks) {
        error += `\n- Your Graduation Marks ${userData.graduation_cgpa} and required ${company.graduation_marks}`;
      }
      if (userData.current_cgpa < comingCompany.current_cgpa) {
        error += `\n- Your Current CGPA ${userData.current_cgpa} and required ${company.current_cgpa}`;
      }
      if (userData.gap_after_graduation > comingCompany.graduation_gap) {
        error += `\n- Your Gap after Graduation ${userData.gap_after_graduation} and required ${company.graduation_gap}`;
      }
      if (userData.gap_after_twelfth > comingCompany.twelfth_gap) {
        error += `\n- Your Gap after 12th ${userData.gap_after_twelfth} and required ${company.twelfth_gap}`;
      }
      if (userData.backlogs > comingCompany.backlogs) {
        error += `\n- Your Active Backlogs ${userData.backlogs} and required ${company.backlogs}`;
      }
      setEligibilityError(error);
    } else {
      setEligibilityError("");
    }
  }, [
    userData,
    comingCompany,
    company.backlogs,
    company.current_cgpa,
    company.graduation_gap,
    company.graduation_marks,
    company.tenth_marks_eligibility,
    company.twelfth_gap,
    company.twelfth_marks_eligibility,
  ]);

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

        <button
          onClick={handleDownload}
          className="mb-4 bg-black text-white p-2 rounded-full hover:bg-gray-500 transition-colors"
        >
          <AiOutlineDownload size={24} />
        </button>
      </div>

      <div className="flex items-center">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{companyName}</h2>
            <div className="absolute right-16">
              {eligibilityError && (
                <p className="text-red-500 mt-4">{eligibilityError}</p>
              )}
              {isApplied ? (
                <button
                  className="bg-gray-500 text-white p-2 rounded-md cursor-not-allowed px-8"
                  disabled
                >
                  Applied
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  className="bg-blue-500 text-white  rounded-md  px-8 py-2 hover:bg-blue-700 transition-colors"
                  disabled={!!eligibilityError}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
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
      <p
        className="JD mt-4 text-white text-center cursor-pointer bg-blue-500 hover:bg-blue-700 w-fit relative left-[40%] py-2 px-6 rounded-md"
        onClick={openModal}
      >
        Click to View Job Description
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
    </div>
  );
};

export default CompanyDetails;
