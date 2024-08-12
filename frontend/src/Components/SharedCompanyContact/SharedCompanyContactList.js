import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./SharedCompanyContactList.css";
import { fetchSharedCompanies } from "../../api/sharedCompanies";
import { ShimmerTable } from "react-shimmer-effects";

const SharedCompanyContactList = () => {
  const [CompanyData, setCompanyData] = useState([]);
  const [error, setError] = useState("");
  const [CompanyListLoading, SetCompanyListLoading] = useState(true);

  useEffect(() => {
    async function getCompanyList() {
      try {
        SetCompanyListLoading(true);

        // Check if data is already in local storage
        const storedCompanyData = localStorage.getItem("CompanyData");
        if (storedCompanyData) {
          setCompanyData(JSON.parse(storedCompanyData));
          SetCompanyListLoading(false);
        } else {
          // Fetch data if not found in local storage
          const data = await fetchSharedCompanies();
          console.log(data);
          setCompanyData(data);
          // Save the fetched data to local storage
          localStorage.setItem("CompanyData", JSON.stringify(data));
          SetCompanyListLoading(false);
        }
      } catch (err) {
        setError("Failed to load Company list");
        console.log(err);
      }
    }
    getCompanyList();
  }, []);

  const handleStatusChange = (id, status) => {
    setCompanyData((prevCompanyData) =>
      prevCompanyData.map((Company) => (Company.id === id ? { ...Company, status } : Company))
    );
    console.log(CompanyData);
  };

  return (
    <>
      
    </>
  );
};

export default SharedCompanyContactList;
