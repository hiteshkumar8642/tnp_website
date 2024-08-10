import React from "react";
import Logo from "../../assets/Logo/contactFormImg.png";

const ContactForm = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-8 bg-blue-50 min-h-screen">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Lets talk about everything!
        </h1>
        <p className="text-gray-600">
          Hate forms? Send us an <a href="mailto:email@example.com" className="text-blue-500">email</a> instead.
        </p>
        <div className="flex justify-center items-center ml-24">
            <img src={Logo} alt="" className="object-contain w-full" />
        </div>
      </div>
      <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Enter your message"
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-500 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
