import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";
import { fetchHRList } from "../../api/listofHR";
import HrTableRow from "./HrTableRow";
import { ShimmerTable } from "react-shimmer-effects";
import { sendHRinfo } from "../../api/updateHrInfo";
import { toast } from "react-hot-toast";

const HrList = () => {
  const [hrData, setHrData] = useState([]);
  const [HrListLoading, SetHrListLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function getHRList() {
      try {
        SetHrListLoading(true);
        const data = await fetchHRList();
        setHrData(data);
        SetHrListLoading(false);
      } catch (err) {
        toast.error("Failed to load HR list");
        SetHrListLoading(false);
      }
    }
    getHRList();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setHrData((prevHrData) =>
        prevHrData.map((hr) => (hr.id === id ? { ...hr, status } : hr))
      );
      const response = await sendHRinfo(id, status);
      if (response.status === 201 || response.status === 200) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Status update failed");
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredData =
    statusFilter === "All"
      ? hrData
      : hrData.filter(
          (hr) =>
            hr.status && hr.status.toLowerCase() === statusFilter.toLowerCase()
        );

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
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
            <option value="To_Be_Contacted">To Be Contacted</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>
        </div>
      </div>
      {HrListLoading ? (
        <ShimmerTable row={6} col={5} className="shimmer-table-effect" />
      ) : (
        <div className="hr-table-container overflow-auto">
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No HRs found
                  </td>
                </tr>
              ) : (
                filteredData.map((hr) => (
                  <HrTableRow
                    key={hr.id}
                    hr={hr}
                    handleStatusChange={handleStatusChange}
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

export default HrList;
