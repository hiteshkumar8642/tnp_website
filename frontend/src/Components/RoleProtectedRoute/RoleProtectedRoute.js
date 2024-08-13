import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user_Profile")); // Assuming the user info is stored in localStorage
  console.log(role);
  console.log(user?.role);
  if (user?.role === role) {
    return children;
  } else {
    return <Navigate to="/401" />; // Redirect to unauthorized page if the role doesn't match
  }
};

export default RoleProtectedRoute;
