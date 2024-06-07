import Header from "./Header";
import "../Styles/LandingPage.css";
import Footer from "./Footer";
import PricingPanel from "./PricingPanel";

export default function LandingPage({
  onLogInPageOpening,
  onCollegeRegistrationPageOpening,
  onLandingPageSet,
  currLanding,
}) {
  return (
    <div className="landing-page">
      <Header
        onLogInPageOpening={onLogInPageOpening}
        onLandingPageSet={onLandingPageSet}
      >
        Student Login
      </Header>
      {currLanding === "Home" && (
        <LandingPageContent
          onCollegeRegistrationPageOpening={onCollegeRegistrationPageOpening}
        />
      )}
      {currLanding === "Pricing" && <PricingPanel />}
      <Footer onLandingPageSet={onLandingPageSet} />
    </div>
  );
}

function LandingPageContent({ onCollegeRegistrationPageOpening }) {
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
        <button
          className="primary-button"
          onClick={onCollegeRegistrationPageOpening}
        >
          Register your College
        </button>
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
