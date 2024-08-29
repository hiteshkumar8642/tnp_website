import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HrModal.css";
import { FaLinkedin } from "react-icons/fa";
import { setAssignme } from "../../api/setAssignme";
import { toast } from "react-hot-toast";

const HrModal = ({ hr, onClose }) => {
  const [nextContactDate, setNextContactDate] = useState(
    new Date(hr.next_date_of_contact)
  );

  if (!hr) return null; // Early return if hr is null or undefined

  const company = hr.company_id || {};
  const companyPOC = company.poc || {};
  const companyAllowedCourses = company.allowed_courses || [];

  async function handleAssignMe(id) {
    try {
      const response = await setAssignme({ id: id });
      if (response.status === 200) toast.success("HR assigned successfully:");
      else toast.error("Failed To assign HR");
    } catch (error) {
      toast.error("Error occured while Assigning HR");
    }
  }

  return (
    <div className="hrlist-modal-overlay" onClick={onClose}>
      <div
        className="hrlist-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hrlist-modal-header">
          <h2>
            {hr.name}
            {hr.linkedin && (
              <a href={hr.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ color: "#0e76a8" }} />
              </a>
            )}
          </h2>
        </div>
        <div className="hrlist-modal-body">
          <div className="grid-item grid-item-0-0">
            <h3>HR Details</h3>
            <div className="info-row">
              <label>Gender:</label>
              <span className="data">{hr.gender || "N/A"}</span>
            </div>
            <div className="info-row">
              <label>Last Date of Contact:</label>
              <div className="data">{hr.last_date_of_contact || "N/A"}</div>
            </div>
            <div className="info-row">
              <label>Next Date of Contact:</label>
              <div className="data">
                <DatePicker
                  selected={nextContactDate}
                  onChange={(date) => setNextContactDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className="info-row">
              <label>Contact Status:</label>
              <span className="data">{hr.status || "N/A"}</span>
            </div>
            <button onClick={() => handleAssignMe(hr.id)}>Assign me</button>
          </div>
          <div className="grid-item grid-item-0-1">
            <h3>Company Information</h3>
            <p>Company: {company.name || "N/A"}</p>
            <p>General CTC: {company.general_ctc || "N/A"}</p>
            <p>College CTC: {company.college_ctc || "N/A"}</p>
            <p>
              Time of Visit:{" "}
              {company.time_of_visit
                ? new Date(company.time_of_visit).toLocaleDateString()
                : "N/A"}
            </p>
            <h4>Allowed Courses:</h4>
            <ul>
              {companyAllowedCourses.length > 0 ? (
                companyAllowedCourses.map((course, index) => (
                  <li key={index}>
                    {course.degree} in {course.specialization} (
                    {course.course_duration} years)
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
            <h4>Point of Contact:</h4>
            <p>College: {companyPOC.college?.name || "N/A"}</p>
            <p>
              Course: {companyPOC.course?.degree} in{" "}
              {companyPOC.course?.specialization || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrModal;
