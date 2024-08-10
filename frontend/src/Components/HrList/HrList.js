import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";
import { fetchHRList } from "../../api/listofHR";
import HrTableRow from "./HrTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const HrList = () => {
  const [hrData, setHrData] = useState([]);
  const [error, setError] = useState("");
  const [HrListLoading, SetHrListLoading] = useState(true);

  useEffect(() => {
    async function getHRList() {
      try {
        SetHrListLoading(true);
        const data = await fetchHRList();
        console.log(data);
        setHrData(data);
        SetHrListLoading(false);
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
    <>
      {!HrListLoading ? (
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
