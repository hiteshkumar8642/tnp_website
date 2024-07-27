import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import CollegeRegistrationPage from "./Components/CollegeRegistrationPage";
import PricingPanel from "./Components/PricingPanel";
import Team from "./Components/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/collegeRegistration"
          element={<CollegeRegistrationPage />}
        />
        <Route path="/Team" element={<Team />} />
        <Route path="/pricing" element={<PricingPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
