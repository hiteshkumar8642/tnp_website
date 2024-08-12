import React from "react";

const SharedCompanyTableRow = ({ company }) => {
  const { company_name, company_contact, company_email, ctc, college_visited } =
    company;

  return (
    <tr className="company-table-row">
      <td>{company_name}</td>
      <td>{company_contact}</td>
      <td>{company_email}</td>
      <td>{ctc}</td>
      <td>{college_visited}</td>
    </tr>
  );
};

export default SharedCompanyTableRow;
