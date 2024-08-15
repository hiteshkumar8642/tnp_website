import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ContactForm from "../../Components/ContactForm/ContactForm";
import Faq from "../../Components/Faq/Faq";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-[#f3f6fd] min-h-screen">
      <Header />
      <div className="flex-grow w-11/12 lg:w-9/12 mx-auto">
        <LandingPageContent />
      </div>
      <div className="bg-[#f3f6fd] pt-10">
        <ContactForm />
      </div>
      <div className="bg-[#f3f6fd] pt-10">
        <Faq />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

function LandingPageContent() {
  let PageName = "Placement";

  return (
    <div className="content container flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[calc(100vh-80px)] relative">
      {/* Background Shapes */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#6c63ff] rounded-full opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#6c63ff] rounded-full opacity-10"></div>

      {/* Text Section */}
      <div className="info w-full lg:max-w-[50%] flex-1 text-center lg:text-left z-10">
        <h1 className="text-[#5d5d5d] text-3xl md:text-4xl lg:text-5xl font-semibold pb-4">
          From Manual to Marvelous: Elevate Your Placements!
        </h1>
        <p className="m-0 leading-loose text-sm md:text-base text-[#5d5d5d]">
          Welcome to {PageName} – revolutionizing campus placements with our streamlined, automated platform. Bid farewell to manual hassles, and embrace innovation for student success. Elevate your campus dynamics with {PageName} – where smart placements meet smarter careers!
        </p>
        <Link to="/collegeRegistration">
          <button className="primary-button bg-[#6c63ff] text-white py-2 px-6 md:px-9 mt-5 md:mt-7 hover:bg-[#5752d8] transition-colors rounded-full">
            Register your College
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="image w-full lg:max-w-[40%] flex-1 mb-5 lg:mb-0 z-10">
        <img
          src="https://i.postimg.cc/65QxYYzh/001234.png"
          alt="Placement Illustration"
          className="max-w-[80%] sm:max-w-[60%] lg:max-w-full block m-auto"
        />
      </div>
    </div>
  );
}
