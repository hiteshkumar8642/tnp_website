import React from "react";
import "./Team.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Bansal from "./Image/Bansal.jpg";
import Sayantan from "./Image/Sayantan.jpg";
import { Link } from "react-router-dom";
export default function Team() {
  const teamMembers = [
    {
      name: "Hitesh Kumar",
      imageUrl: "https://shorturl.at/47wjK",
      position: "Creative Director",
      description:
        "As the Creative Director, my role is to bring innovative ideas to life and lead our talented team of designers and artists to create visually stunning and impactful digital campaigns.",
      socialLinks: [
        { url: "#", iconClass: "fab fa-linkedin" },
        { url: "#", iconClass: "fab fa-instagram" },
        { url: "#", iconClass: "fab fa-twitter" },
        { url: "#", iconClass: "fas fa-envelope" },
      ],
    },
    {
      name: "Sayantan Bairagi",
      imageUrl: Sayantan,
      position: "Frontend Developer",
      description:
        "As an Account Manager, I bridge the gap between clients and our agency, ensuring we understand their needs and deliver exceptional results, fostering strong relationships and client satisfaction.",
      socialLinks: [
        { url: "#", iconClass: "fab fa-linkedin" },
        { url: "#", iconClass: "fab fa-instagram" },
        { url: "#", iconClass: "fab fa-twitter" },
        { url: "#", iconClass: "fas fa-envelope" },
      ],
    },
    {
      name: "Ritik Bansal",
      imageUrl: Bansal,
      position: "Backend Developer",
      description:
        "As Social Media Manager, I connect with our audience, crafting engaging content that enhances clients' online presence, drives engagement, and fosters community, contributing to our clients' digital success.",
      socialLinks: [
        { url: "#", iconClass: "fab fa-linkedin" },
        { url: "#", iconClass: "fab fa-instagram" },
        { url: "#", iconClass: "fab fa-twitter" },
        { url: "#", iconClass: "fas fa-envelope" },
      ],
    },
  ];

  return (
    <>
      <Header>
        <Link to="/login">
          <button className="nav-button">Student LogIn</button>
        </Link>
      </Header>
      <div className="team-content">
        <header className="info">
          <h1>Meet Our Team</h1>
          <h5>
            Get to know the talented individuals behind our exceptional work.
          </h5>
        </header>
        <div className="team-list">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              imageUrl={member.imageUrl}
              position={member.position}
              description={member.description}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

function TeamMember({ name, imageUrl, position, description, socialLinks }) {
  const truncateDescription = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <article className="team-item">
      <div className="team-photo">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="team-info">
        <h2>{name}</h2>
        <h3>{position}</h3>
        <p>{truncateDescription(description, 30)}</p>
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url}>
              <i className={link.iconClass}></i>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
