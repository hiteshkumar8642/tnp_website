import React, { useState } from "react";
import Modal from "react-modal";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "./StudentDetailsModal.css";
import { IoArrowBack } from "react-icons/io5";
import ToggleButton from "./ToggleButton";

const StudentDetails = ({ student, onBack }) => {
  const {
    user,
    mobile,
    department,
    current_cgpa,
    resume,
    twelfth_percentage,
    tenth_percentage,
    graduation_cgpa,
    backlogs,
    other_website_link,
    leetcode_profile,
    codechef_profile,
    codeforces_profile,
    github_profile,
    portfolio_link,
    linkedin_profile,
    gap_after_twelfth,
    gap_after_graduation,
    is_placed,
    is_verified,
  } = student;
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const resumeUrl = resume ? `${process.env.REACT_APP_API_HOST}${resume}` : "";
  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg ">
      <div className="overflow-auto">
      <button
        onClick={onBack}
        className="mb-4 bg-black text-white p-2 rounded-full hover:bg-gray-500 transition-colors"
        aria-label="Go back"
      >
        <IoArrowBack size={24} />
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center" >
          <img
            src={`${process.env.REACT_APP_API_HOST}${student.photo}`}
            alt="icon"
            className="w-16 h-16 mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-gray-500">{user.username}</p>
            <p className="Res text-blue-500" onClick={openModal}>
              Resume
            </p>
          </div>
        </div>
        <div>
          <ToggleButton student={student}/>
        </div>

      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Email: {user.email}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Mobile: {mobile}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Dept: {department}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          CGPA: {current_cgpa}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="12th Percentage" value={twelfth_percentage} />
        <InfoItem label="10th Percentage" value={tenth_percentage} />
        <InfoItem label="Graduation CGPA" value={graduation_cgpa} />
        <InfoItem label="Backlogs" value={backlogs} />
        <InfoItem label="Gap after 12th" value={gap_after_twelfth} />
        <InfoItem label="Gap after Graduation" value={gap_after_graduation} />
        <InfoItem
          label="Placement Status"
          value={is_placed ? "Placed" : "Not Placed"}
        />
        <InfoItem
          label="Verification Status"
          value={is_verified ? "Verified" : "Not Verified"}
        />
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Online Profiles</h3>
      <div className="grid grid-cols-2 gap-4">
        <ProfileLink label="LeetCode" url={leetcode_profile} />
        <ProfileLink label="CodeChef" url={codechef_profile} />
        <ProfileLink label="Codeforces" url={codeforces_profile} />
        <ProfileLink label="GitHub" url={github_profile} />
        <ProfileLink label="LinkedIn" url={linkedin_profile} />
        <ProfileLink label="Portfolio" url={portfolio_link} />
        <ProfileLink label="Other Website" url={other_website_link} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Resume PDF"
        className="full-screen-modal"
      >
        <button onClick={closeModal} className="close-modal-button">
          Close
        </button>
        <div className="pdf-viewer-container">
          {resume ? (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={resumeUrl} />
            </Worker>
          ) : (
            <p>No Resume available</p>
          )}
        </div>
      </Modal>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

const ProfileLink = ({ label, url }) => (
  <div>
    <span className="font-semibold">{label}:</span>{" "}
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Link
      </a>
    ) : (
      "Not provided"
    )}
  </div>
);

export default StudentDetails;
