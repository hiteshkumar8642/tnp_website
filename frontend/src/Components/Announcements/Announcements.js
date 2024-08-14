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
  const [formData, setFormData] = useState({ announcement: "" });

  useEffect(() => {
    async function getAnnouncements() {
      try {
        SetAnnouncementLoading(true);
        let localdata = localStorage.getItem("announcements")
          ? JSON.parse(localStorage.getItem("announcements"))
          : null;
        
        if (localdata === null) {
          localdata = await fetchAnnouncements();
          setAnnouncements(localdata);
          localStorage.setItem("announcements", JSON.stringify(localdata));
        } else {
          setAnnouncements(localdata);
        }
        SetAnnouncementLoading(false);
      } catch (err) {
        setError("Failed to load announcements");
        SetAnnouncementLoading(false);
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
      const response = await apiClient.post(
        "dashboard/api/add_announcements/",
        formData
      );

      if (response.status === 201) {
        console.log("Announcement added successfully!");
        setAnnouncements((prevAnnouncements) => [
          formData,
          ...prevAnnouncements,
        ]);
        localStorage.setItem(
          "announcements",
          JSON.stringify([formData, ...announcements])
        );
        setAnnouncementInput("");
        setShowForm(false);
      } else {
        console.log("Failed to add the announcement.");
      }
    } catch (error) {
      console.error("Error adding the announcement:", error);
    }
  };

  return (
    <div className="announcements-popup-content">
      <div className="messages-section">
        <div className="projects-section-header ">
          <p>Announcements</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-announcement-btn"
          >
            +
          </button>
        </div>

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

        {AnnouncementLoading ? (
          <div>
            {[1, 2, 3, 4].map((x) => (
              <div className="messages" style={{ margin: "10px" }} key={x}>
                <ShimmerCategoryItem
                  hasImage
                  imageType="circular"
                  imageWidth={50}
                  imageHeight={50}
                  text
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="messages">
            {error && <p>{error}</p>}
            {announcements.map((announcement, index) => (
              <AnnouncementItem
                key={index}
                announcement={announcement}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;