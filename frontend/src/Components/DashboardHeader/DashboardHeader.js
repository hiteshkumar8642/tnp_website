function DashboardHeader() {

  
  return (
    <div className="app-header">
      <div class="app-header-left">
        <span class="app-icon"></span>
        <p class="app-name">TNP Website</p>
      </div>
      <div class="app-header-right">
        <button class="mode-switch" title="Switch Theme">
          <svg
            class="moon"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        <a href="{% url 'userProfile' %}">
          <button class="profile-btn">
            <img
              src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
              alt="s"
            />
            <span>Name</span>
          </button>
        </a>
      </div>
      <button className="btn">Logout</button>
    </div>
  );
}

export default DashboardHeader;
