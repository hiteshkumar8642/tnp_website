import React from "react";
import { sendSharedHrId } from "../../api/sendSharedHrId";

const SharedHrTableRow = ({ hr, onRemove }) => {
  const { company_name, contact_number, email, gender, name, linkedin_id } = hr;

  const handleAddClick = async () => {
    try {
      const existingHrContacts =
        JSON.parse(localStorage.getItem("hrData")) || [];

      console.log("it is a hr id ", hr.id);
      const updatedHrContacts = [...existingHrContacts, hr];
      console.log(hr.id);

      localStorage.setItem("hrData", JSON.stringify(updatedHrContacts));
      const response = await sendSharedHrId({ HR_id: hr.id });
      console.log("Added to Hr List:", response);

      onRemove(hr);
    } catch (err) {
      console.log("Error ", err);
    }
  };
  return (
    <tr className="shared-hr-table-row">
      <td>{name}</td>
      <td>{gender}</td>
      <td>{company_name}</td>
      <td>{contact_number}</td>
      <td>{email}</td>
      <td>
        <a href={linkedin_id} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </td>
      <td>
        <button className="add-to-list-button" onClick={handleAddClick}>
          Add
        </button>
      </td>
    </tr>
  );
};

export default SharedHrTableRow;
