import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Announcements from "../Announcements/Announcements";

function DashboardHeader() {
  const [userName, setUserName] = useState("Name");
  const [userPhoto, setUserPhoto] = useState("");
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  useEffect(() => {
    const storedUserDetail = localStorage.getItem("user_detail");
    if (storedUserDetail) {
      try {
        const userDetails = JSON.parse(storedUserDetail);
        const { first_name, last_name } = userDetails.user;
        setUserName(`${first_name} ${last_name}`);
        setUserPhoto(
          `${process.env.REACT_APP_API_HOST}${userDetails.photo}`
        );
      } catch (error) {
        console.error("Error parsing user_detail from localStorage:", error);
      }
    }
  }, []);

  const toggleAnnouncements = () => {
    setShowAnnouncements(!showAnnouncements);
  };

  return (
    <div className="app-header">
      <div className="app-header-left">
        <span className="app-icon"></span>
        <p className="app-name">CampusHirease</p>
      </div>
      <div className="app-header-right">
        <button
          onClick={toggleAnnouncements}
          className="bg-[#000000] text-white rounded-full p-2  hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg"
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
        <Link to="/user-profile">
          <button className="profile-btn">
            <img
              src={
                userPhoto ||
                "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
              }
              alt="Profile"
            />
            <span>{userName}</span>
          </button>
        </Link>
        {showAnnouncements && (
          <div className="announcement-popup">
            <Announcements />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;





