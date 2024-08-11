import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/api";
import { useLoading } from "../LoadingContext/LoadingContext"; // Import the useLoading hook
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function Sidebar() {
  const Navigate=useNavigate();
  const { setIsLoading } = useLoading();
  const Role = null;


  const logout = async (refreshToken) => {
    try {
      await apiClient.post("user/api/logout/", { refresh_token: refreshToken });
    } catch (error) {
      throw error.response.data;
    }
  };

  

  useEffect(() => {
    async function roleWiseAccess() {
      const storedUserProfile = localStorage.getItem("user_Profile");
      try{
        const userProfile = JSON.parse(storedUserProfile);
        console.log(userProfile[0].role);
        Role = userProfile[0].role;
      }
      catch(err){
        console.error(err);
      }
    }
    roleWiseAccess();
  }, []);

  // useEffect(() => {
  //   const storedUserDetail = localStorage.getItem("user_detail");
  //   try {
  //     const userDetails = JSON.parse(storedUserDetail);
  //     if (userDetails && userDetails.length > 0) {
  //       const { first_name, last_name } = userDetails[0].user;
  //       setUserName(`${first_name} ${last_name}`);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing user_detail from localStorage:", error);
  //   }
  // }, []);


  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      setIsLoading(true);
      await logout(refreshToken);
      localStorage.clear();
      // Remove the Authorization header
      axios.defaults.headers.common["Authorization"] = null;
      // Redirect to login page
      Navigate("/")
      setIsLoading(false);
      console.log("hekko");
      toast.success("Logout successfully");
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast.success("Logout successfully");
      localStorage.clear();
      Navigate("/")
    }
    finally
    {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-sidebar">
      <NavLink
        to="/dashboard/companies"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        Companies
      </NavLink>
      <NavLink
        to="/dashboard/applied-companies"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        Applied Companies
      </NavLink>
      <NavLink
        to="/dashboard/share-hr-contact"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        Share HR Contact
      </NavLink>
      <NavLink
        to="/dashboard/share-company-contact"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        Share Company Contact
      </NavLink>
      <NavLink
        to="/dashboard/hr-list"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        HR List
      </NavLink>
      <NavLink
        to="/dashboard/my-hr-list"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
          
        }
      >
        My HR List
      </NavLink>
      <NavLink
        to="/dashboard/shared-hr-contact"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
          
        }
      >
        Shared HR Contact
      </NavLink>
      <NavLink
        to="/dashboard/shared-company-contact"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
          
        }
      >
        Shared Company Contact
      </NavLink>
      <NavLink
        to="/dashboard/call-log"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
          
        }
      >
        Call Log
      </NavLink>
      <NavLink
        to="/dashboard/all-student-list"
        className={({ isActive }) =>
          isActive ? "app-sidebar-link active" : "app-sidebar-link"
        }
      >
        AllStudentList
      </NavLink>
      <span className="app-sidebar-link" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

export default Sidebar;
