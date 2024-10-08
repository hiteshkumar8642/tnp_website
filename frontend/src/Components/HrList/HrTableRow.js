import React, { useState, useRef } from "react";
import HrModal from "./HrModal";

const HrTableRow = ({ hr, handleStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Check if the date string is null or undefined
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date strings
    }
    return date.toISOString().split("T")[0];
  };

  const handleRowClick = (e) => {
    // Prevent opening the modal if the select dropdown is clicked
    if (selectRef.current && selectRef.current.contains(e.target)) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusDropdownChange = async (e) => {
    const newStatus = e.target.value;
    handleStatusChange(hr.id, newStatus);
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        <td className="col-2 left-align">{hr.name || "N/A"}</td>
        <td className="col-2 left-align">{hr.company_id?.name || "N/A"}</td>
        <td className="col-1 center-align">
          {formatDate(hr.last_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          {formatDate(hr.next_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          <select
            ref={selectRef}
            value={hr.status || "To_Be_Contacted"}
            onChange={handleStatusDropdownChange}
            className="status-dropdown"
          >
            <option value="To_Be_Contacted">To Be Contacted</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>
        </td>
      </tr>
      {isModalOpen && <HrModal hr={hr} onClose={handleCloseModal} />}
    </>
  );
};

export default HrTableRow;
