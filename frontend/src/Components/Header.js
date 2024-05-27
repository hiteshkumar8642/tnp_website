import "../Styles/Header.css";

export default function Header({ onLogInPageOpening, isLoginPage, children }) {
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
            <li>Home</li>
            <li>Features</li>
            <li>Team</li>
            <li>Pricing</li>
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
