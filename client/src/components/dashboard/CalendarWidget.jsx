import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { getDashboard } from "../../services/dashboardService";

const CalendarWidget = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setTasks(data.upcomingTasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="card calendar-widget">

      <div className="calendar-header">
        <FaCalendarAlt />
        <h2>Upcoming Tasks</h2>
      </div>

      {tasks.length === 0 ? (

        <p>No upcoming tasks 🎉</p>

      ) : (

        tasks.map((task) => (

          <div
            key={task._id}
            className="calendar-event"
            onClick={() => navigate("/tasks")}
          >
            <h4>{task.title}</h4>

            <p>{formatDate(task.dueDate)}</p>

            <small><span
className={`task-status ${task.status.toLowerCase().replace(" ","-")}`}
>
{task.status}
</span></small>

          </div>

        ))

      )}

    </div>
  );
};

export default CalendarWidget;