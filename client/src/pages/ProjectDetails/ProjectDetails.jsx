import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import { getProject } from "../../services/projectService";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";

import TaskCard from "../../components/tasks/TaskCard";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

const [showModal, setShowModal] = useState(false);

const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
  loadProject();
  loadTasks();
}, [id]);

  const loadProject = async () => {
  try {
    const data = await getProject(id);
    setProject(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const loadTasks = async () => {
  try {
    const data = await getTasks(id);
    setTasks(data);
  } catch (error) {
    console.log(error);
  }
};
const handleCreateTask = async (task) => {
  try {
    await createTask(task);

    setShowModal(false);

    loadTasks();
  } catch (error) {
    console.log(error);
    alert("Failed to create task.");
  }
};
const handleUpdateTask = async (task) => {

  await updateTask(selectedTask._id, task);

  setSelectedTask(null);

  setShowModal(false);

  loadTasks();

};
const handleDeleteTask = async (id) => {

  if (!window.confirm("Delete Task?")) return;

  await deleteTask(id);

  loadTasks();

};
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!project) {
    return <h2>Project Not Found</h2>;
  }

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-main">

          <button
            className="back-btn"
            onClick={() => navigate("/projects")}
          >
            ← Back to Projects
          </button>

          <div className="project-details-card">

            <h1>{project.title}</h1>

            <p>{project.description}</p>

            <div className="details-grid">

              <div className="detail-box">
                <h4>Status</h4>
                <p>{project.status}</p>
              </div>

              <div className="detail-box">
                <h4>Priority</h4>
                <p>{project.priority}</p>
              </div>

              <div className="detail-box">
                <h4>Created</h4>
                <p>
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

          </div>

          {/* Tasks Section */}

          <div className="tasks-section">

            <div className="task-header">

              <h2>Tasks</h2>

              <button
                className="create-btn"
                onClick={() => {

                    setSelectedTask(null);

                    setShowModal(true);

                }}
                >
                + Add Task
                </button>

            </div>

            <>
  {tasks.length === 0 ? (

    <div className="empty-state">

      <div className="empty-state">

  <h2>📝 No Tasks Yet</h2>

  <p>
    Start by creating your first task for this project.
  </p>

</div>

      <p>Create your first task.</p>

    </div>

  ) : (

    tasks.map((task) => (

      <TaskCard
        key={task._id}
        task={task}
        onEdit={(task) => {

          setSelectedTask(task);

          setShowModal(true);

        }}
        onDelete={handleDeleteTask}
      />

    ))

  )}
</>
          </div>

        </div>

      </div>
{showModal && (

  <CreateTaskModal

    task={selectedTask}

    projectId={id}

    onClose={() => {

      setShowModal(false);

      setSelectedTask(null);

    }}

    onSave={
      selectedTask
        ? handleUpdateTask
        : handleCreateTask
    }

  />

)}
    </div>
  );
};

export default ProjectDetails;