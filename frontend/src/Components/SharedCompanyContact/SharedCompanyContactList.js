import React, { useEffect, useState } from "react";
import "./SharedCompanyContactList.css";
import { fetchSharedCompanies } from "../../api/sharedCompanies";
import SharedCompanyTableRow from "./SharedCompanyTableRow";
import { ShimmerTable } from "react-shimmer-effects";
import { toast } from "react-hot-toast";

const SharedCompanyContactList = () => {
  const [sharedCompanyData, setSharedCompanyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSharedCompanyList() {
      try {
        setIsLoading(true);
        const data = await fetchSharedCompanies();
        setSharedCompanyData(data);
      } catch (err) {
        toast.error("Error loading Shared Company list");
      } finally {
        setIsLoading(false);
      }
    }
    getSharedCompanyList();
  }, []);

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Shared Company Contacts List</p>
      </div>
      {isLoading ? (
        <ShimmerTable row={6} col={5} className="shimmer-table-effect" />
      ) : (
        <div className="shared-company-table-container">
          <table className="shared-company-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>CTC Offered</th>
                <th>College Visited</th>
              </tr>
            </thead>
            <tbody>
              {sharedCompanyData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No companies found
                  </td>
                </tr>
              ) : (
                sharedCompanyData.map((company, index) => (
                  <SharedCompanyTableRow key={index} company={company} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedCompanyContactList;
