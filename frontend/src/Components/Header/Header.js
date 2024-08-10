import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header({ isLoginPage, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const PageName = "CampusHirease";

  return (
    <header className="min-h-[80px] mx-auto flex items-center w-9/12 relative z-50">
      <nav className="container flex items-center justify-between">
        <span className="text-[#5d5d5d] italic text-2xl">
          <Link to="/" className="hover:no-underline">
            <b>{PageName}</b>
          </Link>
        </span>

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
            <NavLink to="/Features" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline">
              <li>Features</li>
            </NavLink>
            <NavLink to="/team" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline">
              <li>Team</li>
            </NavLink>
            <Link to="Faq" smooth={true} duration={500} className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline">
              <li>Faq</li>
            </Link>
            <Link to="ContactUs" smooth={true} duration={500} className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline">
              <li>Contact Us</li>
            </Link>
          </ul>
          <Link to="/login">
            <button className="nav-button bg-[#6c63ff] text-white rounded-[20px] py-2 px-7 hover:bg-[#5752d8] transition-colors align-middle">
              Login
            </button>
          </Link>
        </div>

        {/* Full-Screen Mobile Menu - Visible on Small Screens */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center md:hidden top-16">
            <ul className="flex flex-col items-center text-lg gap-4">
              <NavLink to="/Features" className="text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline" onClick={() => setMenuOpen(false)}>
                <li>Features</li>
              </NavLink>
              <NavLink to="/team" className="text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline" onClick={() => setMenuOpen(false)}>
                <li>Team</li>
              </NavLink>
              <Link to="" className="text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline" onClick={() => setMenuOpen(false)}>
                <li>Faq</li>
              </Link>
              <Link to="" className="text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline" onClick={() => setMenuOpen(false)}>
                <li>Contact Us</li>
              </Link>
            </ul>
            <Link to="/login">
              <button className="mt-4 bg-[#6c63ff] text-white rounded-[20px] py-2 px-7 hover:bg-[#5752d8] transition-colors">
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}


















// import { Link, NavLink } from "react-router-dom";
// import { useState } from "react";
// import Dropdown from "./Dropdown";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";

// export default function Header({ isLoginPage, children }) {
//   const [isOpen, setIsOpen] = useState(false);
//   let PageName = "CampusHirease";

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="min-h-[80px] mx-auto flex items-center w-9/12">
//       <nav className="container flex items-center justify-between">
//         <span className="text-[#5d5d5d] italic text-2xl">
//           <Link to="/" className="hover:no-underline">
//             <b>{PageName}</b>
//           </Link>
//         </span>

//         <div className="flex gap-6">
//             <ul className="flex items-center text-lg">
//               <NavLink to="/Features" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ">
//                 <li>Features</li>
//               </NavLink>
//               <NavLink to="/team" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ">
//                 <li>Team</li>
//               </NavLink>
//               {/* <NavLink to="/pricing" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline">
//                 <li>Pricing</li>
//               </NavLink> */}
//               <Link to="" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ">
//                 <li>Faq</li>
//               </Link>
//               <Link to="" className="ml-[30px] text-[#5d5d5d] hover:text-[#6c63ff] transition-colors hover:no-underline ">
//                 <li>Contact Us</li>
//               </Link>
              
//               {/* <Dropdown/> */}
//             </ul>
//           <Link to="/login">
//             <button className="nav-button bg-[#6c63ff] text-white rounded-[20px] py-2 px-7 hover:bg-[#5752d8] transition-colors align-middle">
//               Login
//             </button>
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }
