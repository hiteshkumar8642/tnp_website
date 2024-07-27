import "./PricingPanel.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

export default function PricingPanel() {
  return (
    <>
      <Header>
        <Link to="/">
          <button className="nav-button">Student LogIn</button>
        </Link>
      </Header>
      <div className="pricing-content">
        <header className="info">
          <h1>Pricing plans</h1>
          <h5>
            First 30 days absolutely <span className="accent-1">free</span> for
            any plan, no credit card required to get started.
          </h5>
        </header>
        <div className="plans-list">
          <article className="plan-item">
            <div className="plan-header">
              <h2>Basic</h2>
              <h1 className="plan-price">5000</h1>
            </div>
            <ul className="plan-feature-list">
              <li>1 - 5 Departments</li>
              <li>No Helper Feature</li>
            </ul>
            <button className="primary-button">Get Started</button>
          </article>
          <article className="plan-item ">
            <div className="plan-header">
              <h2>Modarate</h2>
              <h1 className="plan-price">7000</h1>
            </div>
            <ul className="plan-feature-list">
              <li>6 - 10 Departments</li>
              <li>Helper Feature</li>
            </ul>
            <button className="primary-button ">Get Started</button>
          </article>
          <article className="plan-item">
            <div className="plan-header">
              <h2>Premium</h2>
              <h1 className="plan-price">8500</h1>
            </div>
            <ul className="plan-feature-list">
              <li>10+ Departments</li>
              <li>Helper Feature</li>
            </ul>
            <button className="primary-button">Get Started</button>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
