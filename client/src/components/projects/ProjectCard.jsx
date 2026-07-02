import {
  FaFolderOpen,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}) => {

  const navigate = useNavigate();

  return (
    <div
      className="project-card"
      onClick={() =>
        navigate(`/projects/${project._id}`)
      }
    >

      <div className="project-top">

        <div className="project-icon">
          <FaFolderOpen />
        </div>

        <span
          className={`priority ${project.priority.toLowerCase()}`}
        >
          {project.priority}
        </span>

      </div>

      <h2>{project.title}</h2>

      <p>
        {project.description || "No Description"}
      </p>

      <div className="project-info">

        <strong>Status :</strong> {project.status}

      </div>

      <div className="project-actions">

        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
        >
          <FaEdit />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project._id);
          }}
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default ProjectCard;