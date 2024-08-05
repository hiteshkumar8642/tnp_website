import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../api/announcement";
import AnnouncementItem from "./AnnouncementItem";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAnnouncements() {
      try {
        const data = await fetchAnnouncements();
        console.log(data);
        setAnnouncements(data);
      } catch (err) {
        setError("Failed to load announcements");
      }
    }
    getAnnouncements();
  }, []);

  return (
    <div className="messages-section">
      <button className="messages-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </button>
      <div className="projects-section-header">
        <p>Announcements</p>
      </div>
      <div className="messages">
        {error && <p>{error}</p>}
        {announcements.map((announcement) => (
          <AnnouncementItem
            key={announcement.announcement}
            announcement={announcement}
          />
        ))}
      </div>
    </div>
  );
}

export default Announcements;
