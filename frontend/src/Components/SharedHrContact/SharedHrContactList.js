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

  if (HrListLoading) {
    return <ShimmerTable row={5} col={15} />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="shared-hr-contact-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Company Name</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th>LinkedIn</th>
          <th>Add to List</th>
        </tr>
      </thead>
      <tbody>
        {sharedHrData.map((hr, index) => (
          <SharedHrTableRow key={index} hr={hr} />
        ))}
      </tbody>
    </table>
  );
};

export default SharedHrContactList;
