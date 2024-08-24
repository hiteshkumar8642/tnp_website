import React, { useEffect, useState } from "react";
import "./CallLog.css";
import { fetchCallHistoryList } from "../../api/fetchCallHistory";
import CallLogTableRow from "./CallLogTableRow";
import { ShimmerTable } from "react-shimmer-effects";

const CallLog = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCallLogs() {
      try {
        setIsLoading(true);
        const storedCallLogs = localStorage.getItem("callLogs");
        if (storedCallLogs) {
          setCallLogs(JSON.parse(storedCallLogs));
        } else {
          const data = await fetchCallHistoryList();
          setCallLogs(data);
          localStorage.setItem("callLogs", JSON.stringify(data));
        }
      } catch (err) {
        setError("Failed to load call logs");
      } finally {
        setIsLoading(false);
      }
    }
    getCallLogs();
  }, []);

  return (
    <div className="projects-section">
      <div className="projects-section-header">
        <p>Call Logs</p>
      </div>
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <ShimmerTable row={6} col={3} className="shimmer-table-effect" />
      ) : (
        <div className="call-log-table-container">
          <table className="call-log-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>HR Name</th>
                <th>Comment</th>
              </tr>
            </thead>
          </table>
          <div className="table-body-container">
            <table className="call-log-table">
              <tbody>
                {callLogs.map((callLog, index) => (
                  <CallLogTableRow key={index} callLog={callLog} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallLog;
