function Sidebar() {
  const handleLogout = async () => {
      
    try {
      // Remove tokens from local storage
      await  axios.post('http://localhost:8000/user/api/logout/',{
               refresh_token:localStorage.getItem('refresh_token')
               } ,{headers: {'Content-Type': 'application/json'}},  
               {withCredentials: true});

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Remove the Authorization header
      axios.defaults.headers.common["Authorization"] = null;

      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  

  return (
    <div className="app-sidebar">
      <span className="app-sidebar-link active">Companies</span>
      <span className="app-sidebar-link">Applied Companies</span>
      <span className="app-sidebar-link">Share HR Contact</span>
      <span className="app-sidebar-link">Share Company Contact</span>
      <span className="app-sidebar-link">HR List</span>
      <span className="app-sidebar-link">My HR List</span>
      <span className="app-sidebar-link">Logout</span>
    </div>
  );
}

export default Sidebar;
