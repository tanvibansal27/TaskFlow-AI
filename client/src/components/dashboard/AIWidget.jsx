import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaArrowRight } from "react-icons/fa";

import { getDashboard } from "../../services/dashboardService";

const AIWidget = () => {
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

  if (!stats) {
    return (
      <div className="card ai-widget">
        <div className="ai-header">
          <FaRobot />
          <h2>AI Assistant</h2>
        </div>

        <p>Loading AI insights...</p>
      </div>
    );
  }

  let message = "";

  if (stats.pendingTasks === 0) {
    message =
      "🎉 Excellent! You have completed all your tasks. Ready to start something new?";
  } else if (stats.pendingTasks <= 3) {
    message = `✅ You have ${stats.pendingTasks} pending task(s). Stay consistent and complete them today to improve your productivity.`;
  } else {
    message = `⚡ You have ${stats.pendingTasks} pending tasks. Focus on high-priority work to improve your productivity.`;
  }

  return (
    <div className="card ai-widget">

      <div className="ai-header">
        <FaRobot />
        <h2>AI Assistant</h2>
      </div>

      <p>{message}</p>

      <button
        onClick={() =>
          navigate("/ai", {
            state: {
              prompt:
                "Analyze my dashboard and tell me what I should work on today.",
            },
          })
        }
      >
        Ask AI
        <FaArrowRight />
      </button>

    </div>
  );
};

export default AIWidget;