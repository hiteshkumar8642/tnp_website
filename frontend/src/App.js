import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LangingPage/LandingPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import CollegeRegistrationPage from "./Pages/CollegeRegistration/CollegeRegistrationPage";
import PricingPanel from "./Pages/Pricing/PricingPanel";
import Team from "./Pages/Team/Team";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/collegeRegistration"
          element={<CollegeRegistrationPage />}
        />
        <Route path="/Team" element={<Team />} />
        <Route path="/pricing" element={<PricingPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
