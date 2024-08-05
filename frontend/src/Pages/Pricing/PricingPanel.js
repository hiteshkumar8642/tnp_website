import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function PricingPanel() {
  return (
    <>
      <Header />
      <div className="pricing-content flex flex-col items-center justify-center p-5">
        <header className="text-center mb-8">
          <h1 className="text-4xl mb-2">Pricing Plans</h1>
          <h5 className="text-lg text-gray-600">
            First 30 days absolutely{" "}
            <span className="text-[#6c63ff]">free</span> for any plan, no credit
            card required to get started.
          </h5>
        </header>
        <div className="plans-list flex flex-wrap justify-center gap-5 mt-5">
          <article className="plan-item bg-white rounded-lg shadow-lg flex flex-col items-center p-6 w-72 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <div className="plan-header pb-4">
              <h2 className="text-xl text-[#6c63ff]">Basic</h2>
              <h1 className="plan-price text-3xl my-2">₹5000</h1>
            </div>
            <ul className="plan-feature-list flex flex-col gap-4 py-4 text-lg w-full">
              <li>1 - 5 Departments</li>
              <li>No Helper Feature</li>
            </ul>
            <button className="primary-button bg-[#6c63ff] text-white py-2 px-4 rounded-lg mt-6 transition-colors hover:bg-[#5752d8]">
              Get Started
            </button>
          </article>
          <article className="plan-item bg-white rounded-lg shadow-lg flex flex-col items-center p-6 w-72 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <div className="plan-header pb-4">
              <h2 className="text-xl text-[#6c63ff]">Modarate</h2>
              <h1 className="plan-price text-3xl my-2">₹7000</h1>
            </div>
            <ul className="plan-feature-list flex flex-col gap-4 py-4 text-lg w-full">
              <li>6 - 10 Departments</li>
              <li>Helper Feature</li>
            </ul>
            <button className="primary-button bg-[#6c63ff] text-white py-2 px-4 rounded-lg mt-6 transition-colors hover:bg-[#5752d8]">
              Get Started
            </button>
          </article>
          <article className="plan-item bg-white rounded-lg shadow-lg flex flex-col items-center p-6 w-72 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
            <div className="plan-header pb-4">
              <h2 className="text-xl text-[#6c63ff]">Premium</h2>
              <h1 className="plan-price text-3xl my-2">₹8500</h1>
            </div>
            <ul className="plan-feature-list flex flex-col gap-4 py-4 text-lg w-full">
              <li>10+ Departments</li>
              <li>Helper Feature</li>
            </ul>
            <button className="primary-button bg-[#6c63ff] text-white py-2 px-4 rounded-lg mt-6 transition-colors hover:bg-[#5752d8]">
              Get Started
            </button>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
