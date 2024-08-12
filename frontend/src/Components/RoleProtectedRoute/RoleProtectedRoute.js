import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user_profile")); // Assuming the user info is stored in localStorage

  if (user?.role === role) {
    return children;
  } else {
    return <Navigate to="/401" />; // Redirect to unauthorized page if the role doesn't match
  }
};

export default RoleProtectedRoute;
