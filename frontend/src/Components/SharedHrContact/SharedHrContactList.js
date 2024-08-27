import React, { useEffect, useState } from "react";
import "./SharedHrContactList.css";
import { fetchSharedHRList } from "../../api/listOfSharedHR";
import SharedHrTableRow from "./SharedHrTableRow";
import { ShimmerTable } from "react-shimmer-effects";
import { toast } from "react-hot-toast";

const SharedHrContactList = () => {
  const [sharedHrData, setSharedHrData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSharedHRList() {
      try {
        setIsLoading(true);
        const data = await fetchSharedHRList();
        setSharedHrData(data);
      } catch (err) {
        toast.error("Failed to load Shared HR list");
      } finally {
        setIsLoading(false);
      }
    }
    getSharedHRList();
  }, []);

  const handleRemoveHr = (hrToRemove) => {
    const updatedHrData = sharedHrData.filter((hr) => hr !== hrToRemove);
    setSharedHrData(updatedHrData);
    toast.success("HR contact removed successfully");
  };

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Shared HR Contacts List</p>
        <button
          className="bg-gray-700 text-white p-2 px-3 rounded-md hover:bg-gray-800"
          onClick={() => {
            setSharedHrData([]);
            toast.success("All HR contacts deleted successfully");
          }}
        >
          Delete All
        </button>
      </div>
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
