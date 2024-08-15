import React, { useEffect, useState } from "react";
import "./CallLog.css";
import { fetchCallHistoryList } from "../../api/fetchCallHistory";
import CallLogTableRow from "./CallLogTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const CallLog = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [error, setError] = useState("");
  const [callLogLoading, setCallLogLoading] = useState(true);

  useEffect(() => {
    async function getCallLogs() {
      try {
        setCallLogLoading(true);
        // Check if data is already in local storage
        const storedCallLogs = localStorage.getItem("callLogs");
        if (storedCallLogs) {
          setCallLogs(JSON.parse(storedCallLogs));
          setCallLogLoading(false);
        } else {
          // Fetch data if not found in local storage
          const data = await fetchCallHistoryList();
          setCallLogs(data);
          // Save the fetched data to local storage
          localStorage.setItem("callLogs", JSON.stringify(data));
          setCallLogLoading(false);
        }
      } catch (err) {
        setError("Failed to load call logs");
        console.log(err);
      }
    }
    getCallLogs();
  }, []);

  return (
    <div className="call-log-container">
      <h2>Call Logs</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="call-log-table-container">
        {!callLogLoading ? (
          <table className="call-log-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Student Name</th>
                <th className="col-2 left-align">HR Name</th>
                <th className="col-3 left-align">Comment</th>
              </tr>
            </thead>
            <tbody>
              {callLogs.map((callLog, index) => (
                <CallLogTableRow key={index} callLog={callLog} />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="call-log-table">
            <thead>
              <tr>
                <th className="col-2 left-align">Student Name</th>
                <th className="col-2 left-align">HR Name</th>
                <th className="col-3 left-align">Comment</th>
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
                <td className="col-3 left-align">
                  <ShimmerTable row={3} col={1} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CallLog;