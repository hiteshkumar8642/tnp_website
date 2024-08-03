import React, { useState } from "react";

function AppliedCompanies() {
  const [viewMode, setViewMode] = useState("grid");

  const currentDate = new Date();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
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
  const monthName = monthNames[currentDate.getMonth()];

  const getOrdinalSuffix = (day) => {
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

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${monthName} ${year}`;

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Companies</p>
        <p className="time">{formattedDate}</p>
      </div>
      <div className="projects-section-line">
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
          <a href="{% url 'job_description' jd_id=x.id  %}">
            <div className="project-box" style={{ backgroundColor: "#fee4cb" }}>
              <div className="project-box-header">
                <span>27th July </span>
                <div className="more-wrapper">SPP</div>
              </div>
              <div className="project-box-content-header">
                <p className="box-content-header">Amazon</p>
                <p className="box-content-subheader">SDE</p>
                <p className="box-content-subheader">Full Time PPO Intern</p>
              </div>

              <div className="project-box-footer">
                <div className="participants">10 LPA</div>
                <div className="days-left" style={{ color: "#ff942e" }}>
                  10 Days
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppliedCompanies;
