import { Navigate, Route, Routes } from "react-router-dom";
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
import SetNewPasswordPage from "./Pages/SetNewPassword/SetNewPassword";
import NewCompanyDetails from "./Components/NewCompanyDescription/NewCompanyDetails";
import UnauthorizedPage from "./Pages/401/401";
import Error404Page from "./Pages/404/404";
import FirstLogIn from "./Components/UserDetail/FirstLogIn";
import StudentList from "./Components/StudentList/StudentList";
import SharedHrContactList from "./Components/SharedHrContact/SharedHrContactList";
import SharedCompanyContactList from "./Components/SharedCompanyContact/SharedCompanyContactList";
import CallLog from "./Components/CallLog/CallLog";

function App() {
  return (
    <>
      <Loader /> {/* Include the Loader component */}
      <div className="flex flex-col min-h-screen overflow-auto">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route
            path="/password-reset/:token"
            element={<SetNewPasswordPage />}
          />
          <Route
            path="/collegeRegistration"
            element={<CollegeRegistrationPage />}
          />
          <Route path="/Team" element={<Team />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/pricing" element={<PricingPanel />} />
          <Route path="/newCompanyDetails" element={<NewCompanyDetails />} />
          <Route
            path="/firstlogin"
            element={
              <ProtectedRoute>
                <FirstLogIn />
              </ProtectedRoute>
            }
          />
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
            <Route
              path="share-hr-contact"
              element={<SharedHrContact />}
            ></Route>
            <Route path="all-student-list" element={<StudentList />}></Route>
            <Route
              path="share-company-contact"
              element={<ShareCompanyContact />}
            ></Route>
            <Route
              path="shared-hr-contact"
              element={<SharedHrContactList />}
            ></Route>
            <Route
              path="shared-company-contact"
              element={<SharedCompanyContactList />}
            ></Route>
            <Route path="call-log" element={<CallLog />}></Route>
            <Route path="hr-list" element={<HrList />}></Route>
            <Route path="my-hr-list" element={<MyHrList />}></Route>
          </Route>
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
