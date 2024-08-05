import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-16">
     
        <div className="flex flex-wrap justify-center mb-12">
          <div className="w-full md:w-1/3 flex justify-center mb-6">
            <div className="single-cta flex items-center">
              <i className="fas fa-map-marker-alt text-[#6c63ff] text-2xl mr-4"></i>
              <div className="cta-text text-center">
                <h4 className="text-xl font-bold">Find us</h4>
                <span className="text-gray-600">NIT Jamshedpur, Jamshedpur</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center mb-6">
            <div className="single-cta flex items-center">
              <i className="fas fa-phone text-[#6c63ff] text-2xl mr-4"></i>
              <div className="cta-text text-center">
                <h4 className="text-xl font-bold">Call us</h4>
                <span className="text-gray-600">1234567890</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center mb-6">
            <div className="single-cta flex items-center">
              <i className="far fa-envelope-open text-[#6c63ff] text-2xl mr-4"></i>
              <div className="cta-text text-center">
                <h4 className="text-xl font-bold">Mail us</h4>
                <span className="text-gray-600">mail@info.com</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 mb-8" />


        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex flex-col">
              <h4 className="text-2xl font-bold mb-4">CampusHirease</h4>
              <p className="text-gray-600 text-base">
                Making the placement process easier, better, and smoother.
              </p>
              <div className="mt-6">
                <h5 className="font-semibold text-gray-700 mb-2">Follow Us</h5>
                <br/>
                <div className="flex">
                  <a
                    href="https://www.google.co.in/"
                    className="mr-4 text-gray-600 hover:text-[#5752d8]"
                  >
                    <i className="fab fa-facebook-f text-[#6c63ff] text-2xl"></i>
                  </a>
                  <a
                    href="https://www.google.co.in/"
                    className="mr-4 text-gray-600 hover:text-[#5752d8]"
                  >
                    <i className="fab fa-twitter text-[#6c63ff] text-2xl"></i>
                  </a>
                  <a
                    href="https://www.google.co.in/"
                    className="text-gray-600 hover:text-[#5752d8]"
                  >
                    <i className="fab fa-google-plus-g text-[#6c63ff] text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2 relative">
                  Useful Links
                  </h3>
                <ul className="list-none text-gray-600 grid grid-cols-2 gap-4">
                  <li>
                    <Link to="/" className="hover:text-[#5752d8]">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-[#5752d8]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="hover:text-[#5752d8]">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" className="hover:text-[#5752d8]">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-[#5752d8]">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/expert-team" className="hover:text-[#5752d8]">
                      Expert Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="hover:text-[#5752d8]">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/latest-news" className="hover:text-[#5752d8]">
                      Latest News
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <h3 className="text-xl font-bold mb-2 relative">
                  Subscribe
                  </h3>
                <p className="text-gray-600 text-base mb-4">
                  Don't miss to subscribe to our new feeds, kindly fill the
                  form below.
                </p>
                <form className="flex">
                  <input
                    type="email"
                    className="w-full px-4 py-2 mr-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
                    placeholder="Email Address"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 bg-[#6c63ff] text-white rounded-lg hover:bg-[#5752d8]"
                  >
                    <i className="fas fa-telegram-plane mr-2"></i>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-gray-800 text-gray-300">
        <p>&copy; 2024, All Rights Reserved Placement</p>
      </div>
    </footer>
  );
}
