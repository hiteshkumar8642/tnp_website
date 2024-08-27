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
import CompaniesDashboard from "./Components/Companies/Companies";
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
import UserProfileDetails from "./Components/UserProfilePage/UserProfilePage";
import RoleProtectedRoute from "./Components/RoleProtectedRoute/RoleProtectedRoute";
import Test from "./Components/Test/Test";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <Loader /> {/* Include the Loader component */}
      <div className="flex flex-col min-h-screen overflow-auto">
        <Routes>
          <Route path="/test" element={<Test />} />
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

            <Route
              path="companies"
              element={
                <RoleProtectedRoute path={"companies"}>
                  <CompaniesDashboard />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="applied-companies"
              element={
                <RoleProtectedRoute path={"applied-companies"}>
                  <AppliedCompanies />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="share-hr-contact"
              element={
                <RoleProtectedRoute path={"share-hr-contact"}>
                  <SharedHrContact />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="all-student-list"
              element={
                <RoleProtectedRoute path={"all-student-list"}>
                  <StudentList />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="share-company-contact"
              element={
                <RoleProtectedRoute path={"share-company-contact"}>
                  <ShareCompanyContact />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="shared-hr-contact"
              element={
                <RoleProtectedRoute path={"shared-hr-contact"}>
                  <SharedHrContactList />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="shared-company-contact"
              element={
                <RoleProtectedRoute path={"shared-company-contact"}>
                  <SharedCompanyContactList />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="call-log"
              element={
                <RoleProtectedRoute path={"call-log"}>
                  <CallLog />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="hr-list"
              element={
                <RoleProtectedRoute path={"hr-list"}>
                  <HrList />
                </RoleProtectedRoute>
              }
            ></Route>
            <Route
              path="my-hr-list"
              element={
                <RoleProtectedRoute path={"my-hr-list"}>
                  <MyHrList />
                </RoleProtectedRoute>
              }
            ></Route>
          </Route>
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="/not-verified" element={<ErrorPage/>} />
          <Route path="*" element={<Error404Page />} />
          <Route path="/user-profile" element={<UserProfileDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
