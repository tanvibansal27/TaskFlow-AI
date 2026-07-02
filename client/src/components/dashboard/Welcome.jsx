import { FaArrowTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

const Welcome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);
useEffect(() => {
  console.log(stats);
}, [stats]);
  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="welcome card">

      <div>

        <h1>
          Welcome Back,
          <span> {user?.name || "User"} 👋</span>
        </h1>

        <p>
  {stats ? (
    <>
      You have <strong>{stats.totalProjects}</strong> projects and{" "}
      <strong>{stats.pendingTasks}</strong> pending tasks.
      <br />
      Keep pushing forward 🚀
    </>
  ) : (
    "Loading workspace..."
  )}
</p>
      </div>

      <div className="welcome-badge">

        <FaArrowTrendUp />

        <div>
          <h3>{stats?.productivity || 0}%</h3>
          <p>Productivity</p>
        </div>

      </div>

    </div>
  );
};

export default Welcome;