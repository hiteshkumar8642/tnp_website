import React, { useState, useRef } from "react";
import MyHrModal from "./MyHrModal";

const HrTableRow = ({ hr, handleStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleRowClick = (e) => {
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

    // Call the provided handleStatusChange function to update the status locally
    handleStatusChange(hr.id, newStatus);
    try {
      // const response = await apiClient.post('dashboard/api/hr_contacts/', {
      //   id: hr.id,
      //   status: newStatus
      // });
      // console.log('Status updated successfully:', response.data);
    } catch (error) {
      // Handle errors if the API request fails
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        <td className="col-2 left-align">{hr?.name || "N/A"}</td>
        <td className="col-2 left-align">{hr?.company_id?.name || "N/A"}</td>
        <td className="col-1 center-align">
          {formatDate(hr?.last_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          {formatDate(hr?.next_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          <select
            ref={selectRef}
            value={hr?.status || ""}
            onChange={handleStatusDropdownChange}
            className="status-dropdown"
          >
            <option value="Contact">Contact</option>
            <option value="Do_not_Contact">Do not Contact</option>
            <option value="Already_Contacted">Already Contacted</option>
          </select>
        </td>
      </tr>
      {isModalOpen && (
        <MyHrModal
          hr={hr}
          onClose={handleCloseModal}
          handleStatusChange={handleStatusChange}
        />
      )}
    </>
  );
};

export default HrTableRow;
