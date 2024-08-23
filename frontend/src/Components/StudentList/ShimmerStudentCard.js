import React from "react";
import "./ShimmerStudentCard.css"; // Define styles for ShimmerStudentCard

function ShimmerStudentCard() {
  return (
    <div className="shimmer-student-card">
      <div className="shimmer-student-card-image"></div>
      <div className="shimmer-student-card-content">
        <div className="shimmer-student-card-name"></div>
        <div className="shimmer-student-card-username"></div>
      </div>
    </div>
  );
}

export default ShimmerStudentCard;
