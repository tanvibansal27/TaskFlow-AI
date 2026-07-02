import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Projects.css";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import ProjectCard from "../../components/projects/ProjectCard";
import CreateProjectModal from "../../components/projects/CreateProjectModal";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../../services/projectService";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(
  searchParams.get("status") || "All"
);
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    loadProjects();
  }, []);
useEffect(() => {
  setStatusFilter(searchParams.get("status") || "All");
}, [searchParams]);
  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (project) => {
    try {
      await createProject(project);
      setShowModal(false);
      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (project) => {
    try {
      await updateProject(selectedProject._id, project);

      setSelectedProject(null);
      setShowModal(false);

      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };

  // Search + Filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      project.priority === priorityFilter;

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

          {/* Header */}

          <div className="projects-header">
            <div>
              <h1>My Projects</h1>
              <p>Manage all your projects in one place.</p>
            </div>

            <button
              className="create-btn"
              onClick={() => {
                setSelectedProject(null);
                setShowModal(true);
              }}
            >
              + New Project
            </button>
          </div>

          {/* Search & Filters */}

          <div className="project-filters">

            <input
              type="text"
              placeholder="🔍 Search Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Planning</option>
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

          {/* Content */}

          {loading ? (
            <h2>Loading...</h2>
          ) : filteredProjects.length === 0 ? (

            <div className="empty-state">

              <h2>
                {projects.length === 0
                  ? "No Projects Yet 🚀"
                  : "No Projects Found"}
              </h2>

              <p>
                {projects.length === 0
                  ? "Create your first project."
                  : "Try changing your search or filters."}
              </p>

            </div>

          ) : (

            <div className="projects-grid">

              {filteredProjects.map((project) => (

                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDelete}
                  onEdit={(project) => {
                    setSelectedProject(project);
                    setShowModal(true);
                  }}
                />

              ))}

            </div>

          )}

        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <CreateProjectModal
          project={selectedProject}
          onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
          }}
          onSave={
            selectedProject
              ? handleUpdate
              : handleCreate
          }
        />
      )}
    </div>
  );
};

export default Projects;