import { useState } from "react";
import LandingPage from "./LandingPage";

export default function App() {
  const [logIn, setLogIn] = useState(false);

  function handleLogInPageOpening() {
    setLogIn((logIn) => !logIn);
  }

  return (
    <>
      {!logIn && <LandingPage onLogInPageOpening={handleLogInPageOpening} />};
      {logIn && <LogInPage onLogInPageClosing={handleLogInPageOpening} />}
    </>
  );
}

function LogInPage({ onLogInPageClosing }) {
  return (
    <>
      <header>
        <nav>
          <button className="home-button" onClick={onLogInPageClosing}>
            Back to Home
          </button>
        </nav>
      </header>
      <form className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
            Don't have an account?{" "}
            <span className="register-link-button">Register</span>
          </p>
        </div>
      </form>
    </>
  );
}
