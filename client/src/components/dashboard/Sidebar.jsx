import {
  FaThLarge,
  FaFolderOpen,
  FaTasks,
  FaCalendarAlt,
  FaUsers,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    };
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          🚀 TaskFlow AI
        </div>

                <ul className="menu">

          <li
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            <FaThLarge />
            Dashboard
          </li>

          <li
            className={location.pathname === "/projects" ? "active" : ""}
            onClick={() => navigate("/projects")}
          >
            <FaFolderOpen />
            Projects
          </li>

          <li
            className={location.pathname === "/tasks" ? "active" : ""}
            onClick={() => navigate("/tasks")}
          >
            <FaTasks />
            Tasks
          </li>

          <li
            className={location.pathname === "/calendar" ? "active" : ""}
            onClick={() => navigate("/calendar")}
          >
            <FaCalendarAlt />
            Calendar
          </li>

          <li
            className={location.pathname === "/team" ? "active" : ""}
            onClick={() => navigate("/team")}
          >
            <FaUsers />
            Team
          </li>

          <li
            className={location.pathname === "/ai" ? "active" : ""}
            onClick={() => navigate("/ai")}
          >
            <FaRobot />
            AI Assistant
          </li>

          <li
            className={location.pathname === "/settings" ? "active" : ""}
            onClick={() => navigate("/settings")}
          >
            <FaCog />
            Settings
          </li>

        </ul>
      </div>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;