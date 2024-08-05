import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";
import { fetchHRList } from "../../api/ListofHR";
import HrTableRow from "./HrTableRow";

const HrList = () => {
  const [hrData, setHrData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getHRList() {
      try {
        const data = await fetchHRList();
        console.log(data);
        setHrData(data);
      } catch (err) {
        setError("Failed to load HR list");
        console.log(err);
      }
    }
    getHRList();
  }, []);

  const handleStatusChange = (id, status) => {
    setHrData((prevHrData) =>
      prevHrData.map((hr) => (hr.id === id ? { ...hr, status } : hr))
    );
    console.log(hrData);
  };

  return (
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
            {hrData.map((hr) => (
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
  );
};

export default HrList;
