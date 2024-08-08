import React, { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../api/announcement";
import AnnouncementItem from "./AnnouncementItem";
import { ShimmerCategoryItem } from "react-shimmer-effects";


function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [AnnouncementLoading,SetAnnouncementLoading]=useState(false);
  useEffect(() => {
    async function getAnnouncements() {
      try {
        SetAnnouncementLoading(false);
        let localdata =localStorage.getItem("announcements")?JSON.parse(localStorage.getItem("announcements")):null;
        console.log(localdata);
        if(localdata === null)
        {  localdata = await fetchAnnouncements();
          console.log("hello");
          setAnnouncements(localdata);
          localStorage.setItem("announcements", JSON.stringify(localdata));
        }
        else{
          setAnnouncements(localdata);
        }
        SetAnnouncementLoading(true);
      } catch (err) {
        setError("Failed to load announcements");
      }
    }
    getAnnouncements();
  }, []);

  return (
    <>
    {AnnouncementLoading ? 
      (<div className="messages-section">
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
      </div>): 
      (
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
        {
          [1, 2, 3, 4].map(x => (
            <div className="messages" style={{margin:"10px"}}>
            <ShimmerCategoryItem
              key={x} // Adding a key prop is important when rendering lists in React
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
