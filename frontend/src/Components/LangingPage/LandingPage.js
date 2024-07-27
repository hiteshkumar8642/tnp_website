import { Link } from "react-router-dom";
import Header from "./Header";
import "../Styles/LandingPage.css";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header>
        <Link to="/login">
          <button className="nav-button">Student Login</button>
        </Link>
      </Header>
      <LandingPageContent />
      <Footer />
    </div>
  );
}

function LandingPageContent() {
  let PageName = "Placement";
  return (
    <div className="content container">
      <div className="info">
        <h1>From Manual to Marvelous: Elevate Your Placements!</h1>
        <p>
          Welcome to {PageName} – revolutionizing campus placements with our
          streamlined, automated platform. Bid farewell to manual hassles, and
          embrace innovation for student success. Elevate your campus dynamics
          with {PageName} – where smart placements meet smarter careers!
        </p>
        <Link to="/collegeRegistration">
          {" "}
          <button className="primary-button">Register your College</button>
        </Link>
      </div>
      <div className="image">
        <img
          src="https://i.postimg.cc/65QxYYzh/001234.png"
          alt="Placement Illustration"
        />
      </div>
    </div>
  );
}
