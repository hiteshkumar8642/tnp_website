import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./MyHrList.css";
import { fetchmyHRList } from "../../api/fetchMyHRlist";
import MyHrTableRow from "./MyHrTableRow";

const MyHrList = () => {
  const [myHrData, setMyHrData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getmyHRList() {
      try {
        const data = await fetchmyHRList();
        console.log(data);
        setMyHrData(data);
      } catch (err) {
        setError("Failed to load My HR list");
        console.log(err);
      }
    }
    getmyHRList();
  }, []);

  const handleStatusChange = (id, status) => {
    setMyHrData((prevHrData) =>
      prevHrData.map((hr) => (hr.id === id ? { ...hr, status } : hr))
    );
    console.log(myHrData);
  };

  return (
    <div className="myhr-list-container">
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
            {myHrData.map((hr) => (
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
