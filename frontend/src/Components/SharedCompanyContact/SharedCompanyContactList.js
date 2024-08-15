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

  if (companyListLoading) {
    return <ShimmerTable row={5} col={15} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="company-contact-table">
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
        {sharedCompanyData.map((company, index) => (
          <SharedCompanyTableRow key={index} company={company} />
        ))}
      </tbody>
    </table>
  );
};

export default SharedCompanyContactList;
