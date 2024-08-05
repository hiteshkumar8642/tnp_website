import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/api";
import { useLoading } from "../LoadingContext/LoadingContext"; // Import the useLoading hook

function Sidebar() {
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
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Remove the Authorization header
      axios.defaults.headers.common["Authorization"] = null;

      // Redirect to login page
      window.location.href = "/";
      
    } catch (error) {
      console.error("Logout failed:", error);
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
