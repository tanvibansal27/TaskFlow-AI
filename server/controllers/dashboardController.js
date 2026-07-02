import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    // =========================
    // Projects
    // =========================

    const projects = await Project.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    const totalProjects = projects.length;

    const completed = projects.filter(
      (project) => project.status === "Completed"
    ).length;

    const planning = projects.filter(
      (project) => project.status === "Planning"
    ).length;

    const progress = projects.filter(
      (project) => project.status === "In Progress"
    ).length;

    // =========================
    // Tasks
    // =========================

    const tasks = await Task.find({
      owner: req.user.id,
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status !== "Completed"
    ).length;

    // =========================
// Upcoming Tasks
// =========================

const upcomingTasks = await Task.find({
  owner: req.user.id,
  status: { $ne: "Completed" },
  dueDate: { $ne: null },
})
  .sort({ dueDate: 1 })
  .limit(3)
  .select("title dueDate status");
  // =========================
// Notifications
// =========================

const notifications = [];

// Latest Project
if (projects.length > 0) {
  notifications.push({
    icon: "📁",
    message: `Project "${projects[0].title}" created`,
  });
}

// Pending Tasks
if (pendingTasks > 0) {
  notifications.push({
    icon: "📝",
    message: `${pendingTasks} Pending Task(s)`,
  });
}

// AI Ready
notifications.push({
  icon: "🤖",
  message: "AI Assistant Ready",
});
    // =========================
    // Productivity Score
    // =========================
  const progressTasks = tasks.filter(
  (task) => task.status === "In Progress"
).length;
    const productivity =
  totalTasks === 0
    ? 100
    : Math.round(
        ((completedTasks + progressTasks * 0.5) / totalTasks) * 100
      );

    // =========================
    // Response
    // =========================

    res.status(200).json({
      
      totalProjects,
      completed,
      planning,
      progress,

      totalTasks,
      completedTasks,
      pendingTasks,
      productivity,

      recentProjects: projects.slice(0, 5),
      upcomingTasks,
      notifications,
notificationCount: notifications.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};