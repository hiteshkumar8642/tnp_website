import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/api";
import { useLoading } from "../LoadingContext/LoadingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [role, setRole] = useState(null);

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
      try {
        const userProfile = JSON.parse(storedUserProfile);
        setRole(userProfile.role);
      } catch (error) {
        toast.error("Error loading user profile.");
      }
    }
    roleWiseAccess();
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      setIsLoading(true);
      await logout(refreshToken);
      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-sidebar sm:block hidden">
      {(role === 1 || role === 2 || role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/companies"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Companies
        </NavLink>
      )}

      {(role === 1 || role === 2 || role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/applied-companies"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Applied Companies
        </NavLink>
      )}

      {role === 2 && (
        <NavLink
          to="/dashboard/share-hr-contact"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Share HR Contact
        </NavLink>
      )}

      {role === 2 && (
        <NavLink
          to="/dashboard/share-company-contact"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Share Company Contact
        </NavLink>
      )}

      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/hr-list"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          HR List
        </NavLink>
      )}
      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/my-hr-list"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          My HR List
        </NavLink>
      )}
      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/shared-hr-contact"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Shared HR Contact
        </NavLink>
      )}
      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/shared-company-contact"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Shared Company Contact
        </NavLink>
      )}
      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/call-log"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          Call Log
        </NavLink>
      )}
      {(role === 3 || role === 4) && (
        <NavLink
          to="/dashboard/all-student-list"
          className={({ isActive }) =>
            isActive ? "app-sidebar-link active" : "app-sidebar-link"
          }
        >
          All Student List
        </NavLink>
      )}
      {(role === 1 || role === 2 || role === 3 || role === 4) && (
        <span className="app-sidebar-link" onClick={handleLogout}>
          Logout
        </span>
      )}
    </div>
  );
}

export default Sidebar;
