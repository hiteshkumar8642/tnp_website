import { Link, NavLink } from "react-router-dom";

export default function Header({ isLoginPage, children }) {
  let PageName = "Placement";

  return (
    <header className="min-h-[80px] bg-[#f3f6fd] flex items-center">
      <nav className="container flex items-center justify-between">
        <span className="text-[#5d5d5d] italic text-2xl">
          <Link to="/">
            <b>{PageName}</b>
          </Link>
        </span>

        {!isLoginPage && (
          <ul className="flex items-center text-lg">
            <NavLink to="/" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
              <li>Home</li>
            </NavLink>
            <li className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">Features</li>
            <NavLink to="/team" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
              <li>Team</li>
            </NavLink>
            <NavLink to="/pricing" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
              <li>Pricing</li>
            </NavLink>
            <li className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
              <button className="nav-button">Contact Us</button>
            </li>
          </ul>
        )}
        <span>{children}</span>
      </nav>
    </header>
  );
}
