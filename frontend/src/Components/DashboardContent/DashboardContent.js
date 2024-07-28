import Announcements from "./Announcements/Announcements";
import Companies from "./Companies/Companies";
import Sidebar from "./Sidebar/Sidebar";

function DashboardContent() {
  return (
    <div className="app-content">
      <Sidebar />
      <Companies />
      <Announcements />
    </div>
  );
}

export default DashboardContent;
