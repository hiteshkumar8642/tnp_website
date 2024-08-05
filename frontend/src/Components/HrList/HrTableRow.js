import React from "react";

const HrTableRow = ({ hr, handleStatusChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formats date as YYYY-MM-DD
  };

  return (
    <tr>
      <td className="col-2 left-align">{hr.name}</td>
      <td className="col-2 left-align">{hr.company_id}</td>
      <td className="col-1 center-align">
        {formatDate(hr.last_date_of_contact)}
      </td>
      <td className="col-1 center-align">
        {formatDate(hr.next_date_of_contact)}
      </td>
      <td className="col-1 center-align">
        <select
          value={hr.status || ""}
          onChange={(e) => handleStatusChange(hr.id, e.target.value)}
          className="status-dropdown"
        >
          <option value="Contact">Contact</option>
          <option value="Do not Contact">Do not Contact</option>
          <option value="Already Contacted">Already Contacted</option>
        </select>
      </td>
    </tr>
  );
};

export default HrTableRow;
