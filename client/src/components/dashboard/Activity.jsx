import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

const Activity = () => {
  const [dashboard, setDashboard] = useState(null);

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

  if (!dashboard) return <div className="card">Loading...</div>;

  const activities = [];

  if (dashboard.totalProjects > 0) {
    activities.push(`📁 ${dashboard.totalProjects} project(s) created`);
  }

  if (dashboard.completed > 0) {
    activities.push(`✅ ${dashboard.completed} project(s) completed`);
  }

  if (dashboard.progress > 0) {
    activities.push(`🚀 ${dashboard.progress} project(s) in progress`);
  }

  if (dashboard.planning > 0) {
    activities.push(`📝 ${dashboard.planning} project(s) in planning`);
  }

  if (activities.length === 0) {
    activities.push("🎉 No activity yet.");
  }

  return (
    <div className="card">

      <h2>Recent Activity</h2>

      <ul className="activity-list">

        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}

      </ul>

    </div>
  );
};

export default Activity;