import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";
import { fetchHRList } from "../../api/listofHR";
import HrTableRow from "./HrTableRow";
//import { ShimmerTable } from "react-shimmer-effects";
import { sendHRinfo } from "../../api/updateHrInfo";

const HrList = () => {
  const [hrData, setHrData] = useState([]);
  const [error, setError] = useState("");
  const [HrListLoading, SetHrListLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function getHRList() {
      try {
        SetHrListLoading(true);

        // Check if data is already in local storage
        const storedHRData = localStorage.getItem("hrData");
        if (storedHRData) {
          setHrData(JSON.parse(storedHRData));
          SetHrListLoading(false);
        } else {
          // Fetch data if not found in local storage
          const data = await fetchHRList();
          console.log(data);
          setHrData(data);
          // Save the fetched data to local storage
          localStorage.setItem("hrData", JSON.stringify(data));
          SetHrListLoading(false);
        }
      } catch (err) {
        setError("Failed to load HR list");
        console.log(err);
      }
    }
    getHRList();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      // // Perform the API request to update the status
      // console.log(id);
      setHrData((prevHrData) =>
        prevHrData.map((hr) => (hr.id === id ? { ...hr, status } : hr))
      );
      console.log(hrData);

      const response = await sendHRinfo(id, status);
      console.log("Status updated successfully:", response.data);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  let filteredData =
    statusFilter === "All"
      ? hrData
      : hrData.filter((hr) => hr.status === statusFilter);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    console.log("chexking data", filteredData);
  };

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>HR Contacts List</p>
        <div className="view-actions">
          <label htmlFor="status" className="mr-2">
            Status:
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={handleFilterChange}
            className="status-dropdown"
          >
            <option value="All">All</option>
            <option value="Contact">Contact</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>
        </div>
      </div>
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
      {HrListLoading ? (
        <div className="text-center py-4">Loading HR contacts...</div>
      ) : (
        <div className="hr-table-container">
          <table className="hr-table">
            <thead>
              <tr>
                <th>HR Name</th>
                <th>Company Name</th>
                <th>Last Contacted</th>
                <th>Next Contact Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((hr) => (
                <HrTableRow
                  key={hr.id}
                  hr={hr}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HrList;
