import React from "react";
import "../Styles/Footer.css";

export default function Footer({ onPageChange, currentPage }) {
  let PageName = "Placement";

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>NIT Jamshedpur, Jamshedpur</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>1234567890</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>mail@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <h4>{PageName}</h4>
                </div>
                <div className="footer-text">
                  <p>Making Placement process easier, better and smoother</p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="https://www.google.co.in/">
                    <i className="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="https://www.google.co.in/">
                    <i className="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="https://www.google.co.in/">
                    <i className="fab fa-google-plus-g google-bg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li
                    className={currentPage === "LandingPage" ? "active" : ""}
                    onClick={() => onPageChange("LandingPage")}
                  >
                    Home
                  </li>
                  <li>About</li>
                  <li>Services</li>
                  <li>Portfolio</li>
                  <li>Contact</li>
                  <li>About us</li>
                  <li>Our Services</li>
                  <li>Expert Team</li>
                  <li
                    className={currentPage === "PricingPanel" ? "active" : ""}
                    onClick={() => onPageChange("PricingPanel")}
                  >
                    Pricing
                  </li>
                  <li>Latest News</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>Copyright &copy; 2024, All Right Reserved {PageName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
