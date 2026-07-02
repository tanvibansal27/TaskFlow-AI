import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import { getAllTasks } from "../../services/taskService";
import "./Calendar.css";

const Calendar = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sameDay = (d1, d2) =>
    new Date(d1).toDateString() ===
    new Date(d2).toDateString();

  const getRemainingDays = (date) => {

    const due = new Date(date);

    due.setHours(0,0,0,0);

    const diff = Math.ceil(
      (due - today) /
      (1000 * 60 * 60 * 24)
    );

    if(diff < 0)
      return `${Math.abs(diff)} Days Overdue`;

    if(diff === 0)
      return "Due Today";

    if(diff === 1)
      return "Due Tomorrow";

    return `${diff} Days Left`;

  };

  const priorityColor = {
    High:"#ef4444",
    Medium:"#f59e0b",
    Low:"#22c55e",
  };

  const statusColor = {
    Pending:"#9ca3af",
    "In Progress":"#3b82f6",
    Completed:"#22c55e",
  };

  const todaysTasks = tasks.filter(task =>
    task.dueDate &&
    sameDay(task.dueDate, today)
  );

  const overdueTasks = tasks.filter(task => {

    if(!task.dueDate) return false;

    const due = new Date(task.dueDate);

    due.setHours(0,0,0,0);

    return (
      task.status !== "Completed" &&
      due < today
    );

  });

  const completedToday = tasks.filter(task =>
    task.status === "Completed" &&
    task.updatedAt &&
    sameDay(task.updatedAt, today)
  );

  const upcomingTasks = tasks
    .filter(task => {

      if(!task.dueDate) return false;

      const due = new Date(task.dueDate);

      due.setHours(0,0,0,0);

      return due >= today;

    })
    .sort(
      (a,b)=>
      new Date(a.dueDate)-new Date(b.dueDate)
    );

  const weekTasks = upcomingTasks.filter(task=>{

    const diff =
      (new Date(task.dueDate)-today) /
      (1000*60*60*24);

    return diff>=0 && diff<=7;

  });

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-main">

          <div className="page-header">

            <div>

              <h1>📅 Task Scheduler</h1>

              <p>
                Track deadlines and manage your work.
              </p>

            </div>

          </div>

          <div className="calendar-stats">

            <div className="stat-box">
              <h3>{todaysTasks.length}</h3>
              <p>Today's Tasks</p>
            </div>

            <div className="stat-box red">
              <h3>{overdueTasks.length}</h3>
              <p>Overdue</p>
            </div>

            <div className="stat-box yellow">
              <h3>{upcomingTasks.length}</h3>
              <p>Upcoming</p>
            </div>

            <div className="stat-box green">
              <h3>{completedToday.length}</h3>
              <p>Completed Today</p>
            </div>

          </div>

          {/* Today's Tasks */}

          <div className="calendar-section">

            <h2>🟢 Today's Tasks</h2>

            {todaysTasks.length === 0 ? (

              <div className="empty-card">

                <h3>🎉 Nothing Due Today</h3>

                <p>You're all caught up.</p>

              </div>

            ) : (

              <div className="calendar-grid">

                              {todaysTasks.map((task) => (

                  <div
                    key={task._id}
                    className="calendar-item"
                  >

                    <h3>{task.title}</h3>

                    <p>
                      <b>Project :</b>{" "}
                      {task.project?.title || "No Project"}
                    </p>

                    <div className="badge-row">

                      <span
                        className="priority-badge"
                        style={{
                          background:
                            priorityColor[task.priority]
                        }}
                      >
                        {task.priority}
                      </span>

                      <span
                        className="status-badge"
                        style={{
                          background:
                            statusColor[task.status]
                        }}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p>

                      📅{" "}

                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}

                    </p>

                    <small>

                      {getRemainingDays(
                        task.dueDate
                      )}

                    </small>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Upcoming Deadlines */}

          <div className="calendar-section">

            <h2>🟡 Upcoming Deadlines</h2>

            {upcomingTasks.length === 0 ? (

              <div className="empty-card">

                <h3>No Upcoming Tasks</h3>

                <p>
                  You're free for now.
                </p>

              </div>

            ) : (

              <div className="calendar-grid">

                {upcomingTasks.map((task) => (

                  <div
                    key={task._id}
                    className="calendar-item"
                  >

                    <h3>{task.title}</h3>

                    <p>
                      <b>Project :</b>{" "}
                      {task.project?.title || "No Project"}
                    </p>

                    <div className="badge-row">

                      <span
                        className="priority-badge"
                        style={{
                          background:
                            priorityColor[task.priority]
                        }}
                      >
                        {task.priority}
                      </span>

                      <span
                        className="status-badge"
                        style={{
                          background:
                            statusColor[task.status]
                        }}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p>

                      📅{" "}

                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}

                    </p>

                    <small>

                      {getRemainingDays(
                        task.dueDate
                      )}

                    </small>

                  </div>

                ))}

              </div>

            )}

          </div>
                    {/* Overdue Tasks */}

          <div className="calendar-section">

            <h2>🔴 Overdue Tasks</h2>

            {overdueTasks.length === 0 ? (

              <div className="empty-card">

                <h3>🎉 No Overdue Tasks</h3>

                <p>Great! You're on schedule.</p>

              </div>

            ) : (

              <div className="calendar-grid">

                {overdueTasks.map((task) => (

                  <div
                    key={task._id}
                    className="calendar-item overdue-card"
                  >

                    <h3>{task.title}</h3>

                    <p>
                      <b>Project :</b>{" "}
                      {task.project?.title || "No Project"}
                    </p>

                    <div className="badge-row">

                      <span
                        className="priority-badge"
                        style={{
                          background:
                            priorityColor[task.priority]
                        }}
                      >
                        {task.priority}
                      </span>

                      <span
                        className="status-badge"
                        style={{
                          background:
                            statusColor[task.status]
                        }}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p>

                      📅{" "}

                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}

                    </p>

                    <small>

                      {getRemainingDays(
                        task.dueDate
                      )}

                    </small>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* This Week */}

          <div className="calendar-section">

            <h2>📆 This Week</h2>

            {weekTasks.length === 0 ? (

              <div className="empty-card">

                <h3>No Tasks This Week</h3>

                <p>
                  Nothing scheduled for this week.
                </p>

              </div>

            ) : (

              <div className="calendar-grid">

                {weekTasks.map((task) => (

                  <div
                    key={task._id}
                    className="calendar-item"
                  >

                    <h3>{task.title}</h3>

                    <p>
                      <b>Project :</b>{" "}
                      {task.project?.title || "No Project"}
                    </p>

                    <div className="badge-row">

                      <span
                        className="priority-badge"
                        style={{
                          background:
                            priorityColor[task.priority]
                        }}
                      >
                        {task.priority}
                      </span>

                      <span
                        className="status-badge"
                        style={{
                          background:
                            statusColor[task.status]
                        }}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p>

                      📅{" "}

                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}

                    </p>

                    <small>

                      {getRemainingDays(
                        task.dueDate
                      )}

                    </small>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Calendar;