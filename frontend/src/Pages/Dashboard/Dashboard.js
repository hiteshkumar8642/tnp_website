import DashboardContent from "../../Components/DashboardContent/DashboardContent";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="app-container">
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
}

export default Dashboard;
