import React, { useEffect, useState, useRef } from "react";
import { fetchAnnouncements } from "../../api/announcement";
import AnnouncementItem from "./AnnouncementItem";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import "./Announcement.css";
import { sendAnnouncements } from "../../api/sendAnnouncement";
import { toast } from "react-hot-toast";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  //const [announcementInput, setAnnouncementInput] = useState("");
  const [AnnouncementLoading, SetAnnouncementLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ announcement: "" });

  const formRef = useRef(null);
  const buttonRef = useRef(null);

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

  // Close form if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the form and the add-announcement-btn
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    }

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, announcement: e.target.value });
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await sendAnnouncements(formData);

      if (response.status === 201) {
        setAnnouncements((prevAnnouncements) => [
          formData,
          ...prevAnnouncements,
        ]);
        localStorage.setItem(
          "announcements",
          JSON.stringify([formData, ...announcements])
        );
        //setAnnouncementInput("");
        setShowForm(false);
      } else {
        toast.error("Failed to add the announcement.");
      }
    } catch (error) {
      console.error("Error adding the announcement:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <h2>Announcements</h2>
        <button
          onClick={toggleForm}
          className="add-announcement-btn"
          ref={buttonRef}
        >
          {showForm ? "×" : "+"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddAnnouncement}
          className="announcement-form"
          ref={formRef}
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

      <div className="announcements-scroll-area">
        {AnnouncementLoading ? (
          <div className="announcements-loading">
            {[1, 2, 3, 4].map((x) => (
              <ShimmerCategoryItem
                key={x}
                hasImage
                imageType="circular"
                imageWidth={50}
                imageHeight={50}
                text
              />
            ))}
          </div>
        ) : (
          <div className="announcements-list">
            {error && <p className="error-message">{error}</p>}
            {announcements.length === 0 ? (
              <p>No Announcements</p>
            ) : (
              announcements.map((announcement, index) => (
                <AnnouncementItem key={index} announcement={announcement} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
