import React from "react";

const SharedHrTableRow = ({ hr }) => {
  const { company_name, contact_number, email, gender, name, linkedin_id } = hr;

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
        <button className="add-to-list-button">Add</button>
      </td>
    </tr>
  );
};

export default SharedHrTableRow;
