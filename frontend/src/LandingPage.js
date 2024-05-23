import Header from "./Header";

export default function LandingPage({ onLogInPageOpening }) {
  return (
    <div className="landing-page">
      <Header onLogInPageOpening={onLogInPageOpening}>Student Login</Header>
      <LandingPageContent />
    </div>
  );
}

function LandingPageContent() {
  return (
    <div className="content container">
      <div className="info">
        <h1>From Manual to Marvelous: Elevate Your Placements!</h1>
        <p>
          Welcome to HireEase – revolutionizing campus placements with our
          streamlined, automated platform. Bid farewell to manual hassles, and
          embrace innovation for student success. Elevate your campus dynamics
          with HireEase – where smart placements meet smarter careers!
        </p>
        <button className="primary-button">Register your College</button>
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
