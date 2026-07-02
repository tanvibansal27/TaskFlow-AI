import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";
const Navbar = ({ setSidebarOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
const [showNotification, setShowNotification] = useState(false);
const [dashboard, setDashboard] = useState(null);
useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);
useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getDashboard();
    setDashboard(data);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <nav className="dashboard-navbar">
      <button
  className="menu-btn"
  onClick={() => {
    console.log("Clicked");
    setSidebarOpen(true);
  }}
>
  <FaBars />
</button>
      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search projects..."
        />
      </div>

      <div className="navbar-right">

        <button
  className="icon-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? <FaSun /> : <FaMoon />}
</button>

        <div className="notification-wrapper">

<button
  className="icon-btn notification"
  onClick={() =>
    setShowNotification(!showNotification)
  }
>

  <FaBell />

  <span>{dashboard?.notificationCount || 0}</span>

</button>

{showNotification && (

<div className="notification-dropdown">

<h4>Notifications</h4>

{dashboard?.notifications?.length ? (

  dashboard.notifications.map((item, index) => (

    <p key={index}>
      {item.icon} {item.message}
    </p>

  ))

) : (

  <p>No Notifications</p>

)}
</div>

)}

</div>

        <div className="profile">

          <div className="avatar">
    {user?.name?.charAt(0).toUpperCase()}
</div>

          <div>
            <h4>{user?.name || "User"}</h4>
            <p>{user?.role || "Member"}</p>
          </div>

        </div>

      </div>

    </nav>
  );
};
export default Navbar;