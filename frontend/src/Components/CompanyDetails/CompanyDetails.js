import React, { useEffect, useState } from "react";
import { timeanddate } from "../../utils/timeanddate";
import { fetchComingCompanyDetails } from "../../api/ComingCompany";
import CompanyItem from "../CompanyItem/CompanyItem";

function CompanyDetails() {
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
      </div>
      <div className="project-boxes jsGridView">
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
