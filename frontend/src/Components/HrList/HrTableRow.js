import React, { useState, useRef } from "react";
import HrModal from "./HrModal";
import apiClient from '../../services/api';

const HrTableRow = ({ hr, handleStatusChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleRowClick = (e) => {
    if (selectRef.current.contains(e.target)) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getSafeValue = (value) => (value ? value : "N/A");
  const handleStatusDropdownChange = async (e) => {
    const newStatus = e.target.value;
    
    handleStatusChange(hr.id, newStatus);
    try {
 
      const params = new URLSearchParams({id:hr.id});
      const response = await apiClient.post('apis/hassignme/', params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        });
      console.log("Status updated successfully:", response.data);
    } catch (error) {
      // Handle errors if the API request fails
      console.error('Failed to update status:', error);
    }
  };

  return (
    <>
      <tr onClick={handleRowClick}>
        <td className="col-2 left-align">{getSafeValue(hr.name)}</td>
        <td className="col-2 left-align">
          {getSafeValue(hr.company_id?.name)}
        </td>
        <td className="col-1 center-align">
          {formatDate(hr?.last_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          {formatDate(hr?.next_date_of_contact)}
        </td>
        <td className="col-1 center-align">
          <select
            ref={selectRef}
            value={hr.status || "Contact"}
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


