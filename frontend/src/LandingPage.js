export default function LandingPage({ onLogInPageOpening }) {
  return (
    <div className="landing-page">
      <LandingPageHeader onLogInPageOpening={onLogInPageOpening} />
      <LandingPageContent />
    </div>
  );
}

function LandingPageHeader({ onLogInPageOpening }) {
  return (
    <header>
      <div className="container">
        <span className="logo">
          <b>PlacementsPro</b>
        </span>
        <ul className="links">
          <li>Home</li>
          <li>About Us</li>
          <li>Info</li>
          <li>
            <span onClick={onLogInPageOpening}>Student Login</span>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LandingPageContent() {
  return (
    <div className="content container">
      <div className="container">
        <div className="info">
          <h1>From Manual to Marvelous: Elevate Your Placements!</h1>
          <p>
            Welcome to PlacementsPro – revolutionizing campus placements with
            our streamlined, automated platform. Bid farewell to manual hassles,
            and embrace innovation for student success. Elevate your campus
            dynamics with PlacementsPro – where smart placements meet smarter
            careers!
          </p>
          <span>
            <button>Register your College</button>
          </span>
        </div>
        <div className="image">
          <img
            src="https://i.postimg.cc/65QxYYzh/001234.png"
            alt="Placement Illustration"
          />
        </div>
      </div>
    </div>
  );
}
