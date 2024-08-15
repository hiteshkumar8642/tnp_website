import React, { useEffect, useState } from "react";
import "./SharedHrContactList.css";
import { fetchSharedHRList } from "../../api/listOfSharedHR";
import SharedHrTableRow from "./SharedHrTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const SharedHrContactList = () => {
  const [sharedHrData, setSharedHrData] = useState([]);
  const [error, setError] = useState("");
  const [HrListLoading, SetHrListLoading] = useState(true);

  useEffect(() => {
    async function getSharedHRList() {
      try {
        SetHrListLoading(true);

        // Check if data is already in local storage
        const storedHRData = localStorage.getItem("SharedhrData");
        if (storedHRData) {
          setSharedHrData(JSON.parse(storedHRData));
          SetHrListLoading(false);
        } else {
          // Fetch data if not found in local storage
          const data = await fetchSharedHRList();
          setSharedHrData(data);
          // Save the fetched data to local storage
          localStorage.setItem("SharedhrData", JSON.stringify(data));
          SetHrListLoading(false);
        }
      } catch (err) {
        setError("Failed to load HR list");
        console.log(err);
      }
    }
    getSharedHRList();
  }, []);

  return (
    <div className="shared-hr-list-container">
      <h2>Shared HR Contacts List</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="shared-hr-list-table-container">
        {!HrListLoading ? (
          <table className="shared-hr-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Name</th>
                <th className="col-2 left-align">Gender</th>
                <th className="col-2 left-align">Company Name</th>
                <th className="col-2 left-align">Contact Number</th>
                <th className="col-2 left-align">Email</th>
                <th className="col-2 left-align">LinkedIn</th>
                <th className="col-2 left-align">Add to List</th>
              </tr>
            </thead>
            <tbody>
              {sharedHrData.map((hr, index) => (
                <SharedHrTableRow key={index} hr={hr} />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="shared-hr-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Name</th>
                <th className="col-1 center-align">Gender</th>
                <th className="col-2 left-align">Company Name</th>
                <th className="col-1 center-align">Contact Number</th>
                <th className="col-2 left-align">Email</th>
                <th className="col-1 center-align">LinkedIn</th>
                <th className="col-1 center-align">Add to List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <ShimmerTable row={5} col={7} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SharedHrContactList;