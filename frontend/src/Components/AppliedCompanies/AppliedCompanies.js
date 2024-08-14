import React, { useState, useEffect } from "react";
import { fetchAppliedCompanies } from "../../api/appliedCompanies";
import AppliedCompanyDetails from "./AppliedCompanyDetails";
import AppliedCompanyCard from "./AppliedCompanyCard";
import SearchBar from "../SearchBar/SearchBar";

const AppliedCompanyList = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applied, setApplied] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAppliedCompanies() {
      try {
        const storedAppliedCompanies = localStorage.getItem("appliedCompanies");
        if (storedAppliedCompanies) {
          setApplied(JSON.parse(storedAppliedCompanies));
        } else {
          const data = await fetchAppliedCompanies();
          setApplied(data);
          localStorage.setItem("appliedCompanies", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Applied Companies");
        console.error(err);
      }
    }
    getAppliedCompanies();
  }, []);

  const handleBack = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div className="flex">
        <div
          className={`${
            selectedCompany ? "w-1/3 hidden sm:block" : "w-fit"
          } transition-all duration-300 bg-gray-100 p-4 h-screen overflow-y-auto`}
        >
          <div>
            <SearchBar />
          </div>
          <div
            className={`grid ${
              selectedCompany
                ? "grid-cols-1"
                : "lg:grid-cols-5 h-fit md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
            } gap-x-4`}
          >
            {applied.map((company, index) => (
              <AppliedCompanyCard
                key={index}
                company={company.application_id}
                onClick={setSelectedCompany}
                isActive={
                  selectedCompany &&
                  selectedCompany.id === company.application_id?.id
                }
              />
            ))}
          </div>
        </div>
        {selectedCompany && (
          <div className="sm:w-2/3 bg-gray-50 p-6 transition-all duration-300 w-full">
            <AppliedCompanyDetails
              company={selectedCompany}
              onBack={handleBack}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedCompanyList;
