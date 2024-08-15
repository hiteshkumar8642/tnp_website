import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children,path}) => {
  const user = JSON.parse(localStorage.getItem("user_Profile")); // Assuming the user info is stored in localStorage
  // console.log("role" ,role);
  console.log("user Role" ,user?.role);
  console.log("children" , path);
  let role = user?.role;
  if((role === 1 || role === 2 || role === 3 || role === 4) && path == "companies"){
    return children;
  }
  else if ((role === 1 || role === 2 || role === 3 || role === 4) && path === "applied-companies"){
    return children;
  }
  else if (role === 2 && path === "share-hr-contact"){
    return children;
  }
  else if (role === 2 && path === "share-company-contact"){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "hr-list" ){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "my-hr-list"){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "shared-hr-contact"){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "shared-company-contact"){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "call-log"){
    return children;
  }
  else if ((role === 3 || role === 4) && path === "all-student-list"){
    return children;
  }
  else{
    return <Navigate to="/401" />; 
  }
};

export default RoleProtectedRoute;
