import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HrList.css";

const HrList = () => {
  const [hrData, setHrData] = useState([
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      lastContacted: "",
      nextContact: new Date(2024, 7, 1),
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Inc",
      lastContacted: new Date(2024, 6, 20),
      nextContact: new Date(2024, 7, 5),
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "123 LLC",
      lastContacted: new Date(2024, 6, 18),
      nextContact: new Date(2024, 6, 30),
      status: "Inactive",
    },
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      lastContacted: new Date(2024, 6, 15),
      nextContact: new Date(2024, 7, 1),
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Inc",
      lastContacted: new Date(2024, 6, 20),
      nextContact: new Date(2024, 7, 5),
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "123 LLC",
      lastContacted: new Date(2024, 6, 18),
      nextContact: new Date(2024, 6, 30),
      status: "Inactive",
    },
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      lastContacted: new Date(2024, 6, 15),
      nextContact: new Date(2024, 7, 1),
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Inc",
      lastContacted: new Date(2024, 6, 20),
      nextContact: new Date(2024, 7, 5),
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "123 LLC",
      lastContacted: new Date(2024, 6, 18),
      nextContact: new Date(2024, 6, 30),
      status: "Inactive",
    },
    {
      id: 1,
      name: "John Doe",
      company: "ABC Corp",
      lastContacted: new Date(2024, 6, 15),
      nextContact: new Date(2024, 7, 1),
      status: "Active",
    },
  ]);

  const handleDateChange = (id, field, date) => {
    setHrData(
      hrData.map((hr) => (hr.id === id ? { ...hr, [field]: date } : hr))
    );
  };

  return (
    <div className="hr-list-container">
      <h2>HR Contacts List</h2>
      <div className="hr-list-table-container">
        <table className="hr-table">
          <thead>
            <tr>
              <th>HR Name</th>
              <th>Company Name</th>
              <th>Last Contacted</th>
              <th>Next Contact Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {hrData.map((hr) => (
              <tr key={hr.id}>
                <td>{hr.name}</td>
                <td>{hr.company}</td>
                <td>
                  <DatePicker
                    selected={hr.lastContacted}
                    onChange={(date) =>
                      handleDateChange(hr.id, "lastContacted", date)
                    }
                    dateFormat="yyyy-MM-dd"
                    className="date-picker"
                  />
                </td>
                <td>
                  <DatePicker
                    selected={hr.nextContact}
                    onChange={(date) =>
                      handleDateChange(hr.id, "nextContact", date)
                    }
                    dateFormat="yyyy-MM-dd"
                    className="date-picker"
                  />
                </td>
                <td>{hr.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HrList;
