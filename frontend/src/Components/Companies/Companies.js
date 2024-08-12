import React, { useState, useEffect } from "react";
import { fetchComingCompanyDetails } from "../../api/comingCompany";
import CompanyDetails from "./CompanyDetails";
import CompanyCard from "./CompanyCard";
import AddCompanyForm from "./AddCompanyForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getComingCompanies() {
      try {
        const storedCompanies = localStorage.getItem("comingCompanies");
        if (storedCompanies) {
          setComingCompanies(JSON.parse(storedCompanies));
        } else {
          const data = await fetchComingCompanyDetails();
          console.log(data);
          setComingCompanies(data);
          localStorage.setItem("comingCompanies", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Upcoming Companies");
        console.log(err);
      }
    }
    getComingCompanies();
  }, []);

  const handleBack = () => {
    setSelectedCompany(null);
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
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div className="flex">
        <button className="add" onClick={handleAddClick}>
          Add
        </button>
        <div
          className={`${
            selectedCompany ? "w-1/3 hidden sm:block" : "w-fit"
          } transition-all duration-300 bg-gray-100 p-4 h-screen overflow-y-auto`}
        >
          <div
            className={`grid ${
              selectedCompany
                ? "grid-cols-1"
                : "lg:grid-cols-5 h-fit md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
            } gap-x-4`}
          >
            {comingCompanies.map((company, index) => (
              <CompanyCard
                key={index}
                company={company}
                onClick={setSelectedCompany}
                isActive={selectedCompany && selectedCompany.id === company.id}
              />
            ))}
          </div>
        </div>
        {selectedCompany && (
          <div className="sm:w-2/3 bg-gray-50 p-6 transition-all duration-300 w-full">
            <CompanyDetails company={selectedCompany} onBack={handleBack} />
          </div>
        )}
      </div>
      {isModalOpen && (
        <AddCompanyForm onClose={handleModalClose} onSave={handleSaveCompany} />
      )}
    </>
  );
}

export default CompaniesDashboard;
