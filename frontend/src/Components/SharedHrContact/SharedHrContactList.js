import React, { useEffect, useState } from "react";
import "./SharedHrContactList.css";
import { fetchSharedHRList } from "../../api/listOfSharedHR";
import SharedHrTableRow from "./SharedHrTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const SharedHrContactList = () => {
  const [sharedHrData, setSharedHrData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSharedHRList() {
      try {
        setIsLoading(true);
        const storedHRData = localStorage.getItem("SharedhrData");
        if (storedHRData) {
          setSharedHrData(JSON.parse(storedHRData));
        } else {
          const data = await fetchSharedHRList();
          setSharedHrData(data);
          localStorage.setItem("SharedhrData", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load Shared HR list");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getSharedHRList();
  }, []);

  const handleRemoveHr = (hrToRemove) => {
    const updatedHrData = sharedHrData.filter((hr) => hr !== hrToRemove);
    setSharedHrData(updatedHrData);
    localStorage.setItem("SharedhrData", JSON.stringify(updatedHrData));
  };

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Shared HR Contacts List</p>
        <button className="bg-gray-700 text-white p-2 px-3 rounded-md hover:bg-gray-800">
          Delete All
        </button>
      </div>
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <ShimmerTable row={6} col={7} className="shimmer-table-effect" />
      ) : (
        <div className="shared-hr-table-container overflow-auto">
          <table className="shared-hr-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Company Name</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>LinkedIn</th>
                <th>Add to List</th>
              </tr>
            </thead>
            <tbody>
              {sharedHrData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No HRs found
                  </td>
                </tr>
              ) : (
                sharedHrData.map((hr, index) => (
                  <SharedHrTableRow
                    key={index}
                    hr={hr}
                    onRemove={handleRemoveHr}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedHrContactList;
