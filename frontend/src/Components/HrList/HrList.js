import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";
import { fetchHRList } from "../../api/ListofHR";
import HrTableRow from "./HrTableRow";
import { ShimmerTable } from "react-shimmer-effects";
import apiClient from "../../services/api";

const HrList = () => {
  const [hrData, setHrData] = useState([]);
  const [error, setError] = useState("");
  const [HrListLoading, SetHrListLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All"); // State for filter

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
      const params = new URLSearchParams({id,status});
      const response = await apiClient.post('apis/hrdata-modified/', params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        });
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
        console.log("chexking data",filteredData);
};

  return (
    <>
      {!HrListLoading ? (
        <div className="hr-list-container">
          <label htmlFor="status">Status:</label>
          <br />
          <select
            id="status"
            value={statusFilter}
            onChange={handleFilterChange}
            className="status-filter-dropdown"
          >
            <option value="All">All</option>
            <option value="Contact">Contact</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>

          <h2>HR Contacts List</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="hr-list-table-container">
            <table className="hr-table">
              <thead>
                <tr>
                  <th className="col-2 left-align">HR Name</th>
                  <th className="col-2 left-align">Company Name</th>
                  <th className="col-1 center-align">Last Contacted</th>
                  <th className="col-1 center-align">Next Contact Date</th>
                  <th className="col-1 center-align">Status</th>
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
        </div>
      ) : (
        <div className="hr-list-container">
          <h2>HR Contacts List</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="hr-list-table-container">
            <table className="hr-table">
              <thead>
                <tr>
                  <th className="col-2 left-align">HR Name</th>
                  <th className="col-2 left-align">Company Name</th>
                  <th className="col-1 center-align">Last Contacted</th>
                  <th className="col-1 center-align">Next Contact Date</th>
                  <th className="col-1 center-align">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-2 left-align">
                    <ShimmerTable row={3} col={1} />
                  </td>
                  <td className="col-2 left-align">
                    <ShimmerTable row={3} col={1} />
                  </td>
                  <td className="col-2 left-align">
                    <ShimmerTable row={3} col={1} />
                  </td>
                  <td className="col-2 left-align">
                    <ShimmerTable row={3} col={1} />
                  </td>
                  <td className="col-2 left-align">
                    <ShimmerTable row={3} col={1} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default HrList;
