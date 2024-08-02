import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ onLandingPageSet }) {
  let PageName = "Placement";

  return (
    <footer className="bg-white py-5 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <i className="fas fa-map-marker-alt text-indigo-600 text-2xl"></i>
            <div>
              <h4 className="text-gray-700 font-semibold">Find us</h4>
              <span className="text-gray-500">NIT Jamshedpur, Jamshedpur</span>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <i className="fas fa-phone text-indigo-600 text-2xl"></i>
            <div>
              <h4 className="text-gray-700 font-semibold">Call us</h4>
              <span className="text-gray-500">1234567890</span>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <i className="far fa-envelope-open text-indigo-600 text-2xl"></i>
            <div>
              <h4 className="text-gray-700 font-semibold">Mail us</h4>
              <span className="text-gray-500">mail@info.com</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>Making Placement process easier, better and smoother</p>
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">Follow us</span>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.google.co.in/">
                <i className="fab fa-facebook-f bg-indigo-600 text-white rounded-full p-2"></i>
              </a>
              <a href="https://www.google.co.in/">
                <i className="fab fa-twitter bg-indigo-600 text-white rounded-full p-2"></i>
              </a>
              <a href="https://www.google.co.in/">
                <i className="fab fa-google-plus-g bg-indigo-600 text-white rounded-full p-2"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <h3 className="text-gray-700 font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2">
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>About</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Contact</li>
            <li>About us</li>
            <li>Our Services</li>
            <li>Expert Team</li>
            <Link to="/pricing">
              <li>Pricing</li>
            </Link>
            <li>Latest News</li>
          </ul>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <h3 className="text-gray-700 font-semibold">Subscribe</h3>
          <p className="mt-2">
            Don’t miss to subscribe to our new feeds, kindly fill the form below.
          </p>
          <form action="#" className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Email Address"
              className="p-2 border border-gray-300 rounded-l-md"
            />
            <button className="p-2 bg-indigo-600 text-white rounded-r-md">
              <i className="fab fa-telegram-plane"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-500 py-4 text-center mt-8">
        <p>Copyright &copy; 2024, All Right Reserved {PageName}</p>
      </div>
    </footer>
  );
}
