import "../Styles/Header.css";

export default function Header({
  onLogInPageOpening,
  isLoginPage,
  children,
  onPageChange,
  currentPage,
}) {
  let PageName = "Placement";

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
            <li
              className={currentPage === "LandingPage" ? "active" : ""}
              onClick={() => onPageChange("LandingPage")}
            >
              Home
            </li>
            <li>Features</li>
            <li>Team</li>
            <li
              className={currentPage === "PricingPanel" ? "active" : ""}
              onClick={() => onPageChange("PricingPanel")}
            >
              Pricing
            </li>
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
