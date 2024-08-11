import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../api/announcement";
import AnnouncementItem from "./AnnouncementItem";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import apiClient from "../../services/api";
import "./Announcement.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [announcementInput, setAnnouncementInput] = useState("");
  const [AnnouncementLoading, SetAnnouncementLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [formData, setFormData] = useState({ announcement: "" });

  useEffect(() => {
    async function getAnnouncements() {
      try {
        SetAnnouncementLoading(true);
        let localdata = localStorage.getItem("announcements")
          ? JSON.parse(localStorage.getItem("announcements"))
          : null;
          console.log(localdata);
        if (localdata === null) {
          localdata = await fetchAnnouncements();
          console.log("hello");
          setAnnouncements(localdata);
          localStorage.setItem("announcements", JSON.stringify(localdata));
        } else {
          setAnnouncements(localdata);
        }
        SetAnnouncementLoading(false);
      } catch (err) {
        setError("Failed to load announcements");
      }
    }
    getAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, announcement: e.target.value });
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await apiClient.post(
        "dashboard/api/add_announcements/",
        formData
      );

      if (response.status === 201) {
        console.log("Announcement added successfully!");
        setAnnouncements((prevAnnouncements) => [
          ...prevAnnouncements,
          formData,
        ]);
        localStorage.setItem(
          "announcements",
          JSON.stringify([...announcements, formData])
        );
        setAnnouncementInput("");
        setShowForm(false); // Hide form after successful submission
      } else {
        console.log("Failed to add the announcement.");
      }
    } catch (error) {
      console.error("Error adding the announcement:", error);
    }
  };

  return (
    <>
      {!AnnouncementLoading ? (
        <div className="messages-section">
          
          
          <div className="projects-section-header">
            <p>Announcements</p>
            <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-[#000000] text-white rounded-full p-2 hover:bg-[#5752d8] focus:outline-none focus:ring-2 focus:ring-[#6c63ff] shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.5a2.032 2.032 0 01-.595-1.405v-2c0-1.08-.213-2.145-.61-3.156A6.989 6.989 0 0012 4c-2.72 0-5.09 1.525-6.39 3.94A8.02 8.02 0 005 9.5v2c0 .52-.214 1.025-.595 1.405L3 17h5m7 0v1a3 3 0 01-6 0v-1m6 0H9"
              />
            </svg>
          </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="add-announcement-btn"
            >
              +
            </button>
          </div>

          {showNotifications && (
            <div className="messages">
              {error && <p>{error}</p>}
              {announcements.map((announcement) => (
                <AnnouncementItem
                  key={announcement.announcement}
                  announcement={announcement}
                />
              ))}
            </div>
          )}

          {showForm && (
            <form
              onSubmit={handleAddAnnouncement}
              className="announcement-form"
            >
              <input
                type="text"
                value={formData.announcement}
                onChange={handleInputChange}
                placeholder="Write your announcement"
                required
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      ) : (
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
          {[1, 2, 3, 4].map((x) => (
            <div className="messages" style={{ margin: "10px" }}>
              <ShimmerCategoryItem
                key={x}
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                text
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Announcements;
