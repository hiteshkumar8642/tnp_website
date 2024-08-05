import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import First from "./Images/1.png";
import Second from "./Images/2.png";
import Third from "./Images/3.png";
export default function Features() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 justify-center p-5">
        <header className="text-center mb-8">
          <h1 className="text-4xl mb-2">Our Services</h1>
          <h5 className="text-lg text-gray-600">
            Explore our project's core functionalities through detailed
            descriptions and screenshots.
          </h5>
        </header>
        <section className="mb-12">
          <h2 className="text-4xl mb-2">Feature 1: User Management</h2>
          <p className="text-lg mb-4">
            Our user management system allows administrators to easily manage
            user accounts, roles, and permissions.
          </p>
          <img
            src={First}
            alt="User Management Screenshot"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="text-center italic">
            Manage user accounts effortlessly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl mb-2">Feature 2: Real-Time Notifications</h2>
          <p className="text-lg mb-4">
            Stay informed with real-time notifications for important events and
            updates.
          </p>
          <img
            src={Second}
            alt="Real-Time Notifications Screenshot"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="text-center italic">
            Get instant updates on your dashboard.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl mb-2">Feature 3: Reporting and Analytics</h2>
          <p className="text-lg mb-4">
            Access comprehensive reports and analytics to make data-driven
            decisions.
          </p>
          <img
            src={Third}
            alt="Reporting Screenshot"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="text-center italic">
            Analyze data with detailed reports.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl mb-2">Detailed Descriptions</h2>
          <p className="text-lg mb-4">
            Each feature is designed to enhance user experience and improve
            productivity. For instance, the user management system supports bulk
            actions and detailed logging for better control and transparency.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
