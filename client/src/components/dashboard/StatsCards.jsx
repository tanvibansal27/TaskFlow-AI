import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaTasks,
} from "react-icons/fa";

import { getDashboard } from "../../services/dashboardService";

const StatsCards = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) return <p>Loading...</p>;

  const cards = [
  {
    title: "Projects",
    value: stats.totalProjects,
    icon: <FaFolderOpen />,
    color: "#6366f1",
    path: "/projects",
  },
  {
    title: "Completed",
    value: stats.completed,
    icon: <FaCheckCircle />,
    color: "#22c55e",
    path: "/projects?status=Completed",
  },
  {
    title: "Planning",
    value: stats.planning,
    icon: <FaClock />,
    color: "#f59e0b",
    path: "/projects?status=Planning",
  },
  {
    title: "In Progress",
    value: stats.progress,
    icon: <FaTasks />,
    color: "#06b6d4",
    path: "/projects?status=In Progress",
  },
];

  return (
    <div className="stats-grid">
      {cards.map((item, index) => (
        <div
  className="stat-card card"
  key={index}
  onClick={() => navigate(item.path)}
  style={{ cursor: "pointer" }}
>
          <div
            className="stat-icon"
            style={{ background: item.color }}
          >
            {item.icon}
          </div>

          <div>
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;