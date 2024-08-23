import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MYSVG from "../../assets/Logo/campuslogo.png";

export default function Header({ isLoginPage, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // To track the active link

  const PageName = "CampusHirease";

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false); // Close the menu after clicking a link
  };

  return (
    <header className="min-h-[80px] mx-auto flex items-center w-9/12 relative z-50">
      <nav className="container flex items-center justify-between">
        <div className="text-[#5d5d5d] text-2xl flex justify-center items-center">
          <div>
            <Link to="/"><img src={MYSVG} alt="My SVG" className="w-16" /></Link>
          </div>
          <Link to="/" className="hover:no-underline sm:block hidden">
            <b>{PageName}</b>
          </Link>
        </div>

        {/* Hamburger Button - Visible on Small Screens */}
        <button 
          className="block md:hidden ml-4 text-[#5d5d5d] focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>

        {/* Desktop Menu - Hidden on Small Screens */}
        <div className="hidden md:flex gap-6">
          <ul className="flex items-center text-lg">
            <NavLink to="/Features" className={`ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ${activeLink === "/Features" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("/Features")}>
              <li>Features</li>
            </NavLink>
            <NavLink to="/team" className={`ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ${activeLink === "/team" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("/team")}>
              <li>Team</li>
            </NavLink>
          </ul>
          <Link to="/login">
            <button className="nav-button bg-[#6c63ff] text-white rounded-[20px] py-2 px-7 hover:bg-[#5752d8] transition-colors align-middle">
              Login
            </button>
          </Link>
        </div>

        {/* Dropdown Menu after Clicking Hamburger - Mobile View */}
        {menuOpen && (
          <div className="absolute right-0 top-[80px] mt-2 w-[220px] bg-white shadow-lg rounded-lg py-2 flex flex-col md:hidden">
            <ul className="text-sm text-gray-700">
              <NavLink to="/Features" className={`block px-4 py-2 hover:bg-gray-100 hover:no-underline ${activeLink === "/Features" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("/Features")}>
                Features
              </NavLink>
              <NavLink to="/team" className={`block px-4 py-2 hover:bg-gray-100 hover:no-underline ${activeLink === "/team" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("/team")}>
                Team
              </NavLink>
              <Link to="/login">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600" onClick={() => handleLinkClick("/login")}>
                  Login
                </button>
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
