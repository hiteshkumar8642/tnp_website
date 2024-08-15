import React, { useEffect, useState } from "react";
import "./SharedCompanyContactList.css";
import { fetchSharedCompanies } from "../../api/sharedCompanies";
import SharedCompanyTableRow from "./SharedCompanyTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const SharedCompanyContactList = () => {
  const [sharedCompanyData, setSharedCompanyData] = useState([]);
  const [error, setError] = useState("");
  const [companyListLoading, setCompanyListLoading] = useState(true);

  useEffect(() => {
    async function getSharedCompanyList() {
      try {
        setCompanyListLoading(true);

        // Check if data is already in local storage
        const storedCompanyData = localStorage.getItem("SharedCompanyData");
        if (storedCompanyData) {
          setSharedCompanyData(JSON.parse(storedCompanyData));
          setCompanyListLoading(false);
        } else {
          // Fetch data if not found in local storage
          const data = await fetchSharedCompanies();
          setSharedCompanyData(data);
          // Save the fetched data to local storage
          localStorage.setItem("SharedCompanyData", JSON.stringify(data));
          setCompanyListLoading(false);
        }
      } catch (err) {
        setError("Failed to load company list");
        console.log(err);
      }
    }
    getSharedCompanyList();
  }, []);

  return (
    <div className="shared-company-list-container">
      <h2>Shared Company Contacts List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="shared-company-list-table-container">
        {!companyListLoading ? (
          <table className="shared-company-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Company Name</th>
                <th className="col-2 left-align">Contact Number</th>
                <th className="col-2 left-align">Email</th>
                <th className="col-2 left-align">CTC Offered</th>
                <th className="col-2 left-align">College Visited</th>
              </tr>
            </thead>
            <tbody>
              {sharedCompanyData.map((company, index) => (
                <SharedCompanyTableRow key={index} company={company} />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="shared-company-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Company Name</th>
                <th className="col-1 center-align">Contact Number</th>
                <th className="col-2 left-align">Email</th>
                <th className="col-1 center-align">CTC Offered</th>
                <th className="col-2 left-align">College Visited</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  <ShimmerTable row={5} col={5} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SharedCompanyContactList;