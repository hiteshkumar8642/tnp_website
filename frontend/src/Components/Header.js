export default function Header({ onLogInPageOpening, isLoginPage, children }) {
  return (
    <header className="header">
      <nav className="container">
        <span
          className="logo"
          onClick={isLoginPage ? onLogInPageOpening : undefined}
          style={isLoginPage ? { cursor: "pointer" } : {}}
        >
          <b>HireEase</b>
        </span>
        {!isLoginPage && (
          <ul className="nav-links">
            <li>Home</li>
            <li>About Us</li>
            <li>Info</li>
          </ul>
        )}
        <button className="nav-button" onClick={onLogInPageOpening}>
          {children}
        </button>
      </nav>
    </header>
  );
}
