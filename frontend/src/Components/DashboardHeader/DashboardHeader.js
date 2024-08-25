import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Announcements from "../Announcements/Announcements";
import MYSVG from "../../assets/Logo/campuslogo.png";

function DashboardHeader() {
  const [userName, setUserName] = useState("Name");
  const [userPhoto, setUserPhoto] = useState("");
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // State for sidebar visibility
  const [role, setRole] = useState(null); // State for user role
  const [activeLink, setActiveLink] = useState(""); // State for active link
  const navigate = useNavigate();
  const announcementRef = useRef(null); // Reference for announcement box

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

    const storedUserProfile = localStorage.getItem("user_Profile");
    try {
      const userProfile = JSON.parse(storedUserProfile);
      setRole(userProfile.role);
    } catch (error) {
      console.error("Error parsing user_Profile from localStorage:", error);
    }
  }, []);

  const toggleAnnouncements = (event) => {
    event.stopPropagation(); // Prevent event from propagating to the document
    setShowAnnouncements(!showAnnouncements);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        announcementRef.current &&
        !announcementRef.current.contains(event.target)
      ) {
        setShowAnnouncements(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link
    setShowSidebar(false); // Hide the sidebar after clicking a link
  };

  return (
    <div className="app-header flex justify-between items-center p-4">
      <div>
        <div className="app-header-left flex items-center">
          <img src={MYSVG} alt="My SVG" className="w-16"/>
          <p className="app-name text-xl font-bold ml-2">CampusHirease</p>
        </div>
        {/* <div className="sm:hidden block">
            <img src={MYSVG} alt="My SVG" className="w-16"/>
        </div> */}
      </div>
      <div className="app-header-right flex items-center space-x-4">
        <button
          onClick={toggleAnnouncements}
          className="bg-black text-white rounded-full p-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg"
          aria-label="Toggle Announcements"
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
        {/* Hamburger button to toggle sidebar on small screens */}
        <button
          onClick={toggleSidebar}
          className="block sm:hidden bg-black text-white rounded-full p-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg"
          aria-label="Toggle Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {showSidebar ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
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
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{userName}</span>
          </button>
        </Link>

        {showAnnouncements && (
          <div
            ref={announcementRef}
            className="announcement-popup absolute right-0 mt-4 bg-white shadow-md rounded p-4 w-64"
          >
            <Announcements />
          </div>
        )}

        {/* Sidebar links as dropdown on small screens */}
        {showSidebar && (
          <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg w-64 z-50 p-4">
            <nav className="space-y-2">
              {(role === 1 || role === 2 || role === 3 || role === 4) && (
                <NavLink
                  to="/dashboard/companies"
                  className={`block text-black hover:text-indigo-600 p-2 rounded ${
                    activeLink === "companies" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleLinkClick("companies")}
                >
                  Companies
                </NavLink>
              )}
              {(role === 1 || role === 2 || role === 3 || role === 4) && (
                <NavLink
                  to="/dashboard/applied-companies"
                  className={`block text-black hover:text-indigo-600 p-2 rounded ${
                    activeLink === "applied-companies" ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleLinkClick("applied-companies")}
                >
                  Applied Companies
                </NavLink>
              )}
              {role === 2 && (
                <>
                  <NavLink
                    to="/dashboard/share-hr-contact"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "share-hr-contact" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("share-hr-contact")}
                  >
                    Share HR Contact
                  </NavLink>
                  <NavLink
                    to="/dashboard/share-company-contact"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "share-company-contact" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("share-company-contact")}
                  >
                    Share Company Contact
                  </NavLink>
                </>
              )}
              {(role === 3 || role === 4) && (
                <>
                  <NavLink
                    to="/dashboard/hr-list"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "hr-list" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("hr-list")}
                  >
                    HR List
                  </NavLink>
                  <NavLink
                    to="/dashboard/my-hr-list"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "my-hr-list" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("my-hr-list")}
                  >
                    My HR List
                  </NavLink>
                  <NavLink
                    to="/dashboard/shared-hr-contact"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "shared-hr-contact" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("shared-hr-contact")}
                  >
                    Shared HR Contact
                  </NavLink>
                  <NavLink
                    to="/dashboard/shared-company-contact"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "shared-company-contact"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("shared-company-contact")}
                  >
                    Shared Company Contact
                  </NavLink>
                  <NavLink
                    to="/dashboard/call-log"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "call-log"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("call-log")}
                  >
                     Call Log
                  </NavLink>
                  <NavLink
                    to="/dashboard/all-student-list"
                    className={`block text-black hover:text-indigo-600 p-2 rounded ${
                      activeLink === "all-student-list"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleLinkClick("all-student-list")}
                  >
                     AllStudentList
                  </NavLink>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block text-red-600 hover:text-red-800 p-2 rounded w-full text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
