import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import TaskCard from "../../components/tasks/TaskCard";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";

import {
  getAllTasks,
  deleteTask,
  updateTask,
} from "../../services/taskService";

import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Task?")) return;

    await deleteTask(id);

    loadTasks();
  };

  const handleUpdate = async (task) => {
    try {
      await updateTask(selectedTask._id, task);

      setShowModal(false);
      setSelectedTask(null);

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-main">
          <div className="projects-header">
            <div>
              <h1>📝 My Tasks</h1>
              <p>Manage all your tasks here.</p>
            </div>
          </div>

          <div className="project-filters">
            <input
              type="text"
              placeholder="🔍 Search Task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {loading ? (
            <h2>Loading...</h2>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h2>No Tasks Found</h2>
              <p>Create a task from any project.</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={(task) => {
                    setSelectedTask(task);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <CreateTaskModal
          task={selectedTask}
          projectId={selectedTask?.project?._id}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Tasks;