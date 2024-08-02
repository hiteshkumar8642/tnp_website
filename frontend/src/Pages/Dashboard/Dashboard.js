import { Outlet } from "react-router-dom";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="app-container">
      <DashboardHeader />
      <div className="app-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
