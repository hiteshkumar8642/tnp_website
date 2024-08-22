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
      </div>
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <div className="text-center py-4">Loading Shared HR contacts...</div>
      ) : (
        <div className="shared-hr-table-container">
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
              {sharedHrData.map((hr, index) => (
                <SharedHrTableRow
                  key={index}
                  hr={hr}
                  onRemove={handleRemoveHr}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedHrContactList;