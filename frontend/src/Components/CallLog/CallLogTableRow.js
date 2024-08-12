import React from "react";

const CallLogTableRow = ({ callLog }) => {
  console.log(callLog);
  const { student_id, hr_id, comment, colour } = callLog;
  const studentName = student_id.first_name;
  const hrName = hr_id.name;

  return (
    <tr className="call-log-row" style={{ backgroundColor: colour }}>
      <td>{studentName}</td>
      <td>{hrName}</td>
      <td>{comment}</td>
    </tr>
  );
};

export default CallLogTableRow;
