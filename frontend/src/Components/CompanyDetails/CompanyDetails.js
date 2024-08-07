import React, { useEffect, useState } from "react";
import { timeanddate } from "../../utils/timeanddate";
import { fetchComingCompanyDetails } from "../../api/ComingCompany";
import CompanyItem from "./CompanyItem";

function CompanyDetails() {
  const [viewMode, setViewMode] = useState("grid");

  const [comingCompanies, setComingCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getComingCompanies() {
      try {
        const data = await fetchComingCompanyDetails();
        console.log(data);
        setComingCompanies(data);
      } catch (err) {
        setError("Failed to load Upcoming Companies");
        console.log(err);
      }
    }
    getComingCompanies();
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
        <div className="view-actions">
          <button
            className={`view-btn list-view ${
              viewMode === "list" ? "active" : ""
            }`}
            title="List View"
            onClick={() => setViewMode("list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            className={`view-btn grid-view ${
              viewMode === "grid" ? "active" : ""
            }`}
            title="Grid View"
            onClick={() => setViewMode("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-grid"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`project-boxes ${
          viewMode === "grid" ? "jsGridView" : "jsListView"
        }`}
      >
        <div className="project-box-wrapper">
          {comingCompanies.map((company) => (
            <CompanyItem company={company} key={company.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
