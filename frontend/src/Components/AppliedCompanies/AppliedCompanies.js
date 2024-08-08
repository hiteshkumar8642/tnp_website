import React, { useEffect, useState } from "react";
import { timeanddate } from "../../utils/timeanddate";
import { fetchAppliedCompanies } from "../../api/appliedCompanies";
import CompanyItem from "../CompanyItem/CompanyItem";

function AppliedCompanies() {
  const [applied, setApplied] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAppliedCompanies() {
      try {
        const data = await fetchAppliedCompanies();
        console.log(data);
        setApplied(data);
      } catch (err) {
        setError("Failed to load Applied Companies");
        console.log(err);
      }
    }
    getAppliedCompanies();
  }, []);

  const currentDate = new Date();
  const formattedDate = timeanddate(currentDate);

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Companies</p>
        <p className="time">{formattedDate}</p>
      </div>
      <div className="projects-section-line">
        {error && <p className="error-message">{error}</p>}
        <div className="projects-status">
          <div className="item-status">
            <span className="status-number">5</span>
            <span className="status-type">Applied</span>
          </div>
          <div className="item-status">
            <span className="status-number">4</span>
            <span className="status-type">Upcoming</span>
          </div>
          <div className="item-status">
            <span className="status-number">9</span>
            <span className="status-type">Total Companies</span>
          </div>
        </div>
      </div>
      <div className="project-boxes jsGridView">
        <div className="project-box-wrapper">
          {applied.map((company) => (
            <CompanyItem company={company.application_id} key={company.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedCompanies;
