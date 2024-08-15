import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./MyHrList.css";
import { fetchmyHRList } from "../../api/fetchMyHRlist";
import MyHrTableRow from "./MyHrTableRow";
import apiClient from '../../services/api';

const MyHrList = () => {
  const [myHrData, setMyHrData] = useState([]);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function getmyHRList() {
      try {
        // Check if data is already in local storage
        const storedMyHrData = localStorage.getItem("myHrData");
        if (storedMyHrData) {
          setMyHrData(JSON.parse(storedMyHrData));
        } else {
          // Fetch data if not found in local storage
          const data = await fetchmyHRList();
          console.log(data);
          setMyHrData(data);
          // Save the fetched data to local storage
          localStorage.setItem("myHrData", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load My HR list");
        console.log(err);
      }
    }
    getmyHRList();
  }, []);
 
  const handleStatusChange = async (id, status) => {
    console.log("hello ji");
    try { 
      // Perform the API request to update the status
      const response = await apiClient.post('/api/myhrlist/', {
        id,
        status,
      });

      console.log('Status updated successfully:', response.data);

      // Update state after the API request succeeds
      setMyHrData((prevHrData) =>
        prevHrData.map((hr) => (hr.id === id ? { ...hr, status } : hr))
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredData = statusFilter === "All"
    ? myHrData
    : myHrData.filter(hr => hr.status === statusFilter);
    

  return (
    <div className="myhr-list-container">
       <label htmlFor="status">Status:</label><br />
          <select
           id="status"
           value={statusFilter}
           onChange={handleFilterChange}
           className="status-filter-dropdown">
          
            <option value="All">All</option>
            <option value="Contact">Contact</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>
      <h2>My HR List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="myhr-list-table-container">
        <table className="myhr-table">
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
              <MyHrTableRow
                key={hr.id}
                hr={hr}
                handleStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHrList;
