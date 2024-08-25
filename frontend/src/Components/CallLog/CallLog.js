import React, { useEffect, useState } from "react";
import "./CallLog.css";
import { fetchCallHistoryList } from "../../api/fetchCallHistory";
import CallLogTableRow from "./CallLogTableRow";
import { ShimmerTable } from "react-shimmer-effects";
import { toast } from "react-hot-toast";

const CallLog = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCallLogs() {
      try {
        setIsLoading(true);
        const data = await fetchCallHistoryList();
        setCallLogs(data);
      } catch (err) {
        toast.error("Failed to load call logs");
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
                {callLogs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Calllog found
                    </td>
                  </tr>
                ) : (
                  callLogs.map((callLog, index) => (
                    <CallLogTableRow key={index} callLog={callLog} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallLog;
