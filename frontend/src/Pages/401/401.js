import React, { useEffect } from "react";
import "./401.css";

function UnauthorizedPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="unauthorized-container">
      <div className="lock"></div>
      <div className="message">
        <h1 className="message-heading">Access to this page is restricted</h1>
        <p className="message-text">
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
