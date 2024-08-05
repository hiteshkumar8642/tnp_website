
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";

import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import CollegeRegistrationPage from "./Pages/CollegeRegistration/CollegeRegistrationPage";
import Features from "./Pages/Features/Features";
import PricingPanel from "./Pages/Pricing/PricingPanel";
import Team from "./Pages/Team/Team";
import ForgotPasswordPage from "./Pages/ForgotPassword/ForgotPasswordPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Companies from "./Components/Companies/Companies";
import AppliedCompanies from "./Components/AppliedCompanies/AppliedCompanies";
import SharedHrContact from "./Components/ShareHrContact/SharedHrList";
import ShareCompanyContact from "./Components/ShareCompanyContact/ShareCompanyContact";
import HrList from "./Components/HrList/HrList";
import MyHrList from "./Components/MyHrList/MyHrList";
import Loader from "./Components/Loader/Loader";

function App() {
  return (
    <BrowserRouter>
    <Loader /> {/* Include the Loader component */}
  
   <div className="flex flex-col min-h-screen overflow-auto">
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
        <Route path="/Features" element={<Features />} />
        <Route path="/pricing" element={<PricingPanel />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="companies" />} />
          <Route path="companies" element={<Companies />}></Route>
          <Route
            path="applied-companies"
            element={<AppliedCompanies />}
          ></Route>
          <Route path="share-hr-contact" element={<SharedHrContact />}></Route>
          <Route
            path="share-company-contact"
            element={<ShareCompanyContact />}
          ></Route>
          <Route path="hr-list" element={<HrList />}></Route>
          <Route path="my-hr-list" element={<MyHrList />}></Route>
        </Route>
      </Routes>
 </div>

    </BrowserRouter>
  );
}

export default App;
