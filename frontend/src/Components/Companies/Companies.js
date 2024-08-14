import React, { useState, useEffect } from "react";
import { fetchComingCompanyDetails } from "../../api/ComingCompany";
import CompanyDetails from "./CompanyDetails";
import AddCompanyForm from "./AddCompanyForm";
import { FaSearch, FaPlus } from "react-icons/fa";

import { timeanddate } from "../../utils/timeanddate";

// CompanyCard component
const CompanyCard = ({ company, onClick, isActive }) => {
  const { company_id, position, is_spp, is_sip } = company || {};
  const companyName = company_id?.name || "Unknown Company";

  return (
    <div
      onClick={() => onClick(company)}
      className={`p-4 bg-white shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer mb-4 ${
        isActive ? "border-2 border-blue-500" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mt-2">{companyName}</h2>
      <p className="text-gray-600">{position}</p>
      <div className="flex justify-between items-center mt-2">
        {is_spp && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            SPP
          </span>
        )}
        {is_sip && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            SIP
          </span>
        )}
      </div>
    </div>
  );
};

function CompaniesDashboard() {
  return (
    <>
      <Company />
    </>
  );
}

function Company() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [comingCompanies, setComingCompanies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getComingCompanies() {
      setIsLoading(true);
      try {
        const storedCompanies = localStorage.getItem("comingCompanies");
        if (storedCompanies) {
          console.log("Using stored companies data");
          setComingCompanies(JSON.parse(storedCompanies));
        } else {
          console.log("Fetching companies data");
          const data = await fetchComingCompanyDetails();
          console.log("Fetched companies data:", data);
          setComingCompanies(data);
          localStorage.setItem("comingCompanies", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Upcoming Companies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getComingCompanies();
  }, []);

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompany = (newCompany) => {
    setComingCompanies([...comingCompanies, newCompany]);
    localStorage.setItem(
      "comingCompanies",
      JSON.stringify([...comingCompanies, newCompany])
    );
    setIsModalOpen(false);
  };

  const filteredCompanies = comingCompanies.filter((company) =>
    company &&
    company.company_id &&
    company.company_id.name &&
    company.company_id.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered companies:", filteredCompanies);

  const currentDate = new Date();
  const formattedDate = timeanddate(currentDate);

  if (isLoading) {
    return <div className="text-center py-4">Loading companies...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="projects-section">
        <div className="projects-section-header">
          <p>Companies</p>
          <p className="time">{formattedDate}</p>
        </div>
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">{filteredCompanies.length}</span>
              <span className="status-type">Total Companies</span>
            </div>
          </div>
          <div className="view-actions flex justify-between items-center w-full">
            <div className="flex items-center ml-auto">
              <input
                type="text"
                placeholder="Search companies..."
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
              <button 
                className="bg-black text-white px-3 py-1 rounded flex items-center ml-4"
                onClick={handleAddClick}
              >
                <FaPlus className="mr-1" /> Add
              </button>
            </div>
          </div>
        </div>
        <div className="project-boxes jsGridView">
          {selectedCompany ? (
            <div className="w-full">
              <CompanyDetails company={selectedCompany} onBack={handleBack} />
            </div>
          ) : (
            <div className="project-box-wrapper">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={setSelectedCompany}
                  isActive={selectedCompany && selectedCompany.id === company.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddCompanyForm onClose={handleModalClose} onSave={handleSaveCompany} />
      )}
    </>
  );
}

export default CompaniesDashboard;