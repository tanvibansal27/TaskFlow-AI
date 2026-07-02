import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import { getDashboard } from "../../services/dashboardService";

const RecentProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getDashboard();
      setProjects(data.recentProjects);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">

      <div className="recent-header">

        <h2>Recent Projects</h2>

        <button
          className="view-all-btn"
          onClick={() => navigate("/projects")}
        >
          View All
          <FaArrowRight />
        </button>

      </div>

      {projects.length === 0 ? (

        <p>No Projects Yet</p>

      ) : (

        projects.map((project) => (

          <div
            className="project-item"
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
          >

            <div className="project-title">

              <FaFolderOpen />

              <span>{project.title}</span>

            </div>

           <p className="project-meta">
{project.status} • {project.priority} Priority
</p>

          </div>

        ))

      )}

    </div>
  );
};

export default RecentProjects;