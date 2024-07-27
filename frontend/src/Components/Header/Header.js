import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header({ isLoginPage, children }) {
  let PageName = "Placement";

  return (
    <header className="header">
      <nav className="container">
        <span className="logo">
          <Link to="/">
            {" "}
            <b>{PageName}</b>{" "}
          </Link>
        </span>

        {!isLoginPage && (
          <ul className="nav-links">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <li>Features</li>
            <NavLink to="/team">
              <li>Team</li>
            </NavLink>
            <NavLink to="/pricing">
              <li>Pricing</li>
            </NavLink>
            <li>Contact Us</li>
          </ul>
        )}
        <span>{children}</span>
      </nav>
    </header>
  );
}
