import { Link, NavLink } from "react-router-dom";

export default function Header({ isLoginPage, children }) {
  let PageName = "Placement";

  return (
    <header className="min-h-[80px] mx-auto flex items-center w-9/12">
      <nav className="container flex items-center justify-between">
        <span className="text-[#5d5d5d] italic text-2xl ">
          <Link to="/">
            <b>{PageName}</b>
          </Link>
        </span>

        <div className="flex gap-6">
          {!isLoginPage && (
            <ul className="flex items-center text-lg">
              <li className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">Features</li>
              <NavLink to="/team" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
                <li>Team</li>
              </NavLink>
              <NavLink to="/pricing" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors">
                <li>Pricing</li>
              </NavLink>
            </ul>
          )}
          <Link to="/login">
            <button className="nav-button bg-[#6c63ff] text-white rounded-[20px] py-2 px-7 hover:bg-[#5752d8] transition-colors align-middle">
              Student Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
