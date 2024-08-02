import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header>
        <Link to="/login">
          <button className="nav-button bg-[#6c63ff] text-white rounded-[20px] py-3 px-8 mt-7 hover:bg-[#5752d8] transition-colors">
            Student Login
          </button>
        </Link>
      </Header>
      <div className="flex-grow">
        <LandingPageContent />
      </div>
      <Footer />
    </div>
  );
}

function LandingPageContent() {
  let PageName = "Placement";
  return (
    <div className="content container flex items-center justify-between gap-5 min-h-[calc(100vh-80px)]">
      <div className="info max-w-[50%] flex-1">
        <h1 className="text-[#5d5d5d] text-5xl">From Manual to Marvelous: Elevate Your Placements!</h1>
        <p className="m-0 leading-loose text-lg text-[#5d5d5d]">
          Welcome to {PageName} – revolutionizing campus placements with our streamlined, automated platform. Bid farewell to manual hassles, and embrace innovation for student success. Elevate your campus dynamics with {PageName} – where smart placements meet smarter careers!
        </p>
        <Link to="/collegeRegistration">
          <button className="primary-button bg-[#6c63ff] text-white rounded-[20px] py-3 px-8 mt-7 hover:bg-[#5752d8] transition-colors">
            Register your College
          </button>
        </Link>
      </div>
      <div className="image max-w-[50%] flex-1">
        <img
          src="https://i.postimg.cc/65QxYYzh/001234.png"
          alt="Placement Illustration"
          className="max-w-full block m-auto"
        />
      </div>
    </div>
  );
}
