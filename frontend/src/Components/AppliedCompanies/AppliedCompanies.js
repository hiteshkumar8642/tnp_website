import React, { useState, useEffect } from "react";
import { fetchAppliedCompanies } from "../../api/appliedCompanies";
import AppliedCompanyDetails from "./AppliedCompanyDetails";
import AppliedCompanyCard from "./AppliedCompanyCard";
import Shimmer from "./Shimmer";
import { FaSearch } from "react-icons/fa";

function AppliedCompaniesList() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [appliedCompanies, setAppliedCompanies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAppliedCompanies() {
      setIsLoading(true);
      try {
        const storedAppliedCompanies = localStorage.getItem("appliedCompanies");
        if (storedAppliedCompanies) {
          setAppliedCompanies(JSON.parse(storedAppliedCompanies));
        } else {
          const data = await fetchAppliedCompanies();

          setAppliedCompanies(data);
          localStorage.setItem("appliedCompanies", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Applied Companies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAppliedCompanies();
  }, []);

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCompanies = appliedCompanies.filter(
    (company) =>
      company &&
      company.application_id &&
      company.application_id.company_id &&
      company.application_id.company_id.name &&
      company.application_id.company_id.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Applied Companies</p>
      </div>
      <div className="projects-section-line">
        <div className="view-actions flex justify-between items-center w-full">
          <div className="flex items-center ml-auto">
            <input
              type="text"
              placeholder="Search applied companies..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded-l px-2 py-1 w-64"
            />
            <button
              className="bg-black text-white px-3.5 py-2.5 rounded-r"
              onClick={() => handleSearch({ target: { value: searchTerm } })}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Shimmer />
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">{filteredCompanies.length}</span>
              <span className="status-type">Total Applied Companies</span>
            </div>
          </div>
          <div className="project-boxes jsGridView">
            {selectedCompany ? (
              <div className="w-full">
                <AppliedCompanyDetails
                  company={selectedCompany}
                  onBack={handleBack}
                />
              </div>
            ) : (
              <div className="project-box-wrapper grid lg:grid-flow-col grid-flow-row gap-9">
                {filteredCompanies.map((company) => (
                  <AppliedCompanyCard
                    key={company.id}
                    company={company.application_id}
                    onClick={setSelectedCompany}
                    isActive={
                      selectedCompany &&
                      selectedCompany.id === company.application_id?.id
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AppliedCompaniesList;
