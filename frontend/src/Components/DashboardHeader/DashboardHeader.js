import React, { useState } from "react";

function DashboardHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app-header">
      <div className="app-header-left">
        <span className="app-icon"></span>
        <p className="app-name">TNP Website</p>
      </div>
      <div className="app-header-right">
        <button
          className="mode-switch"
          title="Switch Theme"
          onClick={toggleTheme}
        >
          <svg
            className="moon"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        <a href="{% url 'userProfile' %}">
          <button className="profile-btn">
            <img
              src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
              alt="s"
            />
            <span>Name</span>
          </button>
        </a>
      </div>
    </div>
  );
}

export default DashboardHeader;
