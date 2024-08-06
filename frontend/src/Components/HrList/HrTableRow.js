import React, { useState } from "react";
import HrModal from "./HrModal";

const HrTableRow = ({ hr, handleStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        <td className="col-2 left-align">{hr.name}</td>
        <td className="col-2 left-align">{hr.company_id.name}</td>
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
            <option value="Already_Contacted">Already Contacted</option>
          </select>
        </td>
      </tr>
      {isModalOpen && (
        <HrModal
          hr={hr}
          onClose={handleCloseModal}
          handleStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

export default HrTableRow;
