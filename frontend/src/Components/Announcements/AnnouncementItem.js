import React from "react";

const AnnouncementItem = ({ announcement }) => {
  return (
    <div className="message-box">
      <img
        src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
        alt="announcement"
      />
      <div className="message-content">
        <div className="message-header">
          <div className="name">User</div>
        </div>
        <p className="message-line">{announcement.announcement}</p>
        <p className="message-line time">
          {new Date(announcement.created).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementItem;
