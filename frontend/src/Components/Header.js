import "../Styles/Header.css";

export default function Header({
  onLogInPageOpening,
  isLoginPage,
  children,
  onLandingPageSet,
}) {
  let PageName = "Placement";

  function handleCurrentLandingPage(name) {
    onLandingPageSet(name);
  }

  return (
    <header className="header">
      <nav className="container">
        <span
          className="logo"
          onClick={isLoginPage ? onLogInPageOpening : undefined}
          style={isLoginPage ? { cursor: "pointer" } : {}}
        >
          <b>{PageName}</b>
        </span>
        {!isLoginPage && (
          <ul className="nav-links">
            <li onClick={() => handleCurrentLandingPage("Home")}>Home</li>
            <li>Features</li>
            <li>Team</li>
            <li onClick={() => handleCurrentLandingPage("Pricing")}>Pricing</li>
            <li>Contact Us</li>
          </ul>
        )}
        <button className="nav-button" onClick={onLogInPageOpening}>
          {children}
        </button>
      </nav>
    </header>
  );
}
