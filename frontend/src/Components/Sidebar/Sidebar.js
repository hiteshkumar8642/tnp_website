import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/api";
import { useLoading } from "../LoadingContext/LoadingContext"; // Import the useLoading hook
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function Sidebar() {
  const Navigate=useNavigate();
  const { setIsLoading } = useLoading();

  const logout = async (refreshToken) => {
    try {
      await apiClient.post("user/api/logout/", { refresh_token: refreshToken });
    } catch (error) {
      throw error.response.data;
    }
  };

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
      <span className="app-sidebar-link" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

export default Sidebar;
