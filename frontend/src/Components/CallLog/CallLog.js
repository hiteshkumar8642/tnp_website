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

  if (callLogLoading) {
    return <ShimmerTable row={5} col={4} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="call-log-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>HR Name</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {callLogs.map((callLog, index) => (
          <CallLogTableRow key={index} callLog={callLog} />
        ))}
      </tbody>
    </table>
  );
};

export default CallLog;
