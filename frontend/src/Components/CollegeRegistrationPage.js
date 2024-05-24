import React from "react";
import Header from "./Header";

export default function CollegeRegistrationPage({ onLandingPageOpening }) {
  return (
    <>
      <Header onLogInPageOpening={onLandingPageOpening} isLoginPage>
        Back to Home
      </Header>
      <div className="college-registration-page">
        <div className="college-registration-form">
          <h2>College Registration Form</h2>
          <form>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="First Name" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Last Name" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email address" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-university"></i>
              <input type="text" placeholder="College" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-university"></i>
              <input type="text" placeholder="Confirm College" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-globe"></i>
              <input type="text" placeholder="Subdomain" required />
            </div>
            <div className="form-group">
              <label>Select the branches in your college:</label>
              <div>
                <input
                  type="checkbox"
                  id="btech"
                  name="btech"
                  value="B.Tech (Computer Science)"
                />
                <label htmlFor="btech">B.Tech (Computer Science)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="bsc"
                  name="bsc"
                  value="B.Sc (Computer Science)"
                />
                <label htmlFor="bsc">B.Sc (Computer Science)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="mca"
                  name="mca"
                  value="MCA (Computer Science)"
                />
                <label htmlFor="mca">MCA (Computer Science)</label>
              </div>
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <div className="form-group input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
